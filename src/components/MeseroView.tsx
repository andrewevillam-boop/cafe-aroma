/**
 * MeseroView.tsx — Vista del mesero para tomar pedidos
 *
 * Permite al mesero armar un pedido para la mesa seleccionada.
 *
 * Flujo completo:
 *   1. El mesero llega aquí desde el Dashboard (con mesa ya seleccionada)
 *   2. Busca productos en el menú paginado y presiona "+ Agregar"
 *   3. Ve el carrito actualizado en tiempo real con el subtotal
 *   4. Presiona "Confirmar Pedido" → el pedido va a cocina
 *   5. La mesa pasa a estado "Activa" y el carrito se vacía
 *
 * Si no hay mesa seleccionada (acceso directo por URL), se muestra un aviso.
 */

import { useCafeStore } from "@/store/useCafeStore"
import { MenuPaginado } from "@/components/MenuPaginado"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, UtensilsCrossed, Plus, Minus } from "lucide-react"
import { navigate } from "astro:transitions/client"
import { menu } from "@/data/mock"

export function MeseroView() {
  // Leemos todo lo que necesitamos del store
  const mesaActivaId      = useCafeStore(s => s.mesaActivaId)
  const carrito           = useCafeStore(s => s.carrito)
  const agregarAlCarrito  = useCafeStore(s => s.agregarAlCarrito)
  const quitarDelCarrito  = useCafeStore(s => s.quitarDelCarrito)
  const confirmarPedido   = useCafeStore(s => s.confirmarPedido)

  // Calcular el subtotal sumando precio × cantidad de cada ítem
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // Si el mesero llegó aquí sin seleccionar mesa primero, mostramos un aviso
  if (!mesaActivaId) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <p className="text-muted-foreground">No hay ninguna mesa seleccionada.</p>
        <Button variant="outline" onClick={() => navigate(`${import.meta.env.BASE_URL}`)}>
          Ir al Dashboard
        </Button>
      </div>
    )
  }

  function handleConfirmar() {
    confirmarPedido()
    // Después de confirmar, vamos a cocina para ver el pedido en acción
    navigate(`${import.meta.env.BASE_URL}cocina/`)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">

      {/* ── Menú ─────────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UtensilsCrossed className="h-4 w-4 text-primary shrink-0" />
            Menú
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/*
            Le pasamos onAgregar al MenuPaginado.
            Cada vez que el mesero presione "+ Agregar", llamamos agregarAlCarrito.
          */}
          <MenuPaginado menu={menu} onAgregar={agregarAlCarrito} />
        </CardContent>
      </Card>

      {/* ── Carrito / Pedido actual ───────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="h-4 w-4 text-primary shrink-0" />
            Pedido · Mesa {mesaActivaId}
            <Badge variant="secondary" className="ml-auto text-xs font-normal">
              {carrito.length} {carrito.length === 1 ? "ítem" : "ítems"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">

          {carrito.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Agrega productos desde el menú
            </p>
          ) : (
            <>
              {/* Lista de ítems en el carrito */}
              {carrito.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      ${item.precio.toFixed(2)} c/u
                    </p>
                  </div>

                  {/* Controles de cantidad */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => quitarDelCarrito(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-4 text-center">
                      {item.cantidad}
                    </span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => agregarAlCarrito({
                        id: item.id,
                        nombre: item.nombre,
                        precio: item.precio,
                        categoria: "Comidas", // no importa para el carrito
                      })}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>

                    {/* Subtotal del ítem */}
                    <span className="text-sm font-medium w-14 text-right">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}

              {/* Total y botón de confirmar */}
              <div className="border-t pt-3 mt-1 flex justify-between font-semibold text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-end mt-1">
                <Button onClick={handleConfirmar}>
                  Confirmar Pedido
                </Button>
              </div>
            </>
          )}

        </CardContent>
      </Card>

    </div>
  )
}
