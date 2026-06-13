/**
 * AdminView.tsx — Vista de administración y cobro
 *
 * Muestra el resumen de todos los pedidos activos con su total.
 * El administrador puede cerrar la cuenta de cualquier mesa,
 * lo que elimina el pedido y deja la mesa disponible nuevamente.
 *
 * Flujo:
 *   1. Un cliente pide la cuenta
 *   2. El admin ve el pedido con el desglose de ítems y el total
 *   3. Presiona "Cerrar Cuenta" → mesa queda Disponible, pedido desaparece
 */

import { useCafeStore } from "@/store/useCafeStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Receipt } from "lucide-react"
import { UI } from "@/lib/ui"

// Colores de badge según el estado del ítem (igual que en CocinaView)
const variantPorEstado = {
  "Pendiente":      "destructive",
  "En Preparación": "default",
  "Entregado":      "secondary",
} as const

export function AdminView() {
  const pedidos     = useCafeStore(s => s.pedidos)
  const cerrarCuenta = useCafeStore(s => s.cerrarCuenta)

  if (pedidos.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">No hay cuentas pendientes por cobrar.</p>
      </div>
    )
  }

  return (
    <div className={UI.gridFacturas}>
      {pedidos.map(pedido => {
        // Calcular el total del pedido: precio × cantidad de cada ítem
        const total = pedido.items.reduce(
          (acc, item) => acc + item.precio * item.cantidad,
          0
        )

        return (
          <Card key={pedido.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Receipt className="h-4 w-4 text-primary shrink-0" />
                Mesa {pedido.mesa}
                <span className="text-xs font-normal text-muted-foreground">
                  · Pedido #{pedido.id} · {pedido.hora}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {/* Tabla de ítems */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Cant.</TableHead>
                      <TableHead className="text-right">Precio</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pedido.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.nombre}</TableCell>
                        <TableCell className="text-center">{item.cantidad}</TableCell>
                        <TableCell className="text-right">${item.precio.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          ${(item.precio * item.cantidad).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant={variantPorEstado[item.estado]} className="text-xs">
                            {item.estado}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Total y botón de cobro */}
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                  Total: <span className="text-lg">${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => cerrarCuenta(pedido.id)}
                  variant="destructive"
                >
                  Cerrar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
