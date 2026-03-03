import { Countdown } from "@/components/ui/countdown";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  return <Countdown targetDate="2026-02-14T00:00:00" />;
}
