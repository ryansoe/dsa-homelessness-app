# Multi-Client Management Update

## Overview

The app has been successfully updated to support multi-client management, allowing case managers to manage multiple clients instead of just one.

## What Changed

### 1. Data Layer (`data/mock-data.ts`)
- **Before**: Single `mockClient` object
- **After**: Array of `mockClients` with 5 diverse client profiles:
  - John D. (42, Male) - Co-occurring SUD + MH, High-acuity, Unhoused
  - Maria S. (35, Female) - Housing insecure, Single parent, Employment needed
  - Robert T. (58, Male) - Veteran, PTSD, Chronic homelessness
  - Lisa M. (29, Female) - Domestic violence survivor, Mental health, Urgent
  - Carlos R. (47, Male) - Recently housed, Job training, Stable

- **Notes**: Expanded from 3 to 7 notes, each linked to specific clients
- **Reminders**: Expanded from 4 to 8 reminders, each linked to specific clients

### 2. New Pages

#### `/clients` - Clients List Page
- **Features**:
  - Grid view of all clients with cards
  - Search by name, tags, or demographics
  - Stats overview (total clients, high acuity, active reminders, recent notes)
  - Each client card shows:
    - Name, age, gender
    - Tags with color coding (urgent/high-acuity = red, stable = green)
    - Quick stats (notes count, reminders count, days since last contact)
    - Overdue indicator (red exclamation mark)
  - Click any client card to view detail

#### `/clients/[id]` - Client Detail Page
- **Features**:
  - Client profile header with tags
  - Quick stats dashboard (total notes, active reminders, overdue tasks, days since contact)
  - Quick action buttons (Add Note, Create Reminder, Search Resources)
  - Tabbed interface:
    - **Overview**: Profile info and recent activity
    - **Notes**: All notes for this client
    - **Reminders**: All reminders for this client
    - **Activity**: Chronological timeline of interactions
  - Back button to return to clients list

#### `/resources` - Resource Search Page
- **Features**:
  - Can be accessed with or without client context (`?client=client-id`)
  - When accessed from client detail, shows client context header
  - Full resource search functionality (same as old home page)
  - Intelligent LLM-powered search
  - Crisis filters and sorting
  - Map panel stub
  - Quick actions (call, favorite, add to plan)

### 3. Updated Pages

#### `/` - Home Page (Dashboard)
- **Before**: Single client with resource search
- **After**: Multi-client dashboard
  - Stats overview (total clients, high acuity, active reminders, overdue tasks)
  - Search bar for finding clients
  - Grid of client cards with quick actions
  - Each card has buttons for "Note" and "Resources"
  - Recent activity feed showing latest notes across all clients
  - "View All Clients" button to go to full clients list

#### Navigation (`components/app/app-shell.tsx`)
- **Added**: "Clients" navigation item (with Users icon)
- **Updated**: "Home / Triage" renamed to "Dashboard"
- **Order**: Dashboard → Clients → Plans → Notes → Reminders → Safety → Settings

### 4. Existing Pages (Notes, Plans, Reminders)
- **Notes**: Already had `clientId` field, now properly displays client badges
- **Plans**: Already had client context, now works with multiple clients
- **Reminders**: Already had `relatedTo` field linking to clients, now shows client badges

## User Flows

### Flow 1: Dashboard → Client Detail → Resource Search
1. Start at Dashboard (`/`)
2. See all clients with quick stats
3. Click a client card → Navigate to `/clients/[id]`
4. View client details in tabs
5. Click "Search Resources" → Navigate to `/resources?client=[id]`
6. Search resources with client context maintained

### Flow 2: Clients List → Client Detail → Add Note
1. Navigate to Clients (`/clients`)
2. Search/filter clients
3. Click a client → Navigate to `/clients/[id]`
4. Click "Add Note" → Navigate to `/notes?client=[id]`
5. Create note linked to that client

### Flow 3: Dashboard Quick Actions
1. Start at Dashboard (`/`)
2. Click "Note" button on any client card → Navigate to `/notes?client=[id]`
3. OR click "Resources" button → Navigate to `/resources?client=[id]`

## Key Design Decisions

### 1. Dashboard-First Approach
- Home page shows overview of ALL clients
- Allows case managers to quickly see who needs attention (overdue tasks, high acuity)
- Quick actions on each card for common tasks

### 2. Dedicated Clients Page
- Full list with more detailed search and filtering
- Separates "quick overview" (dashboard) from "full management" (clients page)

### 3. Client Context Preservation
- When searching resources from a client detail page, client context is maintained via URL params
- "Add to Plan" and other actions can default to the current client

### 4. Mixed Data Organization
- **Notes & Plans**: Can be client-specific or general
- **Reminders**: Unified view with client badges and filtering
- **Resources**: Global but can be searched in client context

### 5. Visual Indicators
- **Red borders**: Overdue reminders
- **Yellow borders**: High-acuity clients
- **Green badges**: Stable clients
- **Red badges**: Urgent/high-acuity tags
- **Exclamation marks**: Overdue indicators

## Backward Compatibility

- Kept `mockClient` export for backward compatibility (points to first client)
- Existing pages (Notes, Plans, Reminders) work without modification
- Resource detail page unchanged

## Demo Flow for Stakeholders

1. **Start at Dashboard**
   - "Here's your caseload overview. You can see John D. has overdue tasks (red exclamation)"
   - "Maria S. is a new client with housing needs"
   - "Quick actions let you add notes or search resources right from here"

2. **Click 'View All Clients'**
   - "Full clients list with search"
   - "See stats for each client at a glance"

3. **Click on John D.**
   - "Detailed client view with tabs"
   - "See all notes, reminders, and activity for this client"
   - "Quick actions at the top"

4. **Click 'Search Resources'**
   - "Resource search maintains John's context"
   - "When you add resources to a plan, it defaults to John's plan"

5. **Back to Dashboard → Click 'Resources' on Maria S.**
   - "Search resources specifically for Maria"
   - "Her tags (single parent, employment needed) help guide the search"

## Technical Notes

- All client data is still mocked (no backend)
- Client context passed via URL params (`?client=client-id`)
- Notes and reminders already had client relationships in the data model
- No database changes needed (frontend-only prototype)

## Files Modified

- `data/mock-data.ts` - Added multiple clients, expanded notes/reminders
- `components/app/app-shell.tsx` - Added Clients nav item
- `app/page.tsx` - Converted to multi-client dashboard
- `app/clients/page.tsx` - NEW: Clients list page
- `app/clients/[id]/page.tsx` - NEW: Client detail page
- `app/resources/page.tsx` - NEW: Resource search page (extracted from old home)

## Files Unchanged

- `app/notes/page.tsx` - Already supported client filtering
- `app/plans/page.tsx` - Already had client context
- `app/reminders/page.tsx` - Already showed client relationships
- `app/safety/page.tsx` - No client context needed
- `app/settings/page.tsx` - No client context needed
- `app/sign-in/page.tsx` - No client context needed
- `app/resources/[id]/page.tsx` - Resource detail unchanged

## Next Steps (Future Enhancements)

1. **Client selector dropdown** in Plans/Notes pages for quick switching
2. **Client-specific favorites** for resources
3. **Client status workflow** (intake → active → stable → closed)
4. **Caseload limits** and workload indicators
5. **Client search** in global header
6. **Client photos/avatars** instead of placeholder icons
7. **Client demographics** expansion (pronouns, language, etc.)
8. **Client history export** for reporting
9. **Bulk actions** on clients list (assign, tag, etc.)
10. **Client comparison view** for similar cases

## Testing Checklist

- [x] Dashboard shows all 5 clients
- [x] Client cards show correct stats
- [x] Search filters clients by name and tags
- [x] Clicking client navigates to detail page
- [x] Client detail shows correct notes and reminders
- [x] Quick actions work from dashboard
- [x] Quick actions work from client detail
- [x] Resource search maintains client context
- [x] Navigation includes Clients link
- [x] No linting errors
- [x] All pages load without errors

## Summary

The app now fully supports multi-client management with:
- ✅ 5 diverse client profiles
- ✅ Dashboard overview of all clients
- ✅ Dedicated clients list page
- ✅ Individual client detail pages with tabs
- ✅ Client context maintained across pages
- ✅ Quick actions for common tasks
- ✅ Visual indicators for urgency and status
- ✅ Backward compatibility maintained

Case managers can now efficiently manage their entire caseload while maintaining the ability to drill down into individual client details and take contextual actions.


