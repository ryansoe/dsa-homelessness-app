# Quick Start Guide

## Running the App

1. **Install dependencies** (first time only):
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open in browser**:
- Navigate to `http://localhost:3000` (or the port shown in terminal)
- The app will automatically reload when you make changes

## Navigation

The app has a persistent sidebar with these main sections:

- **Home / Triage** - Resource search and discovery
- **Plans** - Long-term care planning
- **Notes** - Case documentation
- **Reminders** - Task management
- **Safety** - Emergency contacts and safety tips
- **Settings** - Account and security settings

## Key Features to Demonstrate

### 1. Intelligent Search
- Go to Home page
- Type: `"rehab with co-occurring mental health"`
- Watch for the AI-Ranked explanation

### 2. Crisis Filters
- Click "Filters" button on Home page
- Check boxes for high-acuity needs:
  - Accepts co-occurring SUD + MH
  - No sobriety requirement
  - Accepts walk-ins

### 3. Resource Details
- Click any resource card
- View comprehensive information
- Try the action buttons (Add to Plan, Call, Favorite)

### 4. Care Planning
- Go to Plans page
- See AI-generated care pathway
- Change status of a plan item
- Add a resource from recommendations

### 5. Case Notes
- Go to Notes page
- Select a note from the list
- Click Edit to modify
- Switch between Structured and Free-form tabs

### 6. Reminders
- Go to Reminders page
- View tasks by status (Overdue, Today, Upcoming)
- Create a new reminder

### 7. Safety Resources
- Go to Safety page
- Browse emergency contacts by category
- Review safety tips in accordion
- Check the decision guide at bottom

### 8. Sign-In Flow
- Go to `/sign-in`
- Enter any credentials
- See 2FA step

## Mock Data

The app includes realistic mock data:
- **10 resources** across San Diego County
- **30+ emergency contacts** (PERT, MCRT, police, clinics, hotlines)
- **Sample client**: John D., 42, co-occurring SUD + MH
- **3 case notes** with timestamps
- **4 reminders** at various priorities

## File Structure

```
app/
├── page.tsx              # Home/Triage
├── plans/page.tsx        # Care planning
├── notes/page.tsx        # Case notes
├── reminders/page.tsx    # Task management
├── safety/page.tsx       # Emergency resources
├── settings/page.tsx     # Settings
├── sign-in/page.tsx      # Authentication
└── resources/[id]/       # Resource details

data/
├── resources.ts          # Resource mock data
├── contacts.ts           # Emergency contacts
└── mock-data.ts          # Clients, notes, reminders

components/
├── app/app-shell.tsx     # Main layout
└── ui/                   # shadcn components
```

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Port already in use?**
- Next.js will automatically use the next available port (3001, 3002, etc.)
- Or kill the process: `lsof -ti:3000 | xargs kill`

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**TypeScript errors?**
- Check Node.js version: `node --version` (should be 18+)
- Restart your IDE/editor

## Demo Tips

1. **Start with the problem** - Explain case manager pain points
2. **Show breadth** - Touch all major features
3. **Emphasize AI** - LLM search and care pathways
4. **Address security** - HIPAA compliance, encryption, 2FA
5. **Be honest** - This is a prototype; production needs backend

## Next Steps

After the demo:
1. Gather stakeholder feedback
2. Prioritize features for MVP
3. Plan backend architecture
4. Identify data sources (211, etc.)
5. Budget for LLM API, cloud infrastructure
6. Timeline for pilot program

## Support

For questions or issues:
- Review the full README.md
- Check DEMO_SCRIPT.md for detailed walkthrough
- Review the plan document (hom.plan.md)

---

**Ready to present!** 🎉


