import { TbmSidebar } from "@/lib/domain/tbm-runtime/components/layout/TbmSidebar";

interface TbmModuleLayoutProps {
  children: React.ReactNode;
}

export default function TbmModuleLayout({ children }: TbmModuleLayoutProps) {
  return (
    <main className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <aside className="w-80 shrink-0 border-r bg-muted/20">
        <TbmSidebar />
      </aside>

      <section className="min-w-0 flex-1 overflow-y-auto p-6">{children}</section>
    </main>
  );
}
