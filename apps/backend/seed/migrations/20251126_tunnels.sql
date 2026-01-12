CREATE TABLE tunnels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    project_id UUID NOT NULL REFERENCES projects(id),
    project_catalog_id UUID NOT NULL REFERENCES project_catalogs(id),
    name TEXT NOT NULL,    

    start_chainage NUMERIC(10,3),
    end_chainage NUMERIC(10,3),
    prefix TEXT,   -- DK / YK / K etc.

    longitude NUMERIC(11,8),
    latitude NUMERIC(10,8),

    status_id UUID REFERENCES master_data(id),

    geology JSONB,
    
    gps JSONB,    
    
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth_users(id),
    updated_by UUID REFERENCES auth_users(id)

);



ALTER TABLE tunnels
   ADD COLUMN start_stake  NUMERIC(10,3),
   ADD COLUMN end_stake  NUMERIC(10,3);