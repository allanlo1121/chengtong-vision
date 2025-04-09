import { WebSocketProvider } from "@/components/tbm/WebSocketProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <div className="w-screen flex h-screen flex-col md:flex-row md:overflow-hidden">
        {children}
      </div>
    </WebSocketProvider>
  );
}
