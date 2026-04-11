import { cookies } from 'next/headers';

import { AppSidebar, type SessionItem } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { listSessions } from '@/lib/core/db/chat';

async function loadInitialSessions() {
  try {
    return await listSessions({
      archived: false,
      limit: 30,
    });
  } catch {
    return [];
  }
}

export const experimental_ppr = true;

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cookieStore, sessions] = await Promise.all([
    cookies(),
    loadInitialSessions(),
  ]);

  const isCollapsed = cookieStore.get('sidebar:state')?.value !== 'true';
  const initialSessions: SessionItem[] = sessions.map((session) => ({
    id: session.id,
    title: session.title,
    channel: session.channel,
    createdAt: session.createdAt.toISOString(),
  }));

  return (
    <SidebarProvider defaultOpen={!isCollapsed}>
      <AppSidebar initialSessions={initialSessions} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
