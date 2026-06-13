// Tipos de estado
export type EstadoMesa = "Disponible" | "Activa" | "Cerrada"
export type Categoria  = "Bebidas Calientes" | "Bebidas Frías" | "Comidas" | "Postres"
export type EstadoItem = "Pendiente" | "En Preparación" | "Entregado"

// Interfaces
export interface Mesa {
  id: number
  capacidad: number
  estado: EstadoMesa
}

export interface MenuItem {
  id: number
  nombre: string
  precio: number
  categoria: Categoria
}

export interface ItemPedido {
  nombre: string
  cantidad: number
  precio: number
  estado: EstadoItem
}

export interface Pedido {
  id: number
  mesa: number
  hora: string
  items: ItemPedido[]
}

// 14 mesas — negocio mediano
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

// 24 ítems en 4 categorías
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

// 4 ítems seleccionados para la vista del mesero (Mesa 6)
export const pedidoMesero: ItemPedido[] = [
  { nombre: "Café Americano",   cantidad: 2, precio: 4.00, estado: "Pendiente" },
  { nombre: "Limonada Natural", cantidad: 3, precio: 3.00, estado: "Pendiente" },
  { nombre: "Plato del Día",    cantidad: 2, precio: 9.00, estado: "Pendiente" },
  { nombre: "Flan Casero",      cantidad: 2, precio: 4.00, estado: "Pendiente" },
]

// 6 pedidos activos
export const pedidos: Pedido[] = [
  {
    id: 101, mesa: 2, hora: "09:15",
    items: [
      { nombre: "Café Espresso",      cantidad: 2, precio: 3.50, estado: "Entregado"      },
      { nombre: "Tostada Completa",   cantidad: 1, precio: 5.00, estado: "Entregado"      },
      { nombre: "Pastel de Queso",    cantidad: 2, precio: 4.50, estado: "En Preparación" },
    ],
  },
  {
    id: 102, mesa: 4, hora: "09:42",
    items: [
      { nombre: "Cappuccino",         cantidad: 1, precio: 4.50, estado: "Entregado"      },
      { nombre: "Arepa Rellena",      cantidad: 1, precio: 6.00, estado: "En Preparación" },
    ],
  },
  {
    id: 103, mesa: 5, hora: "10:05",
    items: [
      { nombre: "Café Latte",         cantidad: 3, precio: 5.00, estado: "En Preparación" },
      { nombre: "Sándwich Club",      cantidad: 2, precio: 7.50, estado: "Pendiente"      },
      { nombre: "Jugo de Naranja",    cantidad: 1, precio: 3.50, estado: "Entregado"      },
    ],
  },
  {
    id: 104, mesa: 7, hora: "10:18",
    items: [
      { nombre: "Agua Mineral",       cantidad: 4, precio: 2.00, estado: "Entregado"      },
      { nombre: "Pasta del Día",      cantidad: 2, precio: 8.00, estado: "En Preparación" },
      { nombre: "Ensalada César",     cantidad: 2, precio: 7.00, estado: "Pendiente"      },
      { nombre: "Helado (2 bolas)",   cantidad: 2, precio: 3.50, estado: "Pendiente"      },
    ],
  },
  {
    id: 105, mesa: 9, hora: "10:33",
    items: [
      { nombre: "Frappe de Café",     cantidad: 2, precio: 5.50, estado: "Entregado"      },
      { nombre: "Wrap de Pollo",      cantidad: 2, precio: 7.50, estado: "En Preparación" },
      { nombre: "Brownie con Helado", cantidad: 1, precio: 5.00, estado: "Pendiente"      },
    ],
  },
  {
    id: 106, mesa: 11, hora: "10:50",
    items: [
      { nombre: "Chocolate Caliente", cantidad: 5, precio: 4.00, estado: "En Preparación" },
      { nombre: "Plato del Día",      cantidad: 4, precio: 9.00, estado: "Pendiente"      },
      { nombre: "Torta de Chocolate", cantidad: 3, precio: 4.50, estado: "Pendiente"      },
      { nombre: "Jugo de Parchita",   cantidad: 2, precio: 3.50, estado: "Pendiente"      },
    ],
  },
]
