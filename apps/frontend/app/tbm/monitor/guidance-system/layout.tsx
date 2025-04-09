

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen flex h-screen flex-col md:flex-row md:overflow-hidden">
      {children}
    </div>
  );
}
