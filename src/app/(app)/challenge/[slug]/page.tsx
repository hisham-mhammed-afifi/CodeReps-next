import { notFound } from "next/navigation";
import { getChallengeBySlug } from "@/lib/challenges/track-1-fundamentals";
import { ChallengeWorkspace } from "@/components/challenge/ChallengeWorkspace";
import type { ChallengeMode } from "@/types/progress";

const VALID_MODES: ChallengeMode[] = ["guided", "semi_guided", "independent"];

interface ChallengePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ChallengePage({
  params,
  searchParams,
}: ChallengePageProps) {
  const { slug } = await params;
  const { mode: modeParam } = await searchParams;

  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  const mode: ChallengeMode =
    typeof modeParam === "string" && VALID_MODES.includes(modeParam as ChallengeMode)
      ? (modeParam as ChallengeMode)
      : "guided";

  return (
    <div className="flex flex-col h-screen">
      <ChallengeWorkspace challenge={challenge} mode={mode} />
    </div>
  );
}
