import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"
import { CheckIcon, MinusIcon } from "lucide-react"

/**
 * Checkbox con soporte de 3 estados via la prop `checked`:
 *   false           → ☐ sin marcar  (Pendiente)
 *   "indeterminate" → ⊟ guión       (En Preparación)
 *   true            → ☑ con check   (Entregado)
 *
 * Radix maneja el estado indeterminate de forma nativa —
 * solo hay que pasar checked="indeterminate" y renderizar el ícono correcto.
 */
function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      // "group" permite que los hijos lean el data-state del padre con group-data-[...]
      className={cn(
        "group peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
        "dark:bg-input/30 dark:data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {/* Visible solo cuando está marcado (checked) */}
        <CheckIcon className="size-3.5 group-data-[state=indeterminate]:hidden" />
        {/* Visible solo en estado indeterminate */}
        <MinusIcon className="size-3.5 hidden group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
