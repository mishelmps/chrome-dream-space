import { certificates } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";
import { Search } from "lucide-react";

const statusFilters = ["All", "Valid", "Expiring", "Expired"] as const;

const Certificates = () => {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = certificates.filter(c => {
    if (filter !== "All" && c.status !== filter) return false;
    if (search && !c.subject.toLowerCase().includes(search.toLowerCase()) && !c.thumbprint.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-sm text-muted-foreground">View and manage certificates across all agents</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {statusFilters.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${filter === s ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"}`}>
            {s} ({s === "All" ? certificates.length : certificates.filter(c => c.status === s).length})
          </button>
        ))}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search subject or thumbprint..." className="h-8 w-64 rounded-lg border border-border bg-secondary/30 pl-9 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3 hidden md:table-cell">Thumbprint</th>
              <th className="px-4 py-3 hidden lg:table-cell">Issuer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3 hidden md:table-cell">Agent</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(cert => (
              <tr key={cert.id} className="border-b border-border/30 transition-colors hover:bg-secondary/30">
                <td className="px-4 py-3 font-medium">{cert.subject}</td>
                <td className="px-4 py-3 hidden md:table-cell font-mono text-xs text-muted-foreground">{cert.thumbprint}</td>
                <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{cert.issuer}</td>
                <td className="px-4 py-3"><StatusBadge status={cert.status} /></td>
                <td className="px-4 py-3 text-muted-foreground">{cert.expiryDate}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{cert.agentHostname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificates;
