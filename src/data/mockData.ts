// ===== AGENTS =====
export interface Agent {
  id: string;
  hostname: string;
  status: "Online" | "Offline" | "Pending";
  os: string;
  certificateCount: number;
  lastHeartbeat: string;
  lastScan: string;
  version: string;
  scanInterval: number;
  ipAddress: string;
}

export const agents: Agent[] = [
  { id: "a1", hostname: "WEB-PROD-01", status: "Online", os: "Windows Server 2022", certificateCount: 12, lastHeartbeat: "2 min ago", lastScan: "15 min ago", version: "3.2.1", scanInterval: 60, ipAddress: "10.0.1.10" },
  { id: "a2", hostname: "WEB-PROD-02", status: "Online", os: "Windows Server 2022", certificateCount: 8, lastHeartbeat: "1 min ago", lastScan: "10 min ago", version: "3.2.1", scanInterval: 60, ipAddress: "10.0.1.11" },
  { id: "a3", hostname: "DB-PROD-01", status: "Online", os: "Windows Server 2019", certificateCount: 5, lastHeartbeat: "5 min ago", lastScan: "30 min ago", version: "3.2.0", scanInterval: 120, ipAddress: "10.0.2.10" },
  { id: "a4", hostname: "APP-STAGING-01", status: "Offline", os: "Windows Server 2022", certificateCount: 6, lastHeartbeat: "3 hours ago", lastScan: "3 hours ago", version: "3.1.9", scanInterval: 60, ipAddress: "10.0.3.10" },
  { id: "a5", hostname: "DC-01", status: "Online", os: "Windows Server 2022", certificateCount: 24, lastHeartbeat: "30 sec ago", lastScan: "5 min ago", version: "3.2.1", scanInterval: 30, ipAddress: "10.0.0.1" },
  { id: "a6", hostname: "MAIL-01", status: "Online", os: "Windows Server 2019", certificateCount: 3, lastHeartbeat: "1 min ago", lastScan: "20 min ago", version: "3.2.1", scanInterval: 60, ipAddress: "10.0.1.20" },
  { id: "a7", hostname: "DEV-WS-01", status: "Pending", os: "Windows 11", certificateCount: 0, lastHeartbeat: "Never", lastScan: "Never", version: "3.2.1", scanInterval: 60, ipAddress: "10.0.5.100" },
  { id: "a8", hostname: "DEV-WS-02", status: "Pending", os: "Windows 11", certificateCount: 0, lastHeartbeat: "Never", lastScan: "Never", version: "3.2.1", scanInterval: 60, ipAddress: "10.0.5.101" },
];

// ===== CERTIFICATES =====
export interface Certificate {
  id: string;
  subject: string;
  thumbprint: string;
  issuer: string;
  status: "Valid" | "Expiring" | "Expired";
  expiryDate: string;
  agentId: string;
  agentHostname: string;
  store: string;
}

export const certificates: Certificate[] = [
  { id: "c1", subject: "*.example.com", thumbprint: "A1B2C3D4E5F6", issuer: "DigiCert Global G2", status: "Valid", expiryDate: "2026-08-15", agentId: "a1", agentHostname: "WEB-PROD-01", store: "My" },
  { id: "c2", subject: "api.example.com", thumbprint: "F6E5D4C3B2A1", issuer: "Let's Encrypt R3", status: "Expiring", expiryDate: "2026-03-01", agentId: "a1", agentHostname: "WEB-PROD-01", store: "My" },
  { id: "c3", subject: "*.example.com", thumbprint: "A1B2C3D4E5F6", issuer: "DigiCert Global G2", status: "Valid", expiryDate: "2026-08-15", agentId: "a2", agentHostname: "WEB-PROD-02", store: "My" },
  { id: "c4", subject: "db.internal.local", thumbprint: "1122334455AA", issuer: "Internal CA", status: "Valid", expiryDate: "2027-01-10", agentId: "a3", agentHostname: "DB-PROD-01", store: "My" },
  { id: "c5", subject: "staging.example.com", thumbprint: "BBCCDDEE1122", issuer: "Let's Encrypt R3", status: "Expired", expiryDate: "2025-12-20", agentId: "a4", agentHostname: "APP-STAGING-01", store: "My" },
  { id: "c6", subject: "ldaps.corp.local", thumbprint: "99AABB001122", issuer: "Corp Root CA", status: "Valid", expiryDate: "2027-06-30", agentId: "a5", agentHostname: "DC-01", store: "My" },
  { id: "c7", subject: "mail.example.com", thumbprint: "DEADBEEF1234", issuer: "DigiCert Global G2", status: "Expiring", expiryDate: "2026-02-28", agentId: "a6", agentHostname: "MAIL-01", store: "My" },
  { id: "c8", subject: "code-signing.example.com", thumbprint: "CAFE12345678", issuer: "DigiCert EV", status: "Valid", expiryDate: "2027-03-15", agentId: "a5", agentHostname: "DC-01", store: "My" },
];

// ===== ALERTS =====
export interface Alert {
  id: string;
  severity: "Critical" | "Warning" | "Info";
  message: string;
  agentId: string;
  agentHostname: string;
  createdAt: string;
  status: "New" | "Acknowledged" | "Resolved";
}

export const alerts: Alert[] = [
  { id: "al1", severity: "Critical", message: "Certificate expired: staging.example.com", agentId: "a4", agentHostname: "APP-STAGING-01", createdAt: "2026-02-18 09:30", status: "New" },
  { id: "al2", severity: "Warning", message: "Certificate expiring in 10 days: mail.example.com", agentId: "a6", agentHostname: "MAIL-01", createdAt: "2026-02-18 08:15", status: "New" },
  { id: "al3", severity: "Warning", message: "Certificate expiring in 11 days: api.example.com", agentId: "a1", agentHostname: "WEB-PROD-01", createdAt: "2026-02-18 08:00", status: "Acknowledged" },
  { id: "al4", severity: "Info", message: "Agent version update available for APP-STAGING-01", agentId: "a4", agentHostname: "APP-STAGING-01", createdAt: "2026-02-17 14:00", status: "New" },
  { id: "al5", severity: "Critical", message: "Agent offline: APP-STAGING-01", agentId: "a4", agentHostname: "APP-STAGING-01", createdAt: "2026-02-17 12:30", status: "Acknowledged" },
  { id: "al6", severity: "Info", message: "New agent pending approval: DEV-WS-01", agentId: "a7", agentHostname: "DEV-WS-01", createdAt: "2026-02-17 10:00", status: "New" },
  { id: "al7", severity: "Info", message: "Scan completed successfully on DC-01", agentId: "a5", agentHostname: "DC-01", createdAt: "2026-02-17 09:00", status: "Resolved" },
];

// ===== ENROLLMENT KEYS =====
export interface EnrollmentKey {
  id: string;
  label: string;
  key: string;
  status: "Active" | "Expired" | "Revoked";
  usageCount: number;
  maxUses: number;
  expiryDate: string;
  createdAt: string;
}

export const enrollmentKeys: EnrollmentKey[] = [
  { id: "ek1", label: "Production Servers", key: "EK-PROD-2026-ABCDEF", status: "Active", usageCount: 4, maxUses: 20, expiryDate: "2026-12-31", createdAt: "2026-01-15" },
  { id: "ek2", label: "Staging Environment", key: "EK-STG-2026-123456", status: "Active", usageCount: 1, maxUses: 5, expiryDate: "2026-06-30", createdAt: "2026-01-20" },
  { id: "ek3", label: "Dev Workstations", key: "EK-DEV-2026-XYZABC", status: "Active", usageCount: 2, maxUses: 50, expiryDate: "2026-12-31", createdAt: "2026-02-01" },
  { id: "ek4", label: "Legacy Migration", key: "EK-LEG-2025-OLDKEY", status: "Expired", usageCount: 10, maxUses: 10, expiryDate: "2025-12-31", createdAt: "2025-06-01" },
];

// ===== MSI PACKAGES =====
export interface MsiPackage {
  id: string;
  label: string;
  status: "Active" | "Deprecated";
  agentsInstalled: number;
  createdAt: string;
  fileSize: string;
}

export const msiPackages: MsiPackage[] = [
  { id: "m1", label: "CertManager Agent v3.2.1", status: "Active", agentsInstalled: 5, createdAt: "2026-02-10", fileSize: "24.5 MB" },
  { id: "m2", label: "CertManager Agent v3.2.0", status: "Active", agentsInstalled: 1, createdAt: "2026-01-15", fileSize: "24.1 MB" },
  { id: "m3", label: "CertManager Agent v3.1.9", status: "Deprecated", agentsInstalled: 1, createdAt: "2025-11-20", fileSize: "23.8 MB" },
];

// ===== ALERT RULES =====
export interface AlertRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: "Critical" | "Warning" | "Info";
}

export const alertRules: AlertRule[] = [
  { id: "ar1", name: "Certificate Expiry - 30 days", description: "Alert when certificate expires within 30 days", enabled: true, severity: "Warning" },
  { id: "ar2", name: "Certificate Expiry - 7 days", description: "Alert when certificate expires within 7 days", enabled: true, severity: "Critical" },
  { id: "ar3", name: "Certificate Expired", description: "Alert when certificate has expired", enabled: true, severity: "Critical" },
  { id: "ar4", name: "Agent Offline", description: "Alert when agent goes offline for 30+ minutes", enabled: true, severity: "Critical" },
  { id: "ar5", name: "New Agent Pending", description: "Notify when a new agent requires approval", enabled: true, severity: "Info" },
  { id: "ar6", name: "Scan Failure", description: "Alert when a certificate scan fails", enabled: false, severity: "Warning" },
];

// ===== CHART DATA =====
export const expiryTimelineData = [
  { month: "Mar", count: 2 },
  { month: "Apr", count: 0 },
  { month: "May", count: 1 },
  { month: "Jun", count: 0 },
  { month: "Jul", count: 0 },
  { month: "Aug", count: 1 },
  { month: "Sep", count: 0 },
  { month: "Oct", count: 0 },
  { month: "Nov", count: 0 },
  { month: "Dec", count: 0 },
  { month: "Jan", count: 1 },
  { month: "Feb", count: 0 },
];

export const agentStatusData = [
  { name: "Online", value: 5, color: "hsl(142, 71%, 45%)" },
  { name: "Offline", value: 1, color: "hsl(0, 72%, 51%)" },
  { name: "Pending", value: 2, color: "hsl(38, 92%, 50%)" },
];
