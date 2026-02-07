import { Countdown } from "@/components/ui/countdown";

export const metadata = { title: "Wiki" };

export default function WikiPage() {
  return <Countdown targetDate="2026-03-01T00:00:00" />;
}
