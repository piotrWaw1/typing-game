'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRouter, useSearchParams } from 'next/navigation';

interface Round {
  id: number;
  created_at: string;
  user_name: string;
  accuracy: number;
  sentence: string;
}

const DEFAULT_VALUE = 10;

export default function EasyModeRounds() {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState(searchParams.get('easySize') ?? DEFAULT_VALUE);

  const convertToNumber = isNaN(Number(items)) ? DEFAULT_VALUE : Number(items);

  const handleItemsChange = (value: string) => {
    setItems(value);
    router.push(`?easySize=${value}`, { scroll: false });
  };

  const supabase = createClient();

  useEffect(() => {
    const fetchRounds = async () => {
      const { data } = await supabase
        .from('easy_round')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(convertToNumber);

      if (data) setRounds(data);
      setLoading(false);
    };

    fetchRounds().then();

    const channel = supabase
      .channel('easy_round_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'easy_round' }, (payload) => {
        const incoming = payload.new as Round;
        setRounds((prev) => [incoming, ...prev.slice(0, convertToNumber - 1)]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel).then();
    };
  }, [convertToNumber, items, supabase]);

  return (
    <>
      <div className="flex flex-row justify-between gap-4">
        Easy mode new stats
        <Select value={`${items}`} onValueChange={handleItemsChange} defaultValue={`${DEFAULT_VALUE}`}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="30">30</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User name</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Sentence</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={3}>Loading ...</TableCell>
            </TableRow>
          )}
          {!loading &&
            rounds.map((round, index) => (
              <TableRow key={index}>
                <TableCell>{round.user_name}</TableCell>
                <TableCell>{round.accuracy}</TableCell>
                <TableCell>{round.sentence}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
