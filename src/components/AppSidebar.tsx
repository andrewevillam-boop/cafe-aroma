// Componente de navegación principal.
// Usa el Sidebar de shadcn con SidebarProvider para manejar
// el estado de apertura/cierre en desktop y mobile (Sheet/drawer).
import { Coffee, LayoutDashboard, ClipboardList, ChefHat, Receipt } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Links de navegación con su ícono de Lucide
const links = [
  { href: "/",        label: "Dashboard", Icon: LayoutDashboard },
  { href: "/mesero",  label: "Mesero",    Icon: ClipboardList   },
  { href: "/cocina",  label: "Cocina",    Icon: ChefHat         },
  { href: "/admin",   label: "Admin",     Icon: Receipt         },
]

// currentPath viene del servidor (Astro.url.pathname) para marcar el link activo
export function AppSidebar({ currentPath }: { currentPath: string }) {
  return (
    <SidebarProvider>
      {/* Botón hamburger: solo visible en mobile, abre el sidebar como drawer */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <SidebarTrigger />
      </div>

      <Sidebar>
        {/* Logo y nombre del sistema */}
        <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
            <Coffee className="h-6 w-6 text-primary shrink-0" />
            <div>
              <p className="font-bold text-sm leading-tight">Café Aroma</p>
              <p className="text-xs text-muted-foreground leading-tight">Sistema de Pedidos</p>
            </div>
          </div>
        </SidebarHeader>

        {/* Links de navegación */}
        <SidebarContent>
          <SidebarMenu>
            {links.map(({ href, label, Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild isActive={currentPath === href}>
                  <a href={href}>
                    <Icon />
                    <span>{label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Toggle dark/light al fondo del sidebar */}
        <SidebarFooter>
          <div className="flex justify-center py-2">
            <AnimatedThemeToggler />
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
