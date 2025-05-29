import Form from "@/components/resource-center/tbm/mqtt/create-form";
import Breadcrumbs from "@/components/ui/breadcrumbs";


export default async function Page(props: {
    searchParams?: Promise<{
        tbmCode?: string;
        tbmId?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const tbmCode = searchParams?.tbmCode || "";
    const tbmId = searchParams?.tbmId || "";


    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "盾构机MQTT", href: "/resource-center/tbm/mqtt" },
                    {
                        label: "添加盾构机MQTT",
                        href: "/resource-center/tbm/mqtt/create",
                        active: true,
                    },
                ]}
            />
            <Form tbmCode={tbmCode} tbmId={tbmId} />
        </main>
    );
}
