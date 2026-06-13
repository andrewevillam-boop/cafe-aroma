// Componente de navegación principal.
// Desktop: sidebar fijo lateral.
// Mobile: botón hamburger que abre un Sheet/drawer de shadcn.
import { useState, useEffect } from "react"
import { Coffee, LayoutDashboard, ClipboardList, ChefHat, Receipt, Menu } from "lucide-react"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const links = [
  { href: "/",        label: "Dashboard", Icon: LayoutDashboard },
  { href: "/mesero",  label: "Mesero",    Icon: ClipboardList   },
  { href: "/cocina",  label: "Cocina",    Icon: ChefHat         },
  { href: "/admin",   label: "Admin",     Icon: Receipt         },
]

// NavContent es el contenido compartido entre desktop y mobile
function NavContent({ currentPath }: { currentPath: string }) {
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3 p-3">
          <Coffee className="h-6 w-6 text-primary shrink-0" />
          <div>
            <p className="font-bold text-sm leading-tight">Café Aroma</p>
            <p className="text-xs text-muted-foreground leading-tight">Sistema de Pedidos</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarMenu className="p-2">
          {links.map(({ href, label, Icon }) => (
            <SidebarMenuItem key={href}>
              <Button
                variant={currentPath === href ? "default" : "ghost"}
                asChild
                className="w-full justify-start gap-3 mb-1"
              >
                <a href={href}>
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="flex justify-center p-4 border-t">
        <AnimatedThemeToggler />
      </SidebarFooter>
    </>
  )
}

export function AppSidebar({ currentPath: initialPath }: { currentPath: string }) {
  // Con transition:persist el prop no se actualiza al navegar,
  // así que rastreamos la ruta activa con estado local.
  const [currentPath, setCurrentPath] = useState(initialPath)

  useEffect(() => {
    const handleNav = () => setCurrentPath(window.location.pathname)
    document.addEventListener("astro:page-load", handleNav)
    return () => document.removeEventListener("astro:page-load", handleNav)
  }, [])

  return (
    <>
      {/* Sidebar fijo en desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 flex-col border-r bg-background/90 backdrop-blur-sm z-20">
        <NavContent currentPath={currentPath} />
      </aside>

      {/* Hamburger + Sheet drawer en mobile */}
      <div className="md:hidden fixed top-3 left-3 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 flex flex-col">
            <NavContent currentPath={currentPath} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
