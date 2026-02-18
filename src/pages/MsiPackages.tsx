import { msiPackages } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Download, Trash2, Info } from "lucide-react";

const MsiPackages = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deployment Packages</h1>
          <p className="text-sm text-muted-foreground">Manage MSI deployment packages for agents</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Generate Package
        </button>
      </div>

      <div className="glass-card flex items-start gap-3 p-4 border-l-4 border-l-info">
        <Info className="h-5 w-5 shrink-0 text-info mt-0.5" />
        <div>
          <p className="text-sm font-medium">About Deployment Packages</p>
          <p className="text-xs text-muted-foreground mt-1">MSI packages contain the CertManager agent installer with pre-configured enrollment settings. Generate a package for each environment or deployment group.</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Agents</th>
              <th className="px-4 py-3 hidden md:table-cell">Created</th>
              <th className="px-4 py-3 hidden md:table-cell">Size</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {msiPackages.map(pkg => (
              <tr key={pkg.id} className="border-b border-border/30">
                <td className="px-4 py-3 font-medium">{pkg.label}</td>
                <td className="px-4 py-3"><StatusBadge status={pkg.status} /></td>
                <td className="px-4 py-3 stat-number">{pkg.agentsInstalled}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{pkg.createdAt}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{pkg.fileSize}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors" title="Download"><Download className="h-3.5 w-3.5" /></button>
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors" title="Delete"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MsiPackages;
