import { PageShell } from "@/components/layout/PageShell";
import { HeraChat } from "@/components/chat/HeraChat";

export default function ChatPage() {
  return (
    <PageShell active="platform" showHeader={false} flush showHeraBubble={false}>
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="border-blush/50 shrink-0 border-b px-4 py-3">
          <h1 className="font-display text-ink text-lg font-semibold">Hera</h1>
          <p className="text-muted text-sm">
            Heart & pregnancy wellness companion
          </p>
        </header>
        <HeraChat />
      </div>
    </PageShell>
  );
}
