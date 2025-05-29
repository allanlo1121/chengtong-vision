'use client';

import react, { useState, useMemo, useEffect } from 'react';
import ParameterSelector from './ParameterSelector';
import {StepperInput} from '@/components/ui/StepperInput';

type Mode = 'time' | 'ring';


const DEFAULT_FIELDS = ['s010102004', 's010109001', 's050001001'];


export default function TbmQueryDetailForm({ onQuery, tunnel_id, current_ring }: { onQuery: (params: any) => void, tunnel_id: string, current_ring?: number }) {

    if (!tunnel_id) {
        return <div className="text-red-500">未选择隧道，请先选择一个隧道。</div>;
    }
    const [mode, setMode] = useState<Mode>('ring');

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [ring, setRing] = useState<number | null>(current_ring ?? null);
    const [fields, setFields] = useState<string[]>(DEFAULT_FIELDS);
    const [codeToName, setCodeToName] = useState<Record<string, string>>({});

    useEffect(() => {
        // 每当 current_ring 变化，更新 ring（仅限 ring 模式）
        if (mode === 'ring') {
            setRing(current_ring ?? null);
        }
    }, [current_ring]);


    const allowedSubsystems = useMemo(() => ['s01', 's02', 's05', 's10'], []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('提交查询:', {
            mode,
            tunnel_id,
            from,
            to,
            ring,
            fields,
        });

        if (!tunnel_id || fields.length === 0) return;

        if (mode === 'ring') {
            onQuery({ mode, tunnel_id, ring, fields });
        } else {
            onQuery({ mode, tunnel_id, from, to, fields });
        }
    };



    const handleRemoveField = (code: string) => {
        setFields(prev => prev.filter(c => c !== code));
    };

    return (
        <form onSubmit={handleSubmit} className="h-full flex flex-row rounded">
            {/* 左侧：参数选择器 */}
            <div className="w-64 h-full overflow-y-auto border-2  rounded">
                <ParameterSelector value={fields} onChange={setFields} tunnel_id={tunnel_id} filterSubsystems={allowedSubsystems}
                    onNamesChange={setCodeToName} />
            </div>


            {/* 右侧：操作条 */}
            <div className="absolute left-64 top-0  right-0 h-16 flex-1 flex flex-row items-center gap-4 border-2 ">
                <div className="flex items-center gap-4">

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setMode('ring')}
                            className={`px-3 py-1 rounded border ${mode === 'ring' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                                }`}
                        >
                            按环查询
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('time')}
                            className={`px-3 py-1 rounded border ${mode === 'time' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                                }`}
                        >
                            按时间查询
                        </button>
                    </div>
                </div>

                {mode === 'time' && (
                    <div className="flex items-center gap-4">
                        <label>起止时间：</label>
                        <input
                            type="datetime-local"
                            value={from}
                            onChange={e => setFrom(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                        <span>→</span>
                        <input
                            type="datetime-local"
                            value={to}
                            onChange={e => setTo(e.target.value)}
                            className="border px-2 py-1 rounded"
                        />
                    </div>
                )}

                {mode === 'ring' && (
                    <div className="flex items-center gap-4">
                        <label>环号：</label>
                        <StepperInput
                            label="环号"
                            value={ring ?? 0}
                            onChange={setRing}
                            step={1}
                            min={0}
                            max={9999}
                            unit="环"
                        />
                    </div>
                )}

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
        </form>
    );
}
