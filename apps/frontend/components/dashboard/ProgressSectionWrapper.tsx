// components/dashboard/ProgressSectionWrapper.tsx
export default function ProgressSectionWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full  rounded-xl border p-2 shadow-sm bg-white space-y-2">
      <div className="w-full text-lg font-semibold text-gray-700">{title}</div>
      {children}
    </div>
  );
}
