import { Countdown } from "@/components/ui/countdown";

export const metadata = { title: "Universe" };

export default function UniversePage() {
  return <Countdown targetDate="2026-04-01T00:00:00" />;
}
