/**
 * CocinaView.tsx — Vista de la cocina
 *
 * Cada ítem muestra un Checkbox para avanzar su estado:
 *   ☐ sin marcar → Pendiente o En Preparación (aún hay trabajo)
 *   ☑ marcado    → Entregado (listo, desactiva el checkbox)
 *
 * El Badge al lado muestra el estado exacto en texto.
 * Cuando todos los ítems están Entregados, la card se resalta.
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { UI } from "@/lib/ui"
import { cn } from "@/lib/utils"
import type { EstadoItem } from "@/data/mock"

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
    <div className={UI.gridPedidos}>
      {pedidos.map(pedido => {
        const completo = pedido.items.every(i => i.estado === "Entregado")

        return (
          <Card key={pedido.id} className={completo ? "border-emerald-500/40 bg-emerald-500/5" : ""}>

            <CardHeader className="py-2 px-3 flex-row items-center justify-between space-y-0">
              <span className="font-semibold text-sm">Mesa {pedido.mesa}</span>
              <span className="text-xs text-muted-foreground">#{pedido.id} · {pedido.hora}</span>
            </CardHeader>

            <CardContent className="px-3 pb-3 flex flex-col gap-1.5">
              {pedido.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">

                  {/*
                    Tres estados nativos de Radix/shadcn:
                      false           → ☐  Pendiente
                      "indeterminate" → ⊟  En Preparación
                      true            → ☑  Entregado
                  */}
                  <Checkbox
                    checked={
                      item.estado === "Entregado"      ? true :
                      item.estado === "En Preparación" ? "indeterminate" :
                      false
                    }
                    onCheckedChange={() => avanzarEstadoItem(pedido.id, idx)}
                    disabled={item.estado === "Entregado"}
                  />

                  <span className={cn(
                    "text-sm flex-1 truncate",
                    item.estado === "Entregado" && "line-through text-muted-foreground"
                  )}>
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
