import { useWatch } from "react-hook-form";
import { RegionCascader } from "../../admin-region/region-cascader";

export function FieldCascader({ field, form }) {
  const levels = field.option.levels;

  const values = useWatch({
    control: form.control,
    name: levels,
  }) as string[] | undefined;

  const province = values?.[0];
  const city = values?.[1];
  const district = values?.[2];

  return (
    <RegionCascader
      value={{ province, city, district }}
      onChange={(v) => {
        form.setValue(levels[0], v.province);
        form.setValue(levels[1], v.city);
        form.setValue(levels[2], v.district);
      }}
    />
  );
}
