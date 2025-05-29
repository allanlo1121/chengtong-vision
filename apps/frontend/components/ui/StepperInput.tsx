import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface StepperInputProps {
  label?: string
  value: number
  onChange: (val: number) => void
  step?: number
  min?: number
  max?: number
  unit?: string
}

export function StepperInput({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  unit,
}: StepperInputProps) {
  const handleDecrement = () => onChange(Math.max(min, value - step))
  const handleIncrement = () => onChange(Math.min(max, value + step))

  return (
    <div className="flex items-center gap-3">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      <div className="flex items-center gap-1 border rounded px-2 py-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          –
        </Button>
        <Input
          type="number"
          className="w-16 text-center border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          +
        </Button>
      </div>

      {unit && <span className="text-gray-500 text-sm">{unit}</span>}
    </div>
  )
}
