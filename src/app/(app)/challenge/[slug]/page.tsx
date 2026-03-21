import { notFound } from "next/navigation";
import { getChallengeBySlug } from "@/lib/challenges/track-1-fundamentals";
import { ChallengeWorkspace } from "@/components/challenge/ChallengeWorkspace";

interface ChallengePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen">
      <ChallengeWorkspace challenge={challenge} />
    </div>
  );
}
