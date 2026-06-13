/**
 * Dashboard.tsx — Vista general del salón
 *
 * Muestra el estado de todas las mesas en tiempo real (en memoria).
 * El mesero puede hacer clic en una mesa disponible para tomar un pedido.
 *
 * Flujo:
 *   1. Mesero ve las mesas y sus estados
 *   2. Hace clic en una mesa "Disponible"
 *   3. El store guarda qué mesa se seleccionó (seleccionarMesa)
 *   4. Se navega automáticamente a la página del Mesero
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import { navigate } from "astro:transitions/client"
import type { Mesa } from "@/data/mock"

// Color del badge según el estado de la mesa
const variantPorEstado = {
  Disponible: "secondary",
  Activa:     "default",
  Cerrada:    "destructive",
} as const

export function Dashboard() {
  // Leemos el estado y las acciones del store global
  const mesas           = useCafeStore(s => s.mesas)
  const seleccionarMesa = useCafeStore(s => s.seleccionarMesa)

  // Contadores para el resumen rápido
  const disponibles = mesas.filter(m => m.estado === "Disponible").length
  const activas     = mesas.filter(m => m.estado === "Activa").length
  const cerradas    = mesas.filter(m => m.estado === "Cerrada").length

  function handleClickMesa(mesa: Mesa) {
    // Solo se puede tomar pedido en mesas disponibles
    if (mesa.estado !== "Disponible") return

    // Guardar qué mesa seleccionó el mesero y navegar a la vista de pedido
    seleccionarMesa(mesa.id)
    navigate(`${import.meta.env.BASE_URL}mesero/`)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Resumen rápido del salón */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-primary">{disponibles}</p>
            <p className="text-xs text-muted-foreground mt-1">Disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold">{activas}</p>
            <p className="text-xs text-muted-foreground mt-1">Activas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-2xl font-bold text-destructive">{cerradas}</p>
            <p className="text-xs text-muted-foreground mt-1">Cerradas</p>
          </CardContent>
        </Card>
      </div>

      {/* Grid de mesas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {mesas.map(mesa => (
          <Card
            key={mesa.id}
            // Solo las mesas disponibles son clickeables
            onClick={() => handleClickMesa(mesa)}
            className={
              mesa.estado === "Disponible"
                ? "cursor-pointer hover:border-primary transition-colors"
                : "opacity-80"
            }
          >
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-base">Mesa {mesa.id}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 px-4 pb-4">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  {mesa.capacidad}
                </span>
                <Badge variant={variantPorEstado[mesa.estado]}>{mesa.estado}</Badge>
              </div>
              {mesa.estado === "Disponible" && (
                <p className="text-xs text-muted-foreground">Clic para tomar pedido</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
