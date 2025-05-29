import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'


export interface ParameterMeta {
  name: string
  unit?: string
}

interface ParameterNameStore {
  codeToMeta: Record<string, ParameterMeta>
  setCodeToMeta: (map: Record<string, ParameterMeta>) => void
  getName: (code: string) => string
  getNameWithUnit: (code: string) => string
  loadParameterMetaMap: () => Promise<void>
  isLoaded: boolean
  setIsLoaded: (loaded: boolean) => void
}

export const useParameterNameMap = create<ParameterNameStore>((set, get) => ({
  codeToMeta: {},
  isLoaded: false,
  setCodeToMeta: (map) => set({ codeToMeta: map }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  getName: (code) => get().codeToMeta[code]?.name || code,
  getNameWithUnit: (code) => {
    const meta = get().codeToMeta[code];
    return meta ? `${meta.name}${meta.unit ? ` (${meta.unit})` : ''}` : code;
  },
  loadParameterMetaMap: async () => {
    if (get().isLoaded) return;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('tbm_runtime_parameters')
      .select('code, name, unit')
      .eq('delete_flag', 0);

    if (error) {
      console.error('加载参数定义失败:', error);
      return;
    }

    const map: Record<string, ParameterMeta> = {};
    data?.forEach(item => {
      map[item.code] = { name: item.name, unit: item.unit || undefined };
    });

    set({ codeToMeta: map, isLoaded: true });
  },
}));

export function useInitParameterNameMap() {
  const load = useParameterNameMap((state) => state.loadParameterMetaMap);
  useEffect(() => {
    load();
  }, [load]);
}
