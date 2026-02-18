import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { agents, certificates, alerts, expiryTimelineData, agentStatusData } from "@/data/mockData";
import { Server, ShieldCheck, Bell, AlertTriangle, Clock, Key } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  const activeAlerts = alerts.filter(a => a.status !== "Resolved").length;
  const expiringCerts = certificates.filter(c => c.status === "Expiring").length;
  const pendingAgents = agents.filter(a => a.status === "Pending").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Certificate management overview</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 animate-stagger">
        <StatCard title="Total Agents" value={agents.length} subtitle="6 licensed" icon={Server} glowClass="glow-blue" iconColorClass="text-primary" />
        <StatCard title="Certificates" value={certificates.length} subtitle="Across all agents" icon={ShieldCheck} glowClass="glow-green" iconColorClass="text-success" />
        <StatCard title="Active Alerts" value={activeAlerts} subtitle={`${alerts.filter(a => a.severity === "Critical" && a.status !== "Resolved").length} critical`} icon={Bell} glowClass="glow-red" iconColorClass="text-destructive" />
        <StatCard title="Expiring Soon" value={expiringCerts} subtitle="Within 30 days" icon={AlertTriangle} glowClass="glow-orange" iconColorClass="text-warning" />
        <StatCard title="Pending Agents" value={pendingAgents} subtitle="Awaiting approval" icon={Clock} glowClass="glow-purple" iconColorClass="text-[hsl(270,70%,60%)]" />
        <StatCard title="License Usage" value="75%" subtitle="6 of 8 used" icon={Key} glowClass="glow-cyan" iconColorClass="text-[hsl(190,90%,50%)]" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass-card p-6 lg:col-span-3">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Certificate Expiry Timeline</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={expiryTimelineData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="hsl(215, 20%, 40%)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(215, 20%, 40%)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(220, 20%, 18%)", borderRadius: "8px", fontSize: "12px" }}
                labelStyle={{ color: "hsl(210, 40%, 92%)" }}
              />
              <Area type="monotone" dataKey="count" stroke="hsl(217, 91%, 60%)" fill="url(#colorCount)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Agent Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={agentStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                {agentStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(220, 20%, 18%)", borderRadius: "8px", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex justify-center gap-4">
            {agentStatusData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg bg-secondary/30 p-3">
                <StatusBadge status={alert.severity} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.agentHostname} • {alert.createdAt}</p>
                </div>
                <StatusBadge status={alert.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Certificates */}
        <div className="glass-card p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Recent Certificates</h3>
          <div className="space-y-3">
            {certificates.slice(0, 5).map(cert => (
              <div key={cert.id} className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{cert.subject}</p>
                  <p className="text-xs text-muted-foreground font-mono">{cert.thumbprint}</p>
                </div>
                <StatusBadge status={cert.status} />
                <p className="text-xs text-muted-foreground whitespace-nowrap">{cert.expiryDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
