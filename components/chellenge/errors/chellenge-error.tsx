import BackToMenuButton from '@/components/chellenge/back-to-menu-button';

export default function ChallengeError() {
  return (
    <div className="flex flex-col items-center gap-4">
      Challenge is not ready yet!
      <BackToMenuButton />
    </div>
  );
}
