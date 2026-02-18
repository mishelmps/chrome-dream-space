import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Server,
  ShieldCheck,
  Bell,
  Settings,
  Users,
  KeyRound,
  Package,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";

const mainNav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Agents", url: "/agents", icon: Server },
  { title: "Certificates", url: "/certificates", icon: ShieldCheck },
  { title: "Alerts", url: "/alerts", icon: Bell },
];

const settingsNav = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Agent Management", url: "/settings/agents", icon: Users },
  { title: "Enrollment Keys", url: "/settings/enrollment-keys", icon: KeyRound },
  { title: "Packages", url: "/settings/msi", icon: Package },
];

export function AppSidebar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const navItem = (item: (typeof mainNav)[0]) => (
    <NavLink
      key={item.url}
      to={item.url}
      end={item.url === "/"}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        isActive(item.url)
          ? "bg-primary/10 text-primary shadow-[inset_0_0_20px_-10px_hsl(217_91%_60%_/_0.2)]"
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      }`}
      activeClassName=""
      onClick={() => setMobileOpen(false)}
    >
      <item.icon className="h-4 w-4 shrink-0" />
      <span>{item.title}</span>
      {isActive(item.url) && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
      )}
    </NavLink>
  );

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 glow-blue">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-foreground">MD CertManager</h1>
          <p className="text-[10px] text-muted-foreground">Certificate Management</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1 px-3">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Main
        </p>
        {mainNav.map(navItem)}

        <div className="my-4 border-t border-border/50" />

        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Administration
        </p>
        {settingsNav.map(navItem)}
      </nav>

      {/* Footer */}
      <div className="border-t border-border/50 px-4 py-4">
        <p className="text-[10px] text-muted-foreground/50">v3.2.1 • 6 agents licensed</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg glass-card lg:hidden"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 glass-sidebar transition-transform duration-300 lg:relative lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
