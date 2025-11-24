import { supabase } from "../utils/supabase/client.js";

import { getTbmMetadata, getParameterMetadata } from "../datastore/metadataStore.js";

// 原始数据库操作：插入阈值事件
export const insertThresholdEvent = async (eventRow) => {
    console.log("insertThresholdEvent", eventRow);

    const tbmMetadata = getTbmMetadata(eventRow.canonicalKey);

    const paramMetadata = getParameterMetadata(eventRow.paramCode);

    if (tbmMetadata) {
        eventRow = {
            tbm_id: tbmMetadata.tbmId,
            ring_no: eventRow.ringNo || null,
            severity: eventRow.severity || null,
            message: eventRow.message || '',
            payload: eventRow.payload || {},
            param_id: paramMetadata ? paramMetadata.id : null,            
            metric_value: eventRow.mvalue || null,
            normal_range: eventRow.range || null,
            triggered_at: eventRow.timestamp || new Date().toISOString(),

        }
    }
    const { data, error } = await supabase
        .from("realtime_threshold_events")
        .insert(eventRow)
        .select("*")
        .single();

    if (error) throw error;
    return data;
};

// 原始数据库操作：更新阈值事件
export const updateThresholdEventById = async (id, updates) => {
    const { data, error } = await supabase
        .from("realtime_threshold_events")
        .update(updates)
        .eq("id", id)
        .select("*")
        .single();

    if (error) throw error;
    return data;
};

// 原始数据库操作：删除阈值事件
export const deleteThresholdEventById = async (id) => {
    const { error } = await supabase
        .from("realtime_threshold_events")
        .delete()
        .eq("id", id);

    if (error) throw error;
    return true;
};

// 原始数据库操作：查询阈值事件
export const selectThresholdEvents = async (filters = {}) => {
    let query = supabase.from("realtime_threshold_events").select("*");

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        query = query.eq(key, value);
    });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
};

// 原始数据库操作：插入阈值事件指标
export const insertThresholdEventMetrics = async (rows) => {
    if (!Array.isArray(rows) || !rows.length) return [];

    const { data, error } = await supabase
        .from("realtime_threshold_event_metrics")
        .insert(rows)
        .select("*");

    if (error) throw error;
    return data || [];
};

// 原始数据库操作：删除指定事件的指标
export const deleteThresholdEventMetricsByEventId = async (eventId) => {
    const { error } = await supabase
        .from("realtime_threshold_event_metrics")
        .delete()
        .eq("event_id", eventId);

    if (error) throw error;
    return true;
};

// 原始数据库操作：查询阈值事件指标
export const selectThresholdEventMetrics = async (filters = {}) => {
    let query = supabase.from("realtime_threshold_event_metrics").select("*");

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        query = query.eq(key, value);
    });

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
};

