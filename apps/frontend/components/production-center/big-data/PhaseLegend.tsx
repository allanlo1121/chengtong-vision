

export default function PhaseLegend() {
    return (
        <div className="flex gap-4 mb-2 text-sm items-center">
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-jue-400" /> 掘进
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-400" /> 拼装
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-amber-400" /> 停机
            </div>
            <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-400" /> 掉线
            </div>
        </div>
    );
}