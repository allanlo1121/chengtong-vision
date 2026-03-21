// app/system/organizations/layout.tsx
import { OrganizationTree } from "@/modules/organization/ui/tree/organization-tree";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="w-80 border-r">
        <OrganizationTree />
      </div>

      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
