// Seed script for threshold profiles and tbm_profile_map
// Usage: node tmp/seed_thresholds.js
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Please set SUPABASE_URL and SUPABASE_KEY in environment');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seed() {
    // Seed profiles from tbm_types
    const { data: tbmTypes, error } = await supabase.from('tbm_types').select('code,name');
    if (error) {
        console.error('Failed to read tbm_types:', error);
        process.exit(1);
    }
    const profiles = tbmTypes.map(t => ({ profile_name: t.code, description: t.name, active: true }));
    profiles.push({ profile_name: 'default', description: 'Global default thresholds', active: true });

    for (const p of profiles) {
        const { error: upsertErr } = await supabase
            .from('threshold_profiles')
            .upsert(p, { onConflict: 'profile_name' });
        if (upsertErr) console.error('upsert profile failed', p, upsertErr);
    }

    // Map existing tunnels to profiles by tbm_type_id
    const { data: tunnels } = await supabase.from('tunnels').select('tbm_code,tbm_type_id');
    if (!tunnels) {
        console.warn('No tunnels found to map');
        return;
    }
    for (const t of tunnels) {
        if (!t.tbm_code || !t.tbm_type_id) continue;
        // get type code
        const { data: tt } = await supabase.from('tbm_types').select('code').eq('id', t.tbm_type_id).limit(1);
        if (!tt || !tt.length) continue;
        const profile = tt[0].code;
        const { error: upsertMapErr } = await supabase
            .from('tbm_profile_map')
            .upsert({ tbm_code: t.tbm_code, profile_name: profile }, { onConflict: 'tbm_code' });
        if (upsertMapErr) console.error('upsert tbm_profile_map failed', t, upsertMapErr);
    }
    console.log('Seed complete');
}

seed().catch(err => { console.error(err); process.exit(1); });
