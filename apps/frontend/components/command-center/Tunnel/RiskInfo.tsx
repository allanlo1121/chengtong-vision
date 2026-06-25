export function RiskInfo() {
  return (
    <div className="w-full h-16  px-4 grid grid-cols-3  bg-white/80 rounded-lg border border-red-500 flex items-center justify-center text-red-600 font-bold">
      <div className=" col-span-1  border-slate-200 ">
        <div className="mt-2 pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
          掌子面里程
        </div>

        <div className="text-base font-bold text-slate-900">K12+345.6</div>
      </div>
      <div className=" col-span-1 border-slate-200">
        <div className="mt-2 pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
          当前地质
        </div>

        <div className="text-base font-bold text-slate-900">微风化花岗岩</div>
      </div>

      <div className=" col-span-1  border-slate-200 ">
        <div className="mt-2  pl-2 text-xs @md:text-xs @lg:text-base @xl:text-lg text-slate-500 border-l-2">
          当前风险/下个风险
        </div>

        <div className="text-base font-bold text-slate-900">断层破碎带</div>
      </div>
    </div>
  );
}
