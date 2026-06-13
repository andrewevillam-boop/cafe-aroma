export type EstadoMesa = "Disponible" | "Activa" | "Cerrada"
export type Categoria = "Bebidas" | "Comidas"
export type EstadoItem = "Pendiente" | "En Preparación" | "Entregado"

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

export const mesas: Mesa[] = [
  { id: 1, capacidad: 4, estado: "Disponible" },
  { id: 2, capacidad: 2, estado: "Activa" },
  { id: 3, capacidad: 6, estado: "Activa" },
  { id: 4, capacidad: 4, estado: "Cerrada" },
  { id: 5, capacidad: 2, estado: "Disponible" },
  { id: 6, capacidad: 8, estado: "Disponible" },
]

export const menu: MenuItem[] = [
  { id: 1, nombre: "Café Espresso",           precio: 3.50, categoria: "Bebidas" },
  { id: 2, nombre: "Cappuccino",              precio: 4.00, categoria: "Bebidas" },
  { id: 3, nombre: "Jugo de Naranja",         precio: 3.00, categoria: "Bebidas" },
  { id: 4, nombre: "Tostada con Mantequilla", precio: 2.50, categoria: "Comidas" },
  { id: 5, nombre: "Arepa Rellena",           precio: 5.00, categoria: "Comidas" },
  { id: 6, nombre: "Pastel de Queso",         precio: 4.50, categoria: "Comidas" },
]

export const pedidoMesero: ItemPedido[] = [
  { nombre: "Café Espresso", cantidad: 2, precio: 3.50, estado: "Pendiente" },
  { nombre: "Arepa Rellena", cantidad: 1, precio: 5.00, estado: "Pendiente" },
]

export const pedidos: Pedido[] = [
  {
    id: 101,
    mesa: 2,
    hora: "10:30",
    items: [
      { nombre: "Cappuccino",              cantidad: 1, precio: 4.00, estado: "En Preparación" },
      { nombre: "Tostada con Mantequilla", cantidad: 2, precio: 2.50, estado: "Pendiente" },
    ],
  },
  {
    id: 102,
    mesa: 3,
    hora: "10:45",
    items: [
      { nombre: "Jugo de Naranja", cantidad: 2, precio: 3.00, estado: "Entregado" },
      { nombre: "Pastel de Queso", cantidad: 1, precio: 4.50, estado: "En Preparación" },
    ],
  },
]
