create or replace view public.v_project_picker as
select
  p.id,
  p.name,
  p.full_name,
  org.name as organization_name,
  region.name as region_name,
  status.name as status_name

from public.projects p

left join public.organizations org
  on org.id = p.organization_id

left join public.master_data region
  on region.id = p.region_id

left join project_status_timeline ps
  on ps.project_id = p.id
 and ps.valid_to is null

left join master_data status
  on status.id = ps.project_status_id

where p.deleted_at is null;