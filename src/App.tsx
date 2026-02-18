import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import AgentDetail from "./pages/AgentDetail";
import Certificates from "./pages/Certificates";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import AgentManagement from "./pages/AgentManagement";
import EnrollmentKeys from "./pages/EnrollmentKeys";
import MsiPackages from "./pages/MsiPackages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentDetail />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/agents" element={<AgentManagement />} />
            <Route path="/settings/enrollment-keys" element={<EnrollmentKeys />} />
            <Route path="/settings/msi" element={<MsiPackages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
