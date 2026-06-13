/**
 * CocinaView.tsx — Vista de la cocina
 *
 * Cada ítem del pedido tiene un Checkbox de 3 estados:
 *   ☐ false           → Pendiente       (sin preparar)
 *   ⊟ "indeterminate" → En Preparación  (en proceso)
 *   ☑ true            → Entregado       (listo y servido)
 *
 * Un clic en el checkbox avanza al siguiente estado.
 * Cuando todos los ítems están en "Entregado", la card se resalta en verde.
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { EstadoItem } from "@/data/mock"

// Mapea el estado del ítem al valor que entiende el Checkbox de Radix
const checkboxState: Record<EstadoItem, boolean | "indeterminate"> = {
  "Pendiente":      false,
  "En Preparación": "indeterminate",
  "Entregado":      true,
}

const variantPorEstado = {
  "Pendiente":      "destructive",
  "En Preparación": "default",
  "Entregado":      "secondary",
} as const

export function CocinaView() {
  const pedidos           = useCafeStore(s => s.pedidos)
  const avanzarEstadoItem = useCafeStore(s => s.avanzarEstadoItem)

  if (pedidos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">No hay pedidos activos en este momento.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-3">
      {pedidos.map(pedido => {
        const completo = pedido.items.every(i => i.estado === "Entregado")

        return (
          <Card key={pedido.id} className={completo ? "border-emerald-500/40 bg-emerald-500/5" : ""}>

            {/* Cabecera compacta en una línea */}
            <CardHeader className="py-2 px-3 flex-row items-center justify-between space-y-0">
              <span className="font-semibold text-sm">Mesa {pedido.mesa}</span>
              <span className="text-xs text-muted-foreground">#{pedido.id} · {pedido.hora}</span>
            </CardHeader>

            <CardContent className="px-3 pb-3 flex flex-col gap-1.5">
              {pedido.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">

                  {/*
                    Checkbox controlado por el estado del ítem en el store.
                    onCheckedChange ignora el nuevo valor — siempre avanzamos
                    al siguiente estado en la secuencia definida en el store.
                    disabled cuando ya llegó a "Entregado".
                  */}
                  <Checkbox
                    checked={checkboxState[item.estado]}
                    onCheckedChange={() => avanzarEstadoItem(pedido.id, idx)}
                    disabled={item.estado === "Entregado"}
                  />

                  {/* Nombre tachado al entregar — feedback visual inmediato */}
                  <span className={`text-sm flex-1 truncate ${item.estado === "Entregado" ? "line-through text-muted-foreground" : ""}`}>
                    {item.nombre}
                  </span>

                  <span className="text-xs text-muted-foreground shrink-0">×{item.cantidad}</span>

                  <Badge variant={variantPorEstado[item.estado]} className="text-xs px-1.5 py-0 shrink-0">
                    {item.estado}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
