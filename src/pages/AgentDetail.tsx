import { useParams, useNavigate } from "react-router-dom";
import { agents, certificates } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, RefreshCw, Power, Server } from "lucide-react";
import { useState } from "react";

const tabs = ["Certificates", "Stores", "Events", "Configuration"] as const;

const AgentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("Certificates");
  const agent = agents.find(a => a.id === id);
  const agentCerts = certificates.filter(c => c.agentId === id);

  if (!agent) return <div className="text-center text-muted-foreground py-20">Agent not found</div>;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("/agents")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Agents
      </button>

      {/* Header */}
      <div className="glass-card-glow glow-blue p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <Server className="h-7 w-7 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold">{agent.hostname}</h2>
              <StatusBadge status={agent.status} />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span>{agent.os}</span>
              <span>IP: {agent.ipAddress}</span>
              <span>Version: {agent.version}</span>
              <span>Heartbeat: {agent.lastHeartbeat}</span>
              <span>Last Scan: {agent.lastScan}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary/30 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/50 transition-colors">
              <RefreshCw className="h-3.5 w-3.5" /> Rescan
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">
              <Power className="h-3.5 w-3.5" /> Disable
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border/50">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Certificates" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Thumbprint</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3">Store</th>
              </tr>
            </thead>
            <tbody>
              {agentCerts.map(cert => (
                <tr key={cert.id} className="border-b border-border/30">
                  <td className="px-4 py-3 font-medium">{cert.subject}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{cert.thumbprint}</td>
                  <td className="px-4 py-3"><StatusBadge status={cert.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{cert.expiryDate}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cert.store}</td>
                </tr>
              ))}
              {agentCerts.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No certificates found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Stores" && (
        <div className="glass-card p-6">
          <div className="space-y-3">
            {["My", "Root", "CA", "Trust"].map(store => (
              <div key={store} className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                <span className="text-sm font-medium">{store}</span>
                <span className="stat-number text-xs text-muted-foreground">{agentCerts.filter(c => c.store === store).length} certs</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Events" && (
        <div className="glass-card p-6 space-y-3">
          {[
            { time: "2 min ago", event: "Heartbeat received" },
            { time: "15 min ago", event: "Certificate scan completed" },
            { time: "1 hour ago", event: "Agent configuration updated" },
            { time: "3 hours ago", event: "Heartbeat received" },
          ].map((ev, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-secondary/30 p-3">
              <span className="text-xs text-muted-foreground w-24 shrink-0">{ev.time}</span>
              <span className="text-sm">{ev.event}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Configuration" && (
        <div className="glass-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Scan Interval", `${agent.scanInterval} min`],
              ["Agent Version", agent.version],
              ["IP Address", agent.ipAddress],
              ["Operating System", agent.os],
              ["Auto Update", "Enabled"],
              ["Certificate Stores", "My, Root, CA, Trust"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentDetail;
