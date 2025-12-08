# Demo Script for Stakeholder Presentation

## Pre-Demo Setup
1. Start the development server: `npm run dev`
2. Open browser to `http://localhost:3000`
3. Have this script open on a second screen for reference
4. Estimated demo time: 15-20 minutes

---

## Introduction (2 minutes)

**Opening Statement:**
"Today I'm excited to show you a prototype that addresses the key challenges case managers face when connecting clients with resources. This platform brings together intelligent search, comprehensive resource data, long-term care planning, and safety tools—all in one place."

**Key Problems We're Solving:**
- Outdated, unreliable resource information
- Time-consuming manual searches and phone calls
- Fragmented, short-term solutions instead of holistic care
- Safety concerns for high-acuity field work

---

## Demo Flow

### 1. Home/Triage Dashboard (4 minutes)

**URL:** `/` (Home page)

**What to Show:**
- Point out the **client context header** at the top
  - "Here's John D., a 42-year-old client with co-occurring substance use and mental health issues—typical of the high-acuity population we serve"
  
- Demonstrate **intelligent search**:
  - Type: `"rehab with co-occurring mental health tonight"`
  - Point out the **AI-Ranked badge** that appears
  - "The LLM understands the context and prioritizes relevant results"

- Show **crisis filters**:
  - Click the "Filters" button
  - Check: "Accepts co-occurring SUD + MH"
  - Check: "No sobriety requirement"
  - Check: "Accepts walk-ins"
  - "These filters are designed for urgent, high-acuity situations"

- Point out **resource cards**:
  - Bed availability status (Available/Limited/Full)
  - Distance from current location
  - Key tags (Low-barrier, Case management, etc.)
  - One-tap call button
  - Favorite/star functionality
  - "Add to Plan" action

- Show **map panel** (right side):
  - "In production, this would show real-time locations with clickable pins"

**Key Talking Points:**
- Natural language search powered by LLM
- Real-time bed availability (in production)
- Designed for mobile use in the field
- Quick actions reduce time spent on administrative tasks

---

### 2. Resource Details (3 minutes)

**URL:** Click on any resource (e.g., "McAlister Institute")

**What to Show:**
- **Comprehensive information**:
  - Contact details with tap-to-call
  - Hours of operation
  - Bed capacity and status
  - Eligibility requirements clearly displayed
  - Insurance accepted
  - Sobriety requirements
  - Gender restrictions
  - Curfew policies

- **Action buttons** at the top:
  - "Add to Plan" - "This connects to our long-term care planning feature"
  - "Copy to Notes" - "Quick documentation"
  - "Call" - "One tap to connect"
  - "Favorite" - "Save frequently used resources"

- **Related Resources** (right sidebar):
  - "The AI suggests related resources based on the client's needs"
  - "For example, if they're going to rehab, it suggests post-rehab housing and therapy"

**Key Talking Points:**
- All critical information in one place
- No more calling multiple facilities for basic info
- AI-powered recommendations for holistic care
- Last updated timestamps for data reliability

---

### 3. Long-Term Care Plans (4 minutes)

**URL:** `/plans`

**What to Show:**
- **AI-Generated Care Pathway banner**:
  - "Based on the anchor intervention—rehab—the system recommends a complete care pathway"
  - Point out the three categories:
    1. Post-Rehab Housing
    2. Ongoing Mental Health Support
    3. Employment & Independence
  - "This is the holistic approach we need—not just solving today's crisis, but building toward stability"

- **Timeline tabs**:
  - **Near-term (0-2 weeks)**: "McAlister Institute assessment scheduled"
  - **Short-term (1-3 months)**: "Transitional housing and job training"
  - **Long-term (3+ months)**: "Ongoing primary care and support"

- **Status tracking**:
  - Click on a plan item's status dropdown
  - Change from "Planned" to "In Progress"
  - "Case managers can track progress over time"

- **Add resources from recommendations**:
  - Click "Add" on one of the AI-suggested resources
  - Show it appearing in the appropriate timeline

**Key Talking Points:**
- Moves beyond one-off solutions
- LLM/recommender system suggests complete care pathways
- Organizes interventions by timeframe
- Tracks progress from crisis to stability
- Reduces cognitive load on case managers

---

### 4. Case Notes (3 minutes)

**URL:** `/notes`

**What to Show:**
- **Notes list** (left sidebar):
  - Point out timestamps: "Created" and "Last edited"
  - Encryption indicator (lock icon)
  - "All notes are encrypted for HIPAA compliance"

- **Structured template** (default view):
  - Purpose/Type of Meeting
  - Intervention/Progress
  - Follow-up Steps
  - "This ensures consistent documentation across the team"

- **Free-form tab**:
  - Switch to "Free-form" tab
  - Point out the **Dictation button** (disabled in prototype)
  - "In production, case managers could use voice-to-text in the field"

- **Edit a note**:
  - Click "Edit"
  - Make a small change
  - Click "Save"
  - Point out the updated timestamp

- **HIPAA notice** at the bottom:
  - "End-to-end encryption, audit logging, secure storage"

**Key Talking Points:**
- No more loose papers or unsecured notes apps
- Templates ensure complete documentation
- Automatic timestamps for audit trails
- Dictation for efficiency in the field
- HIPAA-compliant by design

---

### 5. Reminders & To-Do (2 minutes)

**URL:** `/reminders`

**What to Show:**
- **Task organization tabs**:
  - Overdue (red badge)
  - Today
  - Upcoming
  - "Helps prioritize daily work"

- **Task details**:
  - Priority levels (High/Medium/Low)
  - Due dates with overdue indicators
  - Links to resources or clients
  - "Call McAlister Institute" linked to the resource

- **Create a reminder**:
  - Click "New Reminder"
  - Fill in title: "Follow up with John D."
  - Set due date
  - Choose priority
  - "Reminders can be linked to specific resources or clients"

- **Calendar sidebar**:
  - Shows visual calendar
  - Summary statistics

**Key Talking Points:**
- Replaces scattered to-do lists
- Links tasks to resources and clients
- Calendar view for scheduling
- Priority-based organization

---

### 6. Safety & Emergency Resources (3 minutes)

**URL:** `/safety`

**What to Show:**
- **Emergency banner** at the top:
  - Quick access to 911, 988, SD Access & Crisis Line
  - "Immediate access in crisis situations"

- **Organized contacts tabs**:
  - Crisis Lines
  - Mobile Teams (PERT, MCRT, ACT)
  - Hotlines (DV, SA, substance abuse)
  - Police (by region)
  - Clinics (Jane Westin, CRF locations)

- **Contact cards**:
  - Tap-to-call functionality
  - Regional information
  - Clear descriptions

- **Safety Tips accordion**:
  - Expand a few tips:
    - "Always inform your supervisor of your location"
    - "De-escalation techniques"
    - "When to call PERT vs. Police"

- **Decision Guide** at the bottom:
  - "When to call PERT: Mental health crisis, no violence"
  - "When to call Police: Immediate danger, weapons"
  - "When to call MCRT: Mobile crisis support"

**Key Talking Points:**
- Safety is paramount for case managers in the field
- Quick access to appropriate resources
- Clear guidance on which team to call
- Trauma-informed best practices
- Regional contacts for San Diego County

---

### 7. Settings & Security (2 minutes)

**URL:** `/settings`

**What to Show:**
- **Account Information**:
  - Profile details
  - Organization affiliation

- **Security & Authentication**:
  - Two-Factor Authentication (enabled badge)
  - Session timeout settings
  - Password management

- **Data & Privacy section** (blue background):
  - Read through the key points:
    - "AES-256 encryption at rest"
    - "HIPAA compliance with BAA agreements"
    - "Role-based access control"
    - "Audit logging for all data access"
    - "Automated encrypted backups"

- **Notifications**:
  - Configure reminder alerts
  - Resource update notifications

**Key Talking Points:**
- Security and privacy are foundational
- HIPAA compliance built in from day one
- Two-factor authentication for all users
- All access is logged and auditable
- Encrypted storage and transmission

---

### 8. Sign-In Flow (1 minute)

**URL:** `/sign-in`

**What to Show:**
- **Sign-in form**:
  - Email and password fields
  - Enter any credentials and click "Continue"

- **2FA step**:
  - "Verification code sent" message
  - 6-digit code input
  - "In production, this would integrate with Auth0 or Okta"

- **Security notices**:
  - HIPAA compliance message
  - Prototype disclaimer

**Key Talking Points:**
- Two-factor authentication for all users
- Would integrate with existing identity providers
- Audit trail for all logins
- Session management and timeouts

---

## Closing (2 minutes)

**Summary:**
"This prototype demonstrates how we can address the key challenges case managers face:

1. **Intelligent, reliable resource discovery** - LLM-powered search with real-time data
2. **Holistic care planning** - AI-recommended pathways from crisis to stability
3. **Efficient documentation** - Structured notes with HIPAA compliance
4. **Safety and support** - Emergency contacts and field work guidance
5. **Security first** - Encryption, 2FA, and audit logging

This is a frontend prototype showing the breadth of what's possible. A production system would include:
- Real-time data integration with 211 and other databases
- Actual LLM API integration
- Mobile apps for iOS and Android
- Offline support for field work
- Push notifications
- Voice dictation
- Live map integration
- Full backend with authentication and database"

**Questions to Ask Stakeholders:**
1. Which features resonate most with your case managers' needs?
2. Are there additional resource types or filters we should prioritize?
3. What integrations would be most valuable (211, EHR systems, etc.)?
4. What are your biggest concerns about data security and HIPAA compliance?
5. Would you want to pilot this with a small group of case managers?

---

## Technical Notes for Q&A

**Tech Stack:**
- Next.js 15 (React framework)
- TypeScript (type safety)
- TailwindCSS v4 (modern styling)
- shadcn/ui (accessible components)

**Timeline Estimate for Production:**
- Phase 1 (MVP with core features): 4-6 months
- Phase 2 (Mobile apps + integrations): 3-4 months
- Phase 3 (Advanced AI features): 2-3 months

**Cost Considerations:**
- LLM API costs (OpenAI, Anthropic)
- Cloud infrastructure (AWS, Azure, GCP)
- Database (PostgreSQL, MongoDB)
- Authentication service (Auth0, Okta)
- Map service (Google Maps, Mapbox)
- Ongoing maintenance and support

**Data Sources:**
- 211 San Diego database
- County HHSA systems
- Direct partnerships with service providers
- Manual data entry and verification
- Crowdsourced updates from case managers

---

## Troubleshooting

**If the app isn't running:**
```bash
cd /Users/ryansoe/Documents/apps/homelessness-app
npm install
npm run dev
```

**If you see build errors:**
- Check that Node.js version is 18+
- Clear `.next` folder: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`

**If port 3000 is in use:**
- The app will automatically use port 3001
- Or stop the other process: `lsof -ti:3000 | xargs kill`

---

## Follow-Up Materials to Prepare

1. **User research summary** - Key findings from Marianne and Darryl
2. **Competitive analysis** - Existing solutions and their limitations
3. **Technical architecture diagram** - For production system
4. **Security and compliance documentation** - HIPAA requirements
5. **Budget and timeline proposal** - Phased implementation plan
6. **Case manager feedback form** - For pilot testing

---

Good luck with your presentation! 🚀


