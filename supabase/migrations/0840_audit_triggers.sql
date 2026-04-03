
-- Master_definitions audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.master_definitions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.master_definitions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.master_definitions
for each row
execute function system.audit_delete();

-- Maseter_data audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.master_data
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.master_data
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.master_data
for each row
execute function system.audit_delete();

--Countries audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.countries
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.countries
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.countries
for each row
execute function system.audit_delete();

--Admin_regions audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.admin_regions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.admin_regions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.admin_regions
for each row
execute function system.audit_delete();

--Person audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.persons
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.persons
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.persons
for each row
execute function system.audit_delete();

-- Organization audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.organizations
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.organizations
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.organizations
for each row
execute function system.audit_delete();

-- Employee audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.employees
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.employees
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.employees
for each row
execute function system.audit_delete();

--Education audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.educations
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.educations
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.educations
for each row
execute function system.audit_delete();

--hr.employee_posts audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.employee_posts
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.employee_posts
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.employee_posts
for each row
execute function system.audit_delete();

--hr.employee_post_history audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.employee_post_history
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.employee_post_history
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.employee_post_history
for each row
execute function system.audit_delete();

-- hr.employee_titles audit triggers
-- INSERT
create trigger trg_org_insert
before insert on hr.employee_titles
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on hr.employee_titles
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on hr.employee_titles
for each row
execute function system.audit_delete();

-- publie.import_batches audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.import_batches
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.import_batches
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.import_batches
for each row
execute function system.audit_delete();

--public.import_records audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.import_records
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.import_records
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.import_records
for each row
execute function system.audit_delete();

-- public.projects audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.projects
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.projects
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.projects
for each row
execute function system.audit_delete();



-- rbac.permissions audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.permissions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.permissions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.permissions
for each row
execute function system.audit_delete();



-- rbac.roles audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.roles
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.roles
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.roles
for each row
execute function system.audit_delete();


-- rbac.role_permissions audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.role_permissions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.role_permissions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.role_permissions
for each row
execute function system.audit_delete();

-- rbac.user_roles audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.user_roles
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.user_roles
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.user_roles
for each row
execute function system.audit_delete();


-- rbac.post_permissions audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.post_permissions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.post_permissions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.post_permissions
for each row
execute function system.audit_delete();

--rbac.user_roles audit triggers
-- INSERT
create trigger trg_org_insert
before insert on rbac.person_permissions
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on rbac.person_permissions
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on rbac.person_permissions
for each row
execute function system.audit_delete();

-- user_favorite_projects audit triggers
-- INSERT
create trigger trg_org_insert
before insert on public.user_favorite_projects
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on public.user_favorite_projects
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on public.user_favorite_projects
for each row
execute function system.audit_delete();

-- rbac.menus audit triggers
-- INSERT
create trigger trg_org_insert
before insert on system.menus
for each row
execute function system.audit_insert();

-- UPDATE
create trigger trg_org_update
before update on system.menus
for each row
execute function system.audit_update();

-- DELETE
create trigger trg_org_delete
before delete on system.menus
for each row
execute function system.audit_delete();