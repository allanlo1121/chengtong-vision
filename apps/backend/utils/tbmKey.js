export const normalizeTbmKey = (value) => {
    if (value === undefined || value === null) return null;
    const str = String(value).trim();
    if (!str) return null;
    return str.slice(0, 8).toUpperCase();
};

export const isValidTbmKey = (value) => Boolean(normalizeTbmKey(value));
