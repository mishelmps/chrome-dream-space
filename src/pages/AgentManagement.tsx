import { agents } from "@/data/mockData";
import { StatCard } from "@/components/StatCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Users, CheckCircle, XCircle, BarChart3, Trash2 } from "lucide-react";
import { useState } from "react";

const tabs = ["Pending Approval", "Active Agents", "Revoked"] as const;

const AgentManagement = () => {
  const [activeTab, setActiveTab] = useState<string>("Pending Approval");
  const pending = agents.filter(a => a.status === "Pending");
  const active = agents.filter(a => a.status !== "Pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agent Management</h1>
        <p className="text-sm text-muted-foreground">License utilization and agent approval</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-stagger">
        <StatCard title="Licensed" value={6} subtitle="Active agents" icon={Users} glowClass="glow-blue" iconColorClass="text-primary" />
        <StatCard title="Pending" value={pending.length} subtitle="Awaiting approval" icon={CheckCircle} glowClass="glow-orange" iconColorClass="text-warning" />
        <StatCard title="Revoked" value={0} icon={XCircle} glowClass="glow-red" iconColorClass="text-destructive" />
        <StatCard title="Utilization" value="75%" subtitle="6 of 8 licensed" icon={BarChart3} glowClass="glow-green" iconColorClass="text-success" />
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-medium text-muted-foreground">License Capacity</p>
          <p className="text-xs text-muted-foreground stat-number">6 / 8</p>
        </div>
        <Progress value={75} className="h-2" />
      </div>

      <div className="flex gap-1 border-b border-border/50">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Pending Approval" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Hostname</th>
                <th className="px-4 py-3">OS</th>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map(agent => (
                <tr key={agent.id} className="border-b border-border/30">
                  <td className="px-4 py-3 font-medium">{agent.hostname}</td>
                  <td className="px-4 py-3 text-muted-foreground">{agent.os}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{agent.ipAddress}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-md bg-success/10 px-2.5 py-1 text-xs font-medium text-success hover:bg-success/20 transition-colors">Approve</button>
                      <button className="rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
              {pending.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No pending agents</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Active Agents" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Hostname</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 hidden md:table-cell">Version</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {active.map(agent => (
                <tr key={agent.id} className="border-b border-border/30">
                  <td className="px-4 py-3 font-medium">{agent.hostname}</td>
                  <td className="px-4 py-3"><StatusBadge status={agent.status} /></td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{agent.version}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-md bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">Revoke</button>
                      <button className="rounded-md p-1 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Revoked" && (
        <div className="glass-card p-8 text-center text-muted-foreground">No revoked agents</div>
      )}
    </div>
  );
};

export default AgentManagement;
