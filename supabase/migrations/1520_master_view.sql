create view public.v_master_options as
select
  d.id,
  d.code,
  d.name,
  d.description,
  d.is_active,
  def.id as definition_id,
  def.code as definition_code,
  def.name as definition_name
from public.master_data d
join public.master_definitions def
  on d.definition_id = def.id
where d.is_active = true
  and d.deleted_at is null;