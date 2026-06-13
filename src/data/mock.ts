/**
 * mock.ts — Datos de ejemplo para Café Aroma
 *
 * Este archivo define los TIPOS (las "formas" de los datos) y los DATOS INICIALES
 * del sistema. En una app real, estos datos vendrían de una base de datos.
 *
 * Para el demo, usamos datos fijos que el store carga al iniciar la app.
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Estado actual de una mesa en el salón */
export type EstadoMesa = "Disponible" | "Activa" | "Cerrada"

/** Categoría de un producto en el menú */
export type Categoria  = "Bebidas Calientes" | "Bebidas Frías" | "Comidas" | "Postres"

/** Estado de un ítem dentro de un pedido en cocina */
export type EstadoItem = "Pendiente" | "En Preparación" | "Entregado"

/** Una mesa del salón */
export interface Mesa {
  id: number
  capacidad: number   // cantidad de personas que puede sentar
  estado: EstadoMesa
}

/** Un producto del menú */
export interface MenuItem {
  id: number
  nombre: string
  precio: number
  categoria: Categoria
}

/**
 * Un ítem dentro de un pedido.
 * Incluye el id del MenuItem para poder referenciarlo en el carrito.
 */
export interface ItemPedido {
  id: number          // id del MenuItem correspondiente
  nombre: string
  cantidad: number
  precio: number
  estado: EstadoItem
}

/** Un pedido completo asociado a una mesa */
export interface Pedido {
  id: number
  mesa: number        // id de la Mesa
  hora: string
  items: ItemPedido[]
}

// ─── Datos iniciales ──────────────────────────────────────────────────────────

/**
 * 14 mesas del salón.
 * El estado inicial simula un turno ya empezado:
 * 5 disponibles, 6 activas con pedidos, 3 cerradas (pendientes de cobro).
 */
export const mesas: Mesa[] = [
  { id: 1,  capacidad: 2, estado: "Disponible" },
  { id: 2,  capacidad: 2, estado: "Activa"     },
  { id: 3,  capacidad: 2, estado: "Disponible" },
  { id: 4,  capacidad: 2, estado: "Activa"     },
  { id: 5,  capacidad: 4, estado: "Activa"     },
  { id: 6,  capacidad: 4, estado: "Disponible" },
  { id: 7,  capacidad: 4, estado: "Activa"     },
  { id: 8,  capacidad: 4, estado: "Cerrada"    },
  { id: 9,  capacidad: 4, estado: "Activa"     },
  { id: 10, capacidad: 4, estado: "Cerrada"    },
  { id: 11, capacidad: 6, estado: "Activa"     },
  { id: 12, capacidad: 6, estado: "Disponible" },
  { id: 13, capacidad: 6, estado: "Cerrada"    },
  { id: 14, capacidad: 8, estado: "Disponible" },
]

/**
 * Menú completo: 24 productos en 4 categorías.
 * El id de cada producto se usa en el carrito para identificarlo.
 */
export const menu: MenuItem[] = [
  // Bebidas Calientes
  { id: 1,  nombre: "Café Espresso",        precio: 3.50, categoria: "Bebidas Calientes" },
  { id: 2,  nombre: "Café Americano",       precio: 4.00, categoria: "Bebidas Calientes" },
  { id: 3,  nombre: "Cappuccino",           precio: 4.50, categoria: "Bebidas Calientes" },
  { id: 4,  nombre: "Café Latte",           precio: 5.00, categoria: "Bebidas Calientes" },
  { id: 5,  nombre: "Macchiato",            precio: 4.50, categoria: "Bebidas Calientes" },
  { id: 6,  nombre: "Chocolate Caliente",   precio: 4.00, categoria: "Bebidas Calientes" },
  // Bebidas Frías
  { id: 7,  nombre: "Jugo de Naranja",      precio: 3.50, categoria: "Bebidas Frías"     },
  { id: 8,  nombre: "Jugo de Parchita",     precio: 3.50, categoria: "Bebidas Frías"     },
  { id: 9,  nombre: "Limonada Natural",     precio: 3.00, categoria: "Bebidas Frías"     },
  { id: 10, nombre: "Té Frío",              precio: 3.00, categoria: "Bebidas Frías"     },
  { id: 11, nombre: "Frappe de Café",       precio: 5.50, categoria: "Bebidas Frías"     },
  { id: 12, nombre: "Agua Mineral",         precio: 2.00, categoria: "Bebidas Frías"     },
  // Comidas
  { id: 13, nombre: "Arepa Rellena",        precio: 6.00, categoria: "Comidas"           },
  { id: 14, nombre: "Tostada Completa",     precio: 5.00, categoria: "Comidas"           },
  { id: 15, nombre: "Sándwich Club",        precio: 7.50, categoria: "Comidas"           },
  { id: 16, nombre: "Pasta del Día",        precio: 8.00, categoria: "Comidas"           },
  { id: 17, nombre: "Ensalada César",       precio: 7.00, categoria: "Comidas"           },
  { id: 18, nombre: "Wrap de Pollo",        precio: 7.50, categoria: "Comidas"           },
  { id: 19, nombre: "Plato del Día",        precio: 9.00, categoria: "Comidas"           },
  // Postres
  { id: 20, nombre: "Pastel de Queso",      precio: 4.50, categoria: "Postres"           },
  { id: 21, nombre: "Brownie con Helado",   precio: 5.00, categoria: "Postres"           },
  { id: 22, nombre: "Flan Casero",          precio: 4.00, categoria: "Postres"           },
  { id: 23, nombre: "Torta de Chocolate",   precio: 4.50, categoria: "Postres"           },
  { id: 24, nombre: "Helado (2 bolas)",     precio: 3.50, categoria: "Postres"           },
]

/**
 * Pedidos activos al inicio de la sesión.
 * Corresponden a las 6 mesas con estado "Activa".
 * El store los carga y a partir de ahí el usuario puede modificarlos.
 */
export const pedidos: Pedido[] = [
  {
    id: 101, mesa: 2, hora: "09:15",
    items: [
      { id: 1,  nombre: "Café Espresso",      cantidad: 2, precio: 3.50, estado: "Entregado"      },
      { id: 14, nombre: "Tostada Completa",   cantidad: 1, precio: 5.00, estado: "Entregado"      },
      { id: 20, nombre: "Pastel de Queso",    cantidad: 2, precio: 4.50, estado: "En Preparación" },
    ],
  },
  {
    id: 102, mesa: 4, hora: "09:42",
    items: [
      { id: 3,  nombre: "Cappuccino",         cantidad: 1, precio: 4.50, estado: "Entregado"      },
      { id: 13, nombre: "Arepa Rellena",      cantidad: 1, precio: 6.00, estado: "En Preparación" },
    ],
  },
  {
    id: 103, mesa: 5, hora: "10:05",
    items: [
      { id: 4,  nombre: "Café Latte",         cantidad: 3, precio: 5.00, estado: "En Preparación" },
      { id: 15, nombre: "Sándwich Club",      cantidad: 2, precio: 7.50, estado: "Pendiente"      },
      { id: 7,  nombre: "Jugo de Naranja",    cantidad: 1, precio: 3.50, estado: "Entregado"      },
    ],
  },
  {
    id: 104, mesa: 7, hora: "10:18",
    items: [
      { id: 12, nombre: "Agua Mineral",       cantidad: 4, precio: 2.00, estado: "Entregado"      },
      { id: 16, nombre: "Pasta del Día",      cantidad: 2, precio: 8.00, estado: "En Preparación" },
      { id: 17, nombre: "Ensalada César",     cantidad: 2, precio: 7.00, estado: "Pendiente"      },
      { id: 24, nombre: "Helado (2 bolas)",   cantidad: 2, precio: 3.50, estado: "Pendiente"      },
    ],
  },
  {
    id: 105, mesa: 9, hora: "10:33",
    items: [
      { id: 11, nombre: "Frappe de Café",     cantidad: 2, precio: 5.50, estado: "Entregado"      },
      { id: 18, nombre: "Wrap de Pollo",      cantidad: 2, precio: 7.50, estado: "En Preparación" },
      { id: 21, nombre: "Brownie con Helado", cantidad: 1, precio: 5.00, estado: "Pendiente"      },
    ],
  },
  {
    id: 106, mesa: 11, hora: "10:50",
    items: [
      { id: 6,  nombre: "Chocolate Caliente", cantidad: 5, precio: 4.00, estado: "En Preparación" },
      { id: 19, nombre: "Plato del Día",      cantidad: 4, precio: 9.00, estado: "Pendiente"      },
      { id: 23, nombre: "Torta de Chocolate", cantidad: 3, precio: 4.50, estado: "Pendiente"      },
      { id: 8,  nombre: "Jugo de Parchita",   cantidad: 2, precio: 3.50, estado: "Pendiente"      },
    ],
  },
]
