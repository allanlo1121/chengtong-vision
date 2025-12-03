

ALTER TABLE tbm_connectivity_snapshots
ADD COLUMN updated_by UUID REFERENCES auth.users(id)
    DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e';

ALTER TABLE your_table_name
ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE tbm_connectivity_snapshots
ADD COLUMN created_at TIMESTAMPTZ DEFAULT now();

ALTER TABLE tbm_connectivity_snapshots
ADD COLUMN created_by UUID REFERENCES auth.users(id)
    DEFAULT '6b7b6472-da9a-411d-94a0-27bd8fcd822e';