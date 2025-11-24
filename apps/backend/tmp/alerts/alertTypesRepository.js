import { supabase } from "../db.js";

export const listAlertTypes = async () => {
    try {
        const { data, error } = await supabase.from("alert_types").select("*");
        if (error) throw error;
        return data || [];
    } catch (err) {
        console.error("❌ Failed to list alert types:", err);
        return [];
    }
};

export const getAlertTypeByCode = async (code) => {
    try {
        const { data, error } = await supabase.from("alert_types").select("*").eq("code", code).maybeSingle();
        if (error) throw error;
        return data || null;
    } catch (err) {
        console.error("❌ Failed to get alert type:", err);
        return null;
    }
};

export const createAlertType = async ({ code, name, description = null }) => {
    try {
        const { data, error } = await supabase
            .from("alert_types")
            .insert({ code, name, description })
            .select("id")
            .single();
        if (error) throw error;
        return data?.id || null;
    } catch (err) {
        console.error("❌ Failed to create alert type:", err);
        throw err;
    }
};

export default {
    listAlertTypes,
    getAlertTypeByCode,
    createAlertType,
};
