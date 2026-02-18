import { alertRules as rulesData } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const tabs = ["Alert Rules", "Notifications", "Internal CA", "General"] as const;

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>("Alert Rules");
  const [rules, setRules] = useState(rulesData);

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure alert rules and system preferences</p>
      </div>

      <div className="flex gap-1 border-b border-border/50">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Alert Rules" && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3">Rule</th>
                <th className="px-4 py-3 hidden md:table-cell">Description</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Enabled</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(rule => (
                <tr key={rule.id} className="border-b border-border/30">
                  <td className="px-4 py-3 font-medium">{rule.name}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{rule.description}</td>
                  <td className="px-4 py-3"><StatusBadge status={rule.severity} /></td>
                  <td className="px-4 py-3">
                    <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Notifications" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { title: "Email Notifications", desc: "Send alerts via email", config: "admin@example.com" },
            { title: "Webhook", desc: "POST alerts to external URL", config: "https://hooks.slack.com/..." },
          ].map(n => (
            <div key={n.title} className="glass-card p-5">
              <h4 className="text-sm font-semibold">{n.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{n.desc}</p>
              <p className="mt-3 rounded bg-secondary/30 px-3 py-1.5 font-mono text-xs text-muted-foreground truncate">{n.config}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Internal CA" && (
        <div className="glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Internal Certificate Authority</h4>
              <p className="text-xs text-muted-foreground mt-1">Status: <span className="text-success">Active</span></p>
            </div>
            <button className="rounded-lg border border-border bg-secondary/30 px-3 py-1.5 text-xs font-medium hover:bg-secondary/50 transition-colors">Manage CA</button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[["Root CA", "Corp Root CA"], ["Valid Until", "2035-01-01"], ["Issued Certs", "24"]].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">{l}</p>
                <p className="mt-1 text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "General" && (
        <div className="glass-card p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Application Name", "MD CertManager"],
              ["Version", "3.2.1"],
              ["Default Scan Interval", "60 minutes"],
              ["Auto-approve Agents", "Disabled"],
              ["Data Retention", "90 days"],
              ["Time Zone", "UTC"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-lg bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">{l}</p>
                <p className="mt-1 text-sm font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
