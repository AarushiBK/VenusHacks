import { PageShell } from "@/components/layout/PageShell";
import { ProfileHome } from "@/components/profile/ProfileHome";

export default function HomePage() {
  return (
    <PageShell active="platform" showHeader={false}>
      <ProfileHome />
    </PageShell>
  );
}
