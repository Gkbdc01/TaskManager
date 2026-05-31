# Task Manager — Full-Stack Kanban Workspace

Task Manager is a secure, highly visual, fully decoupled 3-column Kanban application built to manage tasks and workflows. The application leverages an optimized custom-hook design pattern on the frontend and an isolated, token-secured REST API engine on the backend.

---

##  Core Capabilities & Specs

* **Asymmetrical Minimal Dark UI**: Built with dynamic text tab feature previews and responsive glassmorphism containers.
* **3-Column Kanban Workflow**: Move tasks seamlessly through `Todo`, `In Progress`, and `Done` states.
* **Inline Card Mutations**: Click, update, and instantly save titles or descriptions without disruptive popup modals.
* **Optimistic UI Architecture**: Front-end state updates reflect instantly across columns while network synchronization executes silently.
* **Automatic Session Cleansing**: Configured strictly with `sessionStorage` to instantly wipe local access credentials and force security logs out upon tab/app closure.
* **Stateless Session Security**: Protected server requests via JSON Web Token (JWT) authorization headers.

---

##  Tech Stack Architecture

### Frontend (Client Portal)
* **Framework**: React.js 18+ (Vite Build Pipeline)
* **Styling Engine**: Tailwind CSS
* **Routing Manager**: React Router DOM v6
* **Network Client**: Axios (configured with global request/response interceptors)

### Backend (API Service Node)
* **Runtime Layer**: Node.js & Express.js
* **Database Target**: MongoDB Atlas (Cloud Cluster Layer)
* **Cryptographic Layer**: Bcrypt.js (password hashing) & JSON Web Tokens (session signing)
* **CORS:** Strictly configured cross-origin policies locking down requests to the Vercel production domain.

---

## 🔗 Live Deployments

* **Frontend Environment (Vercel):** [https://task-manager-sigma-seven-22.vercel.app](https://task-manager-sigma-seven-22.vercel.app)
* **Backend API Node (Render):** [https://taskmanager-mlam.onrender.com](https://taskmanager-mlam.onrender.com)

##  Technical Decisions & Tradeoffs

### 1. Component Extraction & DRY Pattern
During layout implementation, static presentation details on the authentication screens were abstracted into a reusable `<AuthSidebar />` component. This keeps the codebase DRY, separates styling concerns from dynamic state layers, and ensures identical branding visuals between routing endpoints.

### 2. Tab-Scoped Stateless Sessions (Security Tradeoff)
* **Tradeoff:** Tokens are persisted using browser `sessionStorage` rather than persistent `localStorage` or HttpOnly cookies.
* **Impact:** State parameters clear automatically the absolute second a user closes their tab (mitigating stale session exploits). Users must re-authenticate on every unique window session, keeping the security footprint lightweight without introducing heavy cookie configuration overhead.

### 3. Free-Tier Cold Starts (Infrastructural Tradeoff)
* **Tradeoff:** The backend node is deployed on Render's free hobby tier.
* **Impact:** Containers spin down automatically into low-power states after 15 minutes of inactivity. The first user request may cause a startup lag of ~50 seconds while the image boots. This tradeoff was accepted to prioritize zero-cost development, relying on UI loading spinners to preserve user feedback during cold starts.

---
##  Repository Directory Structure

```text
task-manager-root/
├── backend/             # Server API Engine
│   ├── config/          # Database configuration settings
│   ├── controllers/     # Route logic implementation execution blocks
│   ├── middleware/      # JWT route guardians
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # API resource endpoints (Auth & Tasks)
│   ├── server.js        # Core Express entry engine
│   └── package.json     # Backend server dependencies
├── frontend/            # Client React Application (Vite)
│   ├── components/      # UI design layout items (TaskCard, Grids)
│   ├── context/         # AuthContext dynamic token session management
│   ├── hooks/           # Isolated business logic custom hook functions
│   ├── pages/           # Dashboard workspace, Login, and Registration views
│   ├── public/          # Static browser asset files
│   ├── src/             # Base source compilation portal
│   │   └── assets/      # Vector design files and imagery
│   ├── utils/           # Centralized Axios network interceptors
│   ├── index.html       # Vite HTML entry mount link
│   └── package.json     # Frontend client dependencies
└── .gitignore           # Shared dependency/credential exclusion file
