export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex  flex-col overflow-hidden bg-gray-100">
      {children}
    </div>
  );
}
