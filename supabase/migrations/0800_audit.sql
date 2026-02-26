-- ============================================
-- Base Audit Infrastructure
-- Version: 2026022402
-- Purpose:
--   - Unified audit columns
--   - Auto updated_at trigger
--   - Optional soft delete helper
-- ============================================




create table audit.logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text,
  entity_id uuid,
  action text not null,
  old_data jsonb,
  new_data jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);