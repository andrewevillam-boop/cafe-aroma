/**
 * CocinaView.tsx — Vista de la cocina
 *
 * Muestra los pedidos activos para que el personal de cocina
 * actualice el estado de cada ítem conforme los prepara.
 *
 * Flujo:
 *   1. El mesero confirma un pedido → aparece aquí en estado "Pendiente"
 *   2. El cocinero presiona "→ En Preparación" cuando empieza a preparar el ítem
 *   3. Presiona "→ Entregado" cuando el mesero lleva el ítem a la mesa
 *
 * Cuando todos los ítems de un pedido están "Entregado", el pedido
 * aparece resaltado para indicar que está listo para cobrar.
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChefHat, CheckCircle2 } from "lucide-react"

// Colores de badge según el estado del ítem
const variantPorEstado = {
  "Pendiente":      "destructive",
  "En Preparación": "default",
  "Entregado":      "secondary",
} as const

export function CocinaView() {
  const pedidos            = useCafeStore(s => s.pedidos)
  const avanzarEstadoItem  = useCafeStore(s => s.avanzarEstadoItem)

  if (pedidos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">No hay pedidos activos en este momento.</p>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {pedidos.map(pedido => {
        // Un pedido está completo cuando todos sus ítems fueron entregados
        const completo = pedido.items.every(item => item.estado === "Entregado")

        return (
          <Card key={pedido.id} className={completo ? "border-primary/50 bg-primary/5" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                {completo
                  ? <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  : <ChefHat className="h-4 w-4 text-primary shrink-0" />
                }
                Mesa {pedido.mesa}
                <span className="text-xs font-normal text-muted-foreground ml-auto">
                  #{pedido.id} · {pedido.hora}
                </span>
              </CardTitle>
              {completo && (
                <p className="text-xs text-primary font-medium">
                  Todos los ítems entregados
                </p>
              )}
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              {pedido.items.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1.5 border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.nombre}</p>
                      <p className="text-xs text-muted-foreground">×{item.cantidad}</p>
                    </div>
                    <Badge variant={variantPorEstado[item.estado]} className="text-xs shrink-0">
                      {item.estado}
                    </Badge>
                  </div>

                  {/* Solo mostramos el botón si el ítem aún no fue entregado */}
                  {item.estado !== "Entregado" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs w-full"
                      onClick={() => avanzarEstadoItem(pedido.id, idx)}
                    >
                      {item.estado === "Pendiente"
                        ? "→ En Preparación"
                        : "→ Entregado"
                      }
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
