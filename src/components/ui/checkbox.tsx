import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

/**
 * Checkbox con soporte de 3 estados via la prop `checked`:
 *   false           → ☐ sin marcar  (Pendiente)
 *   "indeterminate" → ⊟ guión       (En Preparación)
 *   true            → ☑ con check   (Entregado)
 */
function Checkbox({
  className,
  checked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        "dark:bg-input/30 dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
        {/* Ícono según el estado actual — checked controla cuál se muestra */}
        {checked === "indeterminate" ? <MinusIcon className="size-3.5" /> : <CheckIcon className="size-3.5" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
