import { useOrganizationQuery } from "../hooks/use-organization-tree";
export function OrganizationBreadcrumb({ path }: { path: any[] }) {
  const { updateQuery } = useOrganizationQuery();

  return (
    <div className="flex gap-2 text-sm">
      {path.map((node, i) => (
        <span key={node.id}>
          <span
            className="cursor-pointer text-blue-600"
            onClick={() =>
              updateQuery({
                parentId: node.id,
                page: 1,
              })
            }
          >
            {node.name}
          </span>

          {i < path.length - 1 && " / "}
        </span>
      ))}
    </div>
  );
}
