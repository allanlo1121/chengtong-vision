'use client';

import react, { useState, useMemo, useEffect } from 'react';
import ParameterSelector from './ParameterSelector';
import { StepperInput } from '@/components/ui/StepperInput';

const DEFAULT_FIELDS = ['s010102004', 's010109001', 's050001001'];


export default function TbmQuerySummaryForm({ onQuery, tunnelId, currentRing }: { onQuery: (params: any) => void, tunnelId: string, currentRing?: number }) {

    if (!tunnelId) {
        return <div className="text-red-500">未选择隧道，请先选择一个隧道。</div>;
    }

    const defaultStart = currentRing != null ? Math.max(currentRing - 10, 0) : null;

    const [ringStart, setRingStart] = useState<number | null>(defaultStart ?? null);
    const [ringEnd, setRingEnd] = useState<number | null>(currentRing ?? null);
    const [fields, setFields] = useState<string[]>(DEFAULT_FIELDS);
    const [codeToName, setCodeToName] = useState<Record<string, string>>({});

    // console.log('[BigData] TbmQuerySummaryForm - 当前隧道ID:', tunnelId);
    // console.log('[BigData] TbmQuerySummaryForm - 当前环号:', currentRing);
    // console.log('[BigData] TbmQuerySummaryForm - 默认开始环号:', defaultStart);


    const allowedSubsystems = useMemo(() => ['s01', 's02', 's05', 's10'], []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('提交查询:', {
        //     tunnelId,
        //     ringStart,
        //     ringEnd,
        //     fields,
        // });

        if (!tunnelId || fields.length === 0) return;
        onQuery({ ringStart, ringEnd, fields });
    };

    useEffect(() => {
        if (currentRing != null) {
            setRingStart(Math.max(currentRing - 10, 0));
            setRingEnd(currentRing);
        }
    }, [currentRing]);

    const handleRemoveField = (code: string) => {
        setFields(prev => prev.filter(c => c !== code));
    };

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-row rounded">
            {/* 左侧：参数选择器 */}
            <div className="w-64 h-full overflow-y-auto border-2  rounded">
                <ParameterSelector value={fields} onChange={setFields} tunnel_id={tunnelId} filterSubsystems={allowedSubsystems}
                    onNamesChange={setCodeToName} />
            </div>


            {/* 右侧：操作条 */}
            <div className="absolute left-64 top-0  right-0 h-16 flex-1 flex flex-row items-center gap-4 border-2 ">
                <div className="flex items-center gap-4">

                    <div className="flex items-center gap-4 pl-4">
                        <label>环号：</label>
                        <StepperInput
                            label=""
                            value={ringStart ?? 0}
                            onChange={setRingStart}
                            step={1}
                            min={0}
                            max={9999}
                            unit=""
                        />-
                        <StepperInput
                            label=""
                            value={ringEnd ?? 0}
                            onChange={setRingEnd}
                            step={1}
                            min={0}
                            max={9999}
                            unit=""
                        />
                    </div>


                    {/* ✅ 顶部参数标签显示区域 */}
                    <div className="flex items-center gap-2">
                        <span className="w-28 font-semibold text-gray-700">设备参数:</span>

                        <div className="flex flex-wrap min-h-10 items-center gap-2 border border-dashed border-gray-300 px-2 py-1 rounded w-full">
                            {fields.length > 0 ? (
                                fields.map(code => (
                                    <span
                                        key={code}
                                        className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-sm text-sm flex items-center justify-center"
                                    >
                                        {codeToName[code] || code}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField(code)}
                                            className="ml-1 text-blue-500 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm italic">尚未选择字段</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            查询
                        </button>
                    </div>

                </div>
            </div>
        </form>
    );
}
