import { Countdown } from "@/components/ui/countdown";

export const metadata = { title: "Voter" };

export default function VoterPage() {
  return <Countdown targetDate="2026-03-10T00:00:00" />;
}
