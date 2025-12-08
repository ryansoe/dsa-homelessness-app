# Homelessness Case Manager App - Frontend Prototype

A comprehensive frontend prototype for case managers working with the unhoused population, built with Next.js, TailwindCSS, and shadcn/ui.

## Overview

This prototype demonstrates a centralized resource platform designed to help case managers efficiently connect clients with critical services including housing, food, medical care, mental health support, and more.

## Key Features

### 🏠 Home / Triage Dashboard
- **Intelligent LLM-powered search** with natural language queries
- **Advanced filtering** for crisis situations (co-occurring disorders, walk-ins, sobriety requirements)
- **Real-time resource list** with bed availability, distance, and contact information
- **Map view** showing resource locations (placeholder)
- **Quick actions**: Call, favorite, add to plan, view details

### 📋 Resource Details
- Comprehensive resource information (contact, hours, eligibility)
- Bed capacity and availability status
- Insurance and demographic requirements
- AI-suggested related resources
- One-click actions for calling, favoriting, and adding to care plans

### 🗺️ Long-Term Care Plans
- **Timeline-based planning**: Near-term (0-2 weeks), Short-term (1-3 months), Long-term (3+ months)
- **AI-generated care pathways** based on anchor interventions
- **Status tracking**: Planned, In Progress, Completed
- Holistic approach connecting short-term needs with long-term stability

### 📝 Case Notes
- **Structured templates** for consistent documentation
  - Purpose/Type of Meeting
  - Intervention/Progress
  - Follow-up Steps
- **Free-form note taking** with dictation placeholder
- **HIPAA-compliant** encryption indicators
- Automatic timestamps (created/updated)

### ⏰ Reminders & To-Do
- Task management with priority levels (high/medium/low)
- Calendar view for scheduling
- Filter by overdue, today, upcoming
- Link reminders to resources, clients, or notes
- Summary statistics dashboard

### 🛡️ Safety & Emergency Resources
- **Quick access to crisis lines**: 988, San Diego Access & Crisis Line, DV/SA hotlines
- **PERT, MCRT, and ACT team contacts** organized by region
- **Police department contacts** for San Diego County
- **Safety tips** for field work and trauma-informed care
- **Decision guide**: When to call PERT vs. Police vs. MCRT

### 🔐 Security & Settings
- **Two-factor authentication** placeholder
- **HIPAA compliance** explanations
- Account management and preferences
- Data encryption and privacy information

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository (if not already in the directory):
```bash
cd /Users/ryansoe/Documents/apps/homelessness-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Demo Flow

For the best stakeholder presentation, follow this flow:

1. **Start at Home/Triage** (`/`)
   - Show the client context header (John D., high-acuity)
   - Demonstrate natural language search: "rehab with co-occurring mental health tonight"
   - Apply crisis filters (accepts co-occurring, no sobriety requirement)
   - Show the resource list with bed availability and distance
   - Click on a resource to view details

2. **Resource Details** (`/resources/[id]`)
   - Show comprehensive information
   - Demonstrate "Add to Plan" action
   - Show AI-suggested related resources

3. **Long-Term Care Plan** (`/plans`)
   - Show the AI-generated care pathway
   - Demonstrate timeline organization (near/short/long term)
   - Update status of a plan item
   - Explain the holistic approach (rehab → housing → employment → support)

4. **Case Notes** (`/notes`)
   - Open an existing note to show timestamps and encryption
   - Demonstrate the structured template
   - Show the dictation placeholder
   - Emphasize HIPAA compliance indicators

5. **Reminders** (`/reminders`)
   - Show task organization (overdue, today, upcoming)
   - Demonstrate creating a new reminder
   - Show how reminders link to resources and clients

6. **Safety Resources** (`/safety`)
   - Show emergency contacts organized by type
   - Demonstrate quick-call functionality
   - Review safety tips accordion
   - Explain the decision guide (PERT vs. Police vs. MCRT)

7. **Settings & Security** (`/settings`)
   - Show 2FA and security features
   - Explain HIPAA compliance measures
   - Review data encryption and privacy

8. **Sign-In Flow** (`/sign-in`)
   - Demonstrate the authentication UI
   - Show 2FA step
   - Emphasize security messaging

## Project Structure

```
homelessness-app/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with AppShell
│   ├── page.tsx             # Home/Triage dashboard
│   ├── plans/               # Care plan builder
│   ├── notes/               # Case notes workspace
│   ├── reminders/           # Task management
│   ├── safety/              # Emergency contacts & safety tips
│   ├── settings/            # User settings & security
│   ├── sign-in/             # Authentication flow
│   └── resources/[id]/      # Resource detail pages
├── components/
│   ├── app/                 # App-specific components
│   │   └── app-shell.tsx   # Main layout with nav
│   └── ui/                  # shadcn/ui components
├── data/                    # Mock data
│   ├── resources.ts         # Resource fixtures
│   ├── contacts.ts          # Emergency contacts & safety tips
│   └── mock-data.ts         # Clients, notes, reminders
├── lib/
│   ├── types.ts             # TypeScript type definitions
│   ├── filters.ts           # Resource filtering & search
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Design Philosophy

### Clinical Theme
- Clean, modern interface with healthcare-inspired aesthetics
- Teal/blue accent colors for a professional, calming feel
- High contrast for readability in field conditions
- Touch-friendly controls for mobile use

### Accessibility
- Larger font sizes for crisis situations
- Color-blind friendly (icons + labels, not color alone)
- Clear visual hierarchy
- Keyboard navigation support

### High-Acuity Focus
- Quick filters for urgent needs
- Prominent bed availability indicators
- One-tap calling
- Low-barrier resource identification

## Mock Data

The prototype includes realistic mock data for:
- **10 resources** across San Diego County (shelters, rehab, food, medical, etc.)
- **30+ emergency contacts** (crisis lines, PERT, MCRT, police, clinics)
- **Sample client** (John D., 42, co-occurring SUD + MH)
- **3 case notes** with timestamps
- **4 reminders** at various priority levels
- **8 safety tips** for field work

## Future Enhancements (Not Implemented)

This prototype focuses on UI/UX. A production version would include:

- **Backend API** for real-time data
- **Database** with proper data persistence
- **Real authentication** (Auth0, Okta)
- **Actual LLM integration** for intelligent search
- **Live map** integration (Google Maps, Mapbox)
- **Real-time bed availability** updates
- **Push notifications** for reminders
- **Voice dictation** for notes
- **Offline support** for field work
- **Audit logging** for HIPAA compliance
- **Role-based access control**
- **Integration with 211 database**

## Stakeholder Presentation Tips

1. **Start with the problem**: Explain the challenges case managers face (outdated info, fragmented resources, time-consuming searches)

2. **Demonstrate the breadth**: Show how the app addresses multiple pain points in one platform

3. **Emphasize AI/LLM features**: Highlight intelligent search and care pathway recommendations

4. **Focus on high-acuity needs**: Show crisis filters and low-barrier resource identification

5. **Address security concerns**: Review HIPAA compliance, encryption, and 2FA

6. **Explain the vision**: This is a prototype; production would include real-time data, integrations, and mobile apps

## License

This is a prototype for demonstration purposes.

## Contact

For questions or feedback about this prototype, please contact the development team.
