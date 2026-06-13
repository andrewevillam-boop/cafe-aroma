/**
 * MesaGrid.tsx — Grid auto-ajustable de mesas
 *
 * Componente compartido entre Dashboard y MeseroView.
 * Muestra las mesas como tarjetas compactas en un grid que se adapta
 * al ancho disponible: más columnas en pantallas grandes, menos en móvil.
 *
 * grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]
 *   auto-fill  → crea tantas columnas como quepan
 *   minmax     → cada columna mide mínimo 8rem (128px) y máximo 1fr
 *   Resultado  → en 1024px caben ~8 columnas; en 320px caben ~2
 *
 * Al hacer clic en una mesa Disponible:
 *   1. La guardamos como mesa activa en el store
 *   2. Navegamos a la página del mesero
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { navigate } from "astro:transitions/client"
import { UI } from "@/lib/ui"
import type { Mesa } from "@/data/mock"

const variantPorEstado = {
  Disponible: "secondary",
  Activa:     "default",
  Cerrada:    "destructive",
} as const

export function MesaGrid() {
  const mesas           = useCafeStore(s => s.mesas)
  const seleccionarMesa = useCafeStore(s => s.seleccionarMesa)

  const disponibles = mesas.filter(m => m.estado === "Disponible").length
  const activas     = mesas.filter(m => m.estado === "Activa").length
  const cerradas    = mesas.filter(m => m.estado === "Cerrada").length

  function handleClick(mesa: Mesa) {
    if (mesa.estado !== "Disponible") return
    seleccionarMesa(mesa.id)
    navigate(`${import.meta.env.BASE_URL}mesero/`)
  }

  return (
    <div className="flex flex-col gap-3">

      {/* Resumen de ocupación en una sola línea — sin cards grandes */}
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-primary">{disponibles}</span> disponibles &nbsp;·&nbsp;
        <span className="font-semibold text-foreground">{activas}</span> activas &nbsp;·&nbsp;
        <span className="font-semibold text-destructive">{cerradas}</span> cerradas
      </p>

      <div className={UI.gridMesas}>
        {mesas.map(mesa => (
          <Card
            key={mesa.id}
            onClick={() => handleClick(mesa)}
            className={
              mesa.estado === "Disponible"
                ? "cursor-pointer hover:border-primary transition-colors"
                : "opacity-70"
            }
          >
            <CardContent className="p-3 flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-1">
                <span className="font-semibold text-sm">Mesa {mesa.id}</span>
                <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {mesa.capacidad}
                </span>
              </div>
              <Badge variant={variantPorEstado[mesa.estado]} className="text-xs w-fit">
                {mesa.estado}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}
