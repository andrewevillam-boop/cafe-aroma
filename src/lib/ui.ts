// Constantes de UI — importar en componentes React (.tsx)
// En archivos .astro usar los mismos valores directamente como strings

export const UI = {
  // Título de sección dentro de CardHeader
  sectionTitle: "flex items-center gap-2 text-base",
  // Ícono en título de sección
  sectionIcon:  "h-4 w-4 text-primary shrink-0",
  // Contenedor de botones de acción (alineados a la derecha)
  actionsRow:   "flex justify-end mt-4",
  // Grids auto-ajustables — definidos como clases CSS en app.css
  gridMesas:   "grid-mesas",   // tarjetas de mesa,   mín 8rem × 5rem por celda
  gridPedidos: "grid-pedidos", // tarjetas de pedido, mín 14rem × 8rem por celda
} as const
