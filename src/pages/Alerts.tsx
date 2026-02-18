import { alerts as alertsData } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";
import { AlertTriangle, AlertCircle, Info, Check, Eye } from "lucide-react";

const severityFilters = ["All", "Critical", "Warning", "Info"] as const;

const severityIcon = {
  Critical: AlertTriangle,
  Warning: AlertCircle,
  Info: Info,
};

const Alerts = () => {
  const [filter, setFilter] = useState<string>("All");
  const [localAlerts, setLocalAlerts] = useState(alertsData);

  const filtered = localAlerts.filter(a => filter === "All" || a.severity === filter);

  const handleAcknowledge = (id: string) => {
    setLocalAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Acknowledged" as const } : a));
  };

  const handleResolve = (id: string) => {
    setLocalAlerts(prev => prev.map(a => a.id === id ? { ...a, status: "Resolved" as const } : a));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
        <p className="text-sm text-muted-foreground">Monitor and manage system alerts</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {severityFilters.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${filter === s ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"}`}>
            {s} ({s === "All" ? localAlerts.length : localAlerts.filter(a => a.severity === s).length})
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(alert => {
          const Icon = severityIcon[alert.severity];
          const borderColor = alert.severity === "Critical" ? "border-l-destructive" : alert.severity === "Warning" ? "border-l-warning" : "border-l-info";
          return (
            <div key={alert.id} className={`glass-card flex items-center gap-4 border-l-4 ${borderColor} p-4`}>
              <Icon className={`h-5 w-5 shrink-0 ${alert.severity === "Critical" ? "text-destructive" : alert.severity === "Warning" ? "text-warning" : "text-info"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.agentHostname} • {alert.createdAt}</p>
              </div>
              <StatusBadge status={alert.status} />
              {alert.status === "New" && (
                <div className="flex gap-1">
                  <button onClick={() => handleAcknowledge(alert.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors" title="Acknowledge">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleResolve(alert.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-success/10 hover:text-success transition-colors" title="Resolve">
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              )}
              {alert.status === "Acknowledged" && (
                <button onClick={() => handleResolve(alert.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-success/10 hover:text-success transition-colors" title="Resolve">
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
