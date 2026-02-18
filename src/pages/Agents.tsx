import { agents } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const statusFilters = ["All", "Online", "Offline", "Pending"] as const;

const Agents = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = agents.filter(a => {
    if (filter !== "All" && a.status !== filter) return false;
    if (search && !a.hostname.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    All: agents.length,
    Online: agents.filter(a => a.status === "Online").length,
    Offline: agents.filter(a => a.status === "Offline").length,
    Pending: agents.filter(a => a.status === "Pending").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agents</h1>
        <p className="text-sm text-muted-foreground">Manage and monitor certificate scanning agents</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {statusFilters.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${filter === s ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"}`}>
            {s} ({counts[s]})
          </button>
        ))}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agents..." className="h-8 rounded-lg border border-border bg-secondary/30 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Hostname</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 hidden md:table-cell">OS</th>
              <th className="px-4 py-3">Certs</th>
              <th className="px-4 py-3 hidden lg:table-cell">Last Heartbeat</th>
              <th className="px-4 py-3 hidden lg:table-cell">Last Scan</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(agent => (
              <tr key={agent.id} onClick={() => navigate(`/agents/${agent.id}`)} className="cursor-pointer border-b border-border/30 transition-colors hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium text-foreground">{agent.hostname}</td>
                <td className="px-4 py-3"><StatusBadge status={agent.status} /></td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{agent.os}</td>
                <td className="px-4 py-3 stat-number">{agent.certificateCount}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{agent.lastHeartbeat}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{agent.lastScan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;
