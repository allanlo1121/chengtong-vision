-- Migration: create threshold profiles and thresholds tables
-- 2025-10-14

BEGIN;

-- profiles table
CREATE TABLE IF NOT EXISTS public.threshold_profiles (
  profile_name text PRIMARY KEY,
  description text,
  active boolean DEFAULT true,
  created_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- tbm -> profile mapping
CREATE TABLE IF NOT EXISTS public.tbm_profile_map (
  tbm_code text PRIMARY KEY,
  profile_name text REFERENCES public.threshold_profiles(profile_name),
  active boolean DEFAULT true,
  assigned_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tbm_profile_map ON public.tbm_profile_map(tbm_code);

-- main thresholds table (profile-based, bind by param_id)
CREATE TABLE IF NOT EXISTS public.tbm_parameter_thresholds (
  id serial PRIMARY KEY,
  profile_name text,            -- NULL or 'default' means global default
  param_id bigint NOT NULL,     -- foreign id to tbm_runtime_parameters.id
  baseline_lower double precision,
  baseline_upper double precision,
  alert_lower double precision,
  alert_upper double precision,
  alert_upper_upper double precision,
  alert_lower_lower double precision,
  use_absolute boolean DEFAULT false,
  active boolean DEFAULT true,
  updated_by text,
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_thresholds_profile_paramid ON public.tbm_parameter_thresholds(profile_name, param_id);

-- per-tbm overrides (highest priority)
CREATE TABLE IF NOT EXISTS public.tbm_threshold_overrides (
  id serial PRIMARY KEY,
  tbm_code text NOT NULL,
  param_id bigint NOT NULL REFERENCES public.tbm_runtime_parameters(id),
  baseline_lower double precision,
  baseline_upper double precision,
  alert_lower double precision,
  alert_upper double precision,
  alert_upper_upper double precision,
  alert_lower_lower double precision,
  use_absolute boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
  updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e'
);
CREATE INDEX IF NOT EXISTS idx_overrides_tbm_paramid ON public.tbm_threshold_overrides(tbm_code, param_id);

-- Seed threshold_profiles from existing tbm_types if available
INSERT INTO public.threshold_profiles(profile_name, description, active)
SELECT code, name, true FROM public.tbm_types
ON CONFLICT (profile_name) DO NOTHING;

-- Ensure a 'default' profile exists
INSERT INTO public.threshold_profiles(profile_name, description, active)
VALUES ('default', 'Global default thresholds', true)
ON CONFLICT (profile_name) DO NOTHING;

-- Try to populate tbm_profile_map from existing tunnels/tbm_types mapping where possible
-- This assumes your TBM table is public.tunnels with tbm_code and tbm_type_id
INSERT INTO public.tbm_profile_map (tbm_code, profile_name)
SELECT t.tbm_code, tt.code
FROM public.tunnels t
JOIN public.tbm_types tt ON t.tbm_type_id = tt.id
ON CONFLICT (tbm_code) DO UPDATE SET profile_name = EXCLUDED.profile_name;

COMMIT;


INSERT INTO "public"."tbm_delta_threshold_overrides" ("id", "tbm_id", "param_id", "window_ms", "delta_warning_abs", "delta_critical_abs", "is_active", "updated_by", "updated_at") VALUES ('1', '01342b8d-b0d6-4f5f-96a0-7d46e2a2d09f', '1', '600000', null, null, 'true', null, '2025-11-27 09:15:02.12482+00');


CREATE TABLE IF NOT EXISTS public.tbm_delta_threshold_overrides (
  id serial PRIMARY KEY,
  tbm_id UUID NOT NULL REFERENCES public.tbms(id),
  param_id bigint NOT NULL REFERENCES public.tbm_runtime_parameters(id),
  window_ms bigint,
  delta_warning_abs double precision,
  delta_critical_abs double precision,
  is_active boolean DEFAULT true,
  updated_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e',
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id) DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e'
);