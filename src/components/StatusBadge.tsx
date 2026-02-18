import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Online: "bg-success/10 text-success border-success/20",
  Offline: "bg-destructive/10 text-destructive border-destructive/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Valid: "bg-success/10 text-success border-success/20",
  Expiring: "bg-warning/10 text-warning border-warning/20",
  Expired: "bg-destructive/10 text-destructive border-destructive/20",
  Active: "bg-success/10 text-success border-success/20",
  Revoked: "bg-destructive/10 text-destructive border-destructive/20",
  Deprecated: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20",
  New: "bg-primary/10 text-primary border-primary/20",
  Acknowledged: "bg-warning/10 text-warning border-warning/20",
  Resolved: "bg-success/10 text-success border-success/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  Warning: "bg-warning/10 text-warning border-warning/20",
  Info: "bg-info/10 text-info border-info/20",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
      statusStyles[status] || "bg-muted text-muted-foreground border-border",
      className
    )}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": ["Online", "Valid", "Active", "Resolved"].includes(status),
        "bg-destructive": ["Offline", "Expired", "Revoked", "Critical"].includes(status),
        "bg-warning": ["Pending", "Expiring", "Acknowledged", "Warning"].includes(status),
        "bg-primary": ["New"].includes(status),
        "bg-info": ["Info"].includes(status),
        "bg-muted-foreground": ["Deprecated"].includes(status),
      })} />
      {status}
    </span>
  );
}
