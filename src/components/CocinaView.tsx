/**
 * CocinaView.tsx — Vista de la cocina (diseño compacto)
 *
 * Cada ítem tiene un icono clicable que avanza su estado en un ciclo de 3:
 *   ○ Pendiente → ◑ En Preparación → ✓ Entregado
 *
 * El icono reemplaza al botón para ahorrar espacio vertical y permitir
 * ver más pedidos en pantalla. El badge muestra el estado en texto.
 * Al llegar a "Entregado", el ítem queda tachado y el icono se desactiva.
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Circle, Timer, CheckCircle2 } from "lucide-react"

// Icono visual según el estado del ítem — también actúa como control
function EstadoIcon({ estado }: { estado: string }) {
  if (estado === "Entregado")      return <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
  if (estado === "En Preparación") return <Timer        className="h-4 w-4 text-primary shrink-0" />
  return                                  <Circle       className="h-4 w-4 text-muted-foreground shrink-0" />
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {pedidos.map(pedido => {
        const completo = pedido.items.every(i => i.estado === "Entregado")

        return (
          <Card key={pedido.id} className={`${completo ? "border-emerald-500/40 bg-emerald-500/5" : ""}`}>

            {/* Cabecera compacta: número de mesa + meta info en una sola línea */}
            <CardHeader className="py-2 px-3 flex-row items-center justify-between space-y-0">
              <span className="font-semibold text-sm">Mesa {pedido.mesa}</span>
              <span className="text-xs text-muted-foreground">#{pedido.id} · {pedido.hora}</span>
            </CardHeader>

            {/* Lista densa de ítems */}
            <CardContent className="px-3 pb-3 flex flex-col gap-1">
              {pedido.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">

                  {/*
                    Botón-icono: clic avanza el estado.
                    disabled cuando ya está Entregado (no hay estado siguiente).
                    title da feedback en hover sobre qué hará el clic.
                  */}
                  <button
                    onClick={() => avanzarEstadoItem(pedido.id, idx)}
                    disabled={item.estado === "Entregado"}
                    title={
                      item.estado === "Pendiente"      ? "Iniciar preparación" :
                      item.estado === "En Preparación" ? "Marcar como entregado" :
                      "Entregado"
                    }
                    className="disabled:cursor-default hover:opacity-70 transition-opacity"
                  >
                    <EstadoIcon estado={item.estado} />
                  </button>

                  {/* Nombre tachado cuando está entregado — feedback visual inmediato */}
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
