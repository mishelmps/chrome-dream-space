import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  glowClass?: string;
  iconColorClass?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, glowClass = "glow-blue", iconColorClass = "text-primary" }: StatCardProps) {
  return (
    <div className={cn("glass-card-glow p-5", glowClass)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-2 stat-number text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50", iconColorClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
