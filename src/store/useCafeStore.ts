/**
 * useCafeStore.ts — Estado global de Café Aroma
 *
 * Aquí vive TODO el estado de la aplicación: mesas, pedidos y el carrito.
 *
 * ¿Qué es Zustand?
 * Es una librería para manejar estado compartido entre componentes React.
 * La diferencia con useState (que solo funciona dentro de un componente)
 * es que Zustand vive FUERA de los componentes, en memoria, así que los
 * datos persisten al navegar entre páginas.
 *
 * Patrón: create() recibe una función que devuelve { estado + acciones }.
 * Para leer el estado: const mesas = useCafeStore(s => s.mesas)
 * Para ejecutar acciones: const agregar = useCafeStore(s => s.agregarAlCarrito)
 */

import { create } from "zustand"
import { mesas as mesasIniciales, pedidos as pedidosIniciales } from "@/data/mock"
import type { Mesa, MenuItem, ItemPedido, Pedido } from "@/data/mock"

// ─── Forma del store ──────────────────────────────────────────────────────────

interface CafeStore {
  // ── Estado ──────────────────────────────────────────────────────────────────

  /** Lista de mesas con su estado actual */
  mesas: Mesa[]

  /** Pedidos activos (enviados a cocina, aún no cobrados) */
  pedidos: Pedido[]

  /** Ítems que el mesero está seleccionando antes de confirmar el pedido */
  carrito: ItemPedido[]

  /** Id de la mesa que el mesero está atendiendo actualmente (null = ninguna) */
  mesaActivaId: number | null

  // ── Acciones del Mesero ──────────────────────────────────────────────────────

  /** Selecciona una mesa para tomar pedido y limpia el carrito anterior */
  seleccionarMesa: (mesaId: number) => void

  /** Agrega un producto al carrito. Si ya existe, incrementa la cantidad */
  agregarAlCarrito: (item: MenuItem) => void

  /** Quita una unidad del carrito. Si queda en 0, elimina el ítem */
  quitarDelCarrito: (itemId: number) => void

  /** Envía el carrito como pedido a cocina y marca la mesa como Activa */
  confirmarPedido: () => void

  // ── Acciones de Cocina ───────────────────────────────────────────────────────

  /**
   * Avanza el estado de un ítem:
   * Pendiente → En Preparación → Entregado
   */
  avanzarEstadoItem: (pedidoId: number, itemIdx: number) => void

  // ── Acciones de Admin ────────────────────────────────────────────────────────

  /** Cobra la cuenta: elimina el pedido y libera la mesa (→ Disponible) */
  cerrarCuenta: (pedidoId: number) => void
}

// ─── Contador de IDs ─────────────────────────────────────────────────────────

// El mock inicia con pedidos hasta id 106, entonces seguimos desde 107
let siguienteIdPedido = 107

// ─── Store ────────────────────────────────────────────────────────────────────

export const useCafeStore = create<CafeStore>((set, get) => ({

  // Estado inicial: cargamos los datos del mock como punto de partida
  mesas:        [...mesasIniciales],
  pedidos:      [...pedidosIniciales],
  carrito:      [],
  mesaActivaId: null,

  // ─── Mesero ───────────────────────────────────────────────────────────────

  seleccionarMesa: (mesaId) => {
    // Al seleccionar una mesa nueva, limpiamos cualquier carrito anterior
    set({ mesaActivaId: mesaId, carrito: [] })
  },

  agregarAlCarrito: (item) => {
    const { carrito } = get()
    const existente = carrito.find(i => i.id === item.id)

    if (existente) {
      // El producto ya está en el carrito: solo subimos la cantidad
      set({
        carrito: carrito.map(i =>
          i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i
        ),
      })
    } else {
      // Producto nuevo: lo agregamos con cantidad 1 y estado Pendiente
      set({
        carrito: [
          ...carrito,
          { id: item.id, nombre: item.nombre, precio: item.precio, cantidad: 1, estado: "Pendiente" },
        ],
      })
    }
  },

  quitarDelCarrito: (itemId) => {
    const { carrito } = get()
    const existente = carrito.find(i => i.id === itemId)
    if (!existente) return

    if (existente.cantidad > 1) {
      // Aún quedan unidades: solo bajamos la cantidad
      set({
        carrito: carrito.map(i =>
          i.id === itemId ? { ...i, cantidad: i.cantidad - 1 } : i
        ),
      })
    } else {
      // Era la última unidad: eliminamos el ítem del carrito
      set({ carrito: carrito.filter(i => i.id !== itemId) })
    }
  },

  confirmarPedido: () => {
    const { carrito, mesaActivaId, mesas, pedidos } = get()
    if (!mesaActivaId || carrito.length === 0) return

    const nuevoPedido: Pedido = {
      id:    siguienteIdPedido++,
      mesa:  mesaActivaId,
      hora:  new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      items: carrito,
    }

    set({
      pedidos: [...pedidos, nuevoPedido],
      // Marcar la mesa como Activa (hay un pedido en curso)
      mesas: mesas.map(m =>
        m.id === mesaActivaId ? { ...m, estado: "Activa" } : m
      ),
      carrito:      [],
      mesaActivaId: null,
    })
  },

  // ─── Cocina ───────────────────────────────────────────────────────────────

  avanzarEstadoItem: (pedidoId, itemIdx) => {
    // Mapa de transiciones: cada estado sabe a cuál sigue
    const siguiente: Record<string, string> = {
      "Pendiente":      "En Preparación",
      "En Preparación": "Entregado",
      "Entregado":      "Entregado", // ya está completo, no avanza más
    }

    set({
      pedidos: get().pedidos.map(pedido => {
        if (pedido.id !== pedidoId) return pedido
        return {
          ...pedido,
          items: pedido.items.map((item, idx) =>
            idx === itemIdx
              ? { ...item, estado: siguiente[item.estado] as typeof item.estado }
              : item
          ),
        }
      }),
    })
  },

  // ─── Admin ────────────────────────────────────────────────────────────────

  cerrarCuenta: (pedidoId) => {
    const { pedidos, mesas } = get()
    const pedido = pedidos.find(p => p.id === pedidoId)
    if (!pedido) return

    set({
      // Eliminar el pedido de la lista
      pedidos: pedidos.filter(p => p.id !== pedidoId),
      // Liberar la mesa (vuelve a estar Disponible)
      mesas: mesas.map(m =>
        m.id === pedido.mesa ? { ...m, estado: "Disponible" } : m
      ),
    })
  },
}))
