import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BackToMenuButton() {
  return (
    <Link className="w-full" href="/menu">
      <Button className="w-full">
        <ArrowLeft /> Go back to menu{" "}
      </Button>
    </Link>
  );
}
