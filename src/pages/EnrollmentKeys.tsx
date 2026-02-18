import { enrollmentKeys as keysData } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { useState } from "react";
import { Plus, Copy, Trash2, Ban } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const EnrollmentKeys = () => {
  const [keys] = useState(keysData);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Copied", description: "Enrollment key copied to clipboard" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Enrollment Keys</h1>
          <p className="text-sm text-muted-foreground">Manage agent enrollment keys</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" /> Create Key
            </button>
          </DialogTrigger>
          <DialogContent className="glass-card border-border">
            <DialogHeader>
              <DialogTitle>Create Enrollment Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Label</label>
                <input className="mt-1 w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" placeholder="e.g. Production Servers" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Max Uses</label>
                  <input type="number" className="mt-1 w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" defaultValue={20} />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Expiry Date</label>
                  <input type="date" className="mt-1 w-full rounded-lg border border-border bg-secondary/30 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
                </div>
              </div>
              <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Generate Key</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Usage</th>
              <th className="px-4 py-3 hidden md:table-cell">Expiry</th>
              <th className="px-4 py-3 hidden md:table-cell">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map(key => (
              <tr key={key.id} className="border-b border-border/30">
                <td className="px-4 py-3 font-medium">{key.label}</td>
                <td className="px-4 py-3"><StatusBadge status={key.status} /></td>
                <td className="px-4 py-3 stat-number text-muted-foreground">{key.usageCount} / {key.maxUses}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{key.expiryDate}</td>
                <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{key.createdAt}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => copyKey(key.key)} className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors" title="Copy Key"><Copy className="h-3.5 w-3.5" /></button>
                    <button className="rounded-md p-1.5 text-muted-foreground hover:bg-warning/10 hover:text-warning transition-colors" title="Revoke"><Ban className="h-3.5 w-3.5" /></button>
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

export default EnrollmentKeys;
