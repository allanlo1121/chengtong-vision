create or replace view system.v_tree_nodes as

-- =========================================
-- organizations
-- =========================================

select
  'organizations'::text as tree_key,

  o.id,

  o.parent_id,

  o.code,

  o.name,

  o.name as label,

  o.node_key,

  o.path::text as path,

  o.level,

  o.sort_order,

  o.is_leaf,

  not o.is_leaf as has_children,

  o.is_active as is_enabled,

  'organization'::text as entity_type

from public.organizations o

where o.deleted_at is null;

drop view v_organization_picker cascade;

create or replace view public.v_organization_picker as
select
  o.id,
  o.name,
  o.parent_id,
  p.name as parent_org_name,
  o.sort_order,
  t.name as org_type_name, 
  ap.name as province_name,
  ac.name as city_name

from public.organizations o
left join organizations p on p.id = o.parent_id
left join public.master_data t on t.id = o.org_type_id
left join public.admin_regions ap on ap.code = o.province_code
left join public.admin_regions ac on ac.code = o.city_code
where o.deleted_at is null;