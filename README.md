#  CRM Application

A complete Customer Relationship Management (CRM) system built with React, Next.js, and Redux Toolkit. Features authentication, dashboard analytics, and product management with a modern, responsive design.

CRM live site link: https://my-crm-sys.vercel.app

##  Features

-  **Authentication System** - Secure login with session management
-  **Interactive Dashboard** - Charts, analytics, and business metrics
-  **Product Management** - Full CRUD operations for inventory
-  **Modern UI** - Clean, responsive design with Tailwind CSS
-  **State Management** - Redux Toolkit for efficient data handling
-  **Mobile Responsive** - Works perfectly on all devices
-  **Fast Performance** - Optimized with Next.js 14

## Tech Stack

- **Frontend:** React 18, Next.js 14, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS, shadcn/ui
- **Charts:** Recharts
- **Authentication:** Custom auth system
- **API:** DummyJSON with mock fallback
- **Deployment:** Vercel

##  Quick Start

### Demo Credentials
Try the live demo with these credentials:
- Username: `admin` | Password: `admin123`
- Username: `demo` | Password: `demo123`
- Username: `test` | Password: `test123`

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/crm-application.git
   cd crm-application
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

##  Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard with charts & analytics
│   ├── login/            # Authentication page
│   ├── products/         # Product management (CRUD)
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── auth-guard.tsx   # Route protection
│   └── layout/          # Navigation & sidebar
├── lib/                 # Core utilities
│   ├── features/        # Redux slices (auth, products)
│   ├── store.ts         # Redux store configuration
│   └── hooks.ts         # Custom React hooks
└── public/              # Static assets
\`\`\`

##  Key Features Explained

### Authentication
- Secure login system with session persistence
- Protected routes with automatic redirects
- Mock authentication with real API fallback

### Dashboard
- Interactive charts (Bar, Line, Pie charts)
- Business metrics and KPIs
- Recent activity feed
- Responsive grid layout

### Product Management
- Create, Read, Update, Delete products
- Search and filter functionality
- Image upload support
- Stock management
- Category organization
- 
##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Recharts](https://recharts.org/) - Chart library
- [DummyJSON](https://dummyjson.com/) - Mock API

---
