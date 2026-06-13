/**
 * MenuPaginado.tsx — Tabla del menú con filtro y paginación
 *
 * Muestra los 24 productos del menú en una tabla interactiva.
 * El mesero puede filtrar por categoría y agregar productos al pedido.
 *
 * Props:
 *   menu      — lista completa de productos (viene del mock)
 *   onAgregar — función que se llama cuando el mesero presiona "+ Agregar"
 *               (opcional: si no se pasa, el botón solo muestra el producto)
 */

import { useState } from "react"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MenuItem, Categoria } from "@/data/mock"

// Cuántos productos mostramos por página
const ITEMS_POR_PAGINA = 7

// Opciones del filtro de categoría ("Todas" muestra el menú completo)
const CATEGORIAS: Array<"Todas" | Categoria> = [
  "Todas",
  "Bebidas Calientes",
  "Bebidas Frías",
  "Comidas",
  "Postres",
]

interface Props {
  menu: MenuItem[]
  /** Si se proporciona, el botón "+ Agregar" llama esta función con el producto */
  onAgregar?: (item: MenuItem) => void
}

export function MenuPaginado({ menu, onAgregar }: Props) {
  // Estado local: qué categoría está activa y en qué página estamos
  const [pagina, setPagina] = useState(1)
  const [categoriaActiva, setCategoriaActiva] = useState<"Todas" | Categoria>("Todas")

  // Filtrar productos según la categoría seleccionada
  const itemsFiltrados =
    categoriaActiva === "Todas"
      ? menu
      : menu.filter(item => item.categoria === categoriaActiva)

  // Calcular qué productos van en la página actual
  const totalPaginas  = Math.ceil(itemsFiltrados.length / ITEMS_POR_PAGINA)
  const inicio        = (pagina - 1) * ITEMS_POR_PAGINA
  const itemsPagina   = itemsFiltrados.slice(inicio, inicio + ITEMS_POR_PAGINA)

  function cambiarCategoria(cat: "Todas" | Categoria) {
    setCategoriaActiva(cat)
    setPagina(1) // al cambiar categoría, volver a la primera página
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Filtro de categorías */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map(cat => (
          <Button
            key={cat}
            size="sm"
            variant={categoriaActiva === cat ? "default" : "outline"}
            onClick={() => cambiarCategoria(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Tabla de productos */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="hidden sm:table-cell">Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemsPagina.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nombre}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="text-xs">{item.categoria}</Badge>
                </TableCell>
                <TableCell className="text-right">${item.precio.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs px-3"
                    onClick={() => onAgregar?.(item)}
                  >
                    + Agregar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {itemsFiltrados.length} productos · Pág. {pagina} de {totalPaginas}
        </span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={pagina === 1}
            onClick={() => setPagina(p => p - 1)}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(p => p + 1)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}
