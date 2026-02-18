
# MD CertManager – Modern Dashboard Redesign

A sleek, futuristic certificate management dashboard with a **glassmorphism dark theme**, frosted glass panels, subtle glowing accents, and smooth animations. All pages use **static mock data** — no backend required.

---

## Design System
- **Dark background** with subtle gradient (deep navy to near-black)
- **Frosted glass cards** with backdrop blur, semi-transparent borders, and soft glow effects
- Keep the existing color palette but enhance with luminous accent variants
- Monospace-style numbers for stats, clean sans-serif for text
- Smooth fade-in and stagger animations on page load
- Consistent icon usage via Lucide icons

---

## Pages

### 1. Overview Dashboard (`/`)
- **6 stat cards** in a responsive grid: Total Agents, Certificates, Active Alerts, Expiring Soon, Pending Agents, License Utilization
- Each card with a glowing accent border matching its category color (blue, green, red, orange, purple)
- **Certificate expiry timeline** chart (bar/area chart using Recharts)
- **Agent status distribution** donut chart
- **Recent Alerts** table showing latest 5 alerts with severity badges
- **Recent Certificates** table showing latest 5 certs with status chips

### 2. Agents List (`/agents`)
- Filter chips at top: All, Online, Offline, Pending — with live counts
- Data table with columns: Hostname, Status (colored badge), OS, Certificates, Last Heartbeat, Last Scan
- Clickable rows navigating to agent detail
- Search/filter built into the table

### 3. Agent Detail (`/agents/:id`)
- **Header card** with agent avatar, hostname, status badge, heartbeat, version info, and action buttons (Rescan, Enable/Disable)
- **Tabbed content** below:
  - **Certificates tab**: table of certificates on this agent with status, thumbprint, expiry
  - **Stores tab**: grouped certificate stores
  - **Events tab**: recent agent events/logs
  - **Configuration tab**: agent config details (scan interval, version, etc.)

### 4. Certificates (`/certificates`)
- Filters: Status (Valid/Expiring/Expired), Agent dropdown, Group by Thumbprint toggle
- Data table with columns: Subject, Thumbprint, Issuer, Status (colored chip), Expiry Date, Agent
- Expandable grouping by thumbprint showing all agents sharing that cert

### 5. Alerts (`/alerts`)
- Filters: Severity (Critical/Warning/Info), Status (New/Acknowledged/Resolved), Agent
- Data table with severity-colored left border accent
- Columns: Severity icon, Message, Agent, Created date, Status
- Row actions: Acknowledge, Resolve

### 6. Settings (`/settings`)
- **Tabbed layout** with glass-panel sections:
  - **Alert Rules**: table of rules with enable/disable toggles
  - **Notifications**: email/webhook configuration cards
  - **Internal CA**: certificate authority status and actions
  - **General**: app-level settings

### 7. Agent Management (`/settings/agents`)
- License usage stat cards at top (Licensed, Pending, Revoked, Utilization %)
- Progress bar for license capacity
- Tabbed tables: Pending Approval, Active Agents, Revoked
- Action buttons: Approve, Revoke, Delete

### 8. Enrollment Keys (`/settings/enrollment-keys`)
- "Create Enrollment Key" button
- Table of keys with: Label, Status badge, Usage count, Expiry, Created date
- Row actions: Copy key, Revoke, Delete
- Create dialog with label, max uses, and expiry fields

### 9. Deployment Packages (`/settings/msi`)
- "Generate New Package" button
- Info banner explaining package purpose
- Table: Label, Status, Agents Installed, Created date, File size
- Row actions: Download, Delete

---

## Navigation
- **Sidebar** with glassmorphism styling, app logo/name at top
- Nav sections: Dashboard, Agents, Certificates, Alerts
- Settings section: General Settings, Agent Management, Enrollment Keys, Packages
- Active route highlighted with glowing accent
- Collapsible on mobile with hamburger menu
