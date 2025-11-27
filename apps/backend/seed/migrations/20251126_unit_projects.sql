CREATE TABLE unit_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- 所属项目
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

    -- 单位工程名称，如 "运河商务区站~北关站区间" / "北关站主体工程"
    name TEXT NOT NULL,
    --简称
    short_name TEXT,

    -- 工程分类（可选，例如 "区间", "车站", "附属", "道路改迁"）
    project_catalog_std_id UUID REFERENCES project_catalog_std(id),



    -- 工程属性
    engineering_qty NUMERIC(10,2),
    description TEXT,

    


    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);
