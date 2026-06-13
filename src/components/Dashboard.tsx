/**
 * Dashboard.tsx — Vista general del salón
 *
 * Delega la visualización de mesas a MesaGrid, que es el componente
 * compartido entre Dashboard y MeseroView.
 */

import { MesaGrid } from "@/components/MesaGrid"

export function Dashboard() {
  return <MesaGrid />
}
