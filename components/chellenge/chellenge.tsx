'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import BackToMenuButton from '@/components/chellenge/back-to-menu-button';
import { accuracy } from '@/lib/utils';
import { SaveRoundAction } from '@/types/round';
import { SaveAttemptAction } from '@/types/attempt';

interface ChallengeProps {
  set: { id: number; sentence: string | null }[];
  title: string;
  onSaveAttempt: SaveAttemptAction;
  onSaveRound: SaveRoundAction;
}

export default function Challenge({ set, title, onSaveAttempt, onSaveRound }: ChallengeProps) {
  const [round, setRound] = useState(0);
  const [value, setValue] = useState('');
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const [disableIsComplete, setDisableisComplete] = useState(false);

  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);

  const [time, setTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  const sentence = set[round].sentence || '';
  const timeLimit = 20;

  const handleComplete = useCallback(
    (completedValue: string) => {
      setDisableisComplete(true);
      let correctCount = 0;
      let incorrectCount = 0;

      completedValue.split('').forEach((char, index) => {
        if (char === sentence[index]) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });

      if (completedValue.length < sentence.length) {
        incorrectCount += sentence.length - completedValue.length;
      }
      setTotalCorrect((prevState) => prevState + correctCount);
      setTotalIncorrect((prevState) => prevState + incorrectCount);
      setCorrect(correctCount);
      setIncorrect(incorrectCount);
    },
    [sentence]
  );

  useEffect(() => {
    return () => {
      setRound(0);
      setValue('');
      setTotalCorrect(0);
      setTotalIncorrect(0);
      setCorrect(0);
      setIncorrect(0);
      setTime(0);
      setGameEnded(false);
    };
  }, []);

  useEffect(() => {
    const saveGameAtEnd = async () => {
      const { message, success } = await onSaveAttempt(totalCorrect, totalIncorrect);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };

    if (gameEnded) {
      saveGameAtEnd().then();
      return;
    }
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameEnded, onSaveAttempt, totalCorrect, totalIncorrect]);

  useEffect(() => {
    const saveGameAtEndRound = async () => {
      await onSaveRound(correct, incorrect, sentence);
    };

    if (time >= timeLimit && round < set.length && !gameEnded) {
      handleComplete(value);
      setTime(0);
      setValue('');

      const nextRound = round + 1;
      if (nextRound < set.length) {
        saveGameAtEndRound().then();
        setDisableisComplete(false);
        setRound(nextRound);
      } else {
        setGameEnded(true);
      }
    }
  }, [correct, gameEnded, handleComplete, incorrect, onSaveRound, round, sentence, set.length, time, value]);

  if (!sentence) {
    return (
      <div>
        Something went wrong!
        <BackToMenuButton />
      </div>
    );
  }

  const handleChange = (newValue: string) => {
    if (newValue.length >= value.length) {
      setValue(newValue);
    } else {
      toast.warning('Deleting is not available!');
    }
  };

  if (gameEnded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Your stats in {title} mode</CardDescription>
        </CardHeader>
        <CardContent>
          Total stats
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Correct</TableHead>
                <TableHead>Incorrect</TableHead>
                <TableHead>Accuracy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="text-center">
                <TableCell className="text-green-600">{totalCorrect}</TableCell>
                <TableCell className="text-red-600">{totalIncorrect}</TableCell>
                <TableCell>{accuracy(totalCorrect, totalIncorrect)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <BackToMenuButton />
        </CardFooter>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <p>Timer: {time}</p>
        <Progress max={timeLimit} value={time * 5} className="w-[60%]" />
      </div>
      <InputOTP
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
        maxLength={sentence.length}
        spellCheck="false"
        autoFocus
        disabled={disableIsComplete}
      >
        <InputOTPGroup>
          <div className="flex max-w-96 flex-row flex-wrap gap-y-5">
            {sentence.split('').map((char, index) => (
              <div key={index} className="flex flex-col gap-2 text-center">
                {char === ' ' ? <p className="text-transparent">.</p> : char}
                <InputOTPSlot index={index} />
              </div>
            ))}
          </div>
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
