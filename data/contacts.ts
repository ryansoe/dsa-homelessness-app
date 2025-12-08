import { EmergencyContact } from "@/lib/types";

export const emergencyContacts: EmergencyContact[] = [
  // Crisis Lines & Hotlines
  {
    id: "c1",
    name: "San Diego Access & Crisis Line",
    organization: "County of San Diego HHSA",
    phone: "(888) 724-7240",
    description:
      "24/7 mental health crisis line for San Diego County residents",
    category: "crisis",
    region: "San Diego County",
  },
  {
    id: "c2",
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description:
      "24/7 national suicide prevention and mental health crisis hotline",
    category: "hotline",
  },
  {
    id: "c3",
    name: "Domestic Violence Hotline",
    organization: "National DV Hotline",
    phone: "(800) 799-7233",
    description: "24/7 confidential support for domestic violence survivors",
    category: "hotline",
  },
  {
    id: "c4",
    name: "RAINN Sexual Assault Hotline",
    phone: "(800) 656-4673",
    description: "24/7 national sexual assault hotline",
    category: "hotline",
  },
  {
    id: "c5",
    name: "Substance Abuse Helpline",
    organization: "SAMHSA",
    phone: "(800) 662-4357",
    description:
      "24/7 national helpline for substance abuse treatment referrals",
    category: "hotline",
  },

  // PERT & Mobile Crisis Teams
  {
    id: "m1",
    name: "PERT - Central Division",
    organization: "San Diego Police Department",
    phone: "(619) 531-2000",
    description:
      "Psychiatric Emergency Response Team for mental health crises in Central San Diego",
    category: "mobile-team",
    region: "Central San Diego",
  },
  {
    id: "m2",
    name: "PERT - Northern Division",
    organization: "San Diego Police Department",
    phone: "(858) 538-8000",
    description:
      "Psychiatric Emergency Response Team for mental health crises in Northern San Diego",
    category: "mobile-team",
    region: "Northern San Diego",
  },
  {
    id: "m3",
    name: "MCRT - Mobile Crisis Response Team",
    organization: "County of San Diego",
    phone: "(888) 724-7240",
    description:
      "Mobile crisis response for mental health emergencies countywide",
    category: "mobile-team",
    region: "San Diego County",
  },
  {
    id: "m4",
    name: "HOT Team - Homeless Outreach Team",
    organization: "San Diego Police Department",
    phone: "(619) 531-2000",
    description: "Specialized outreach team for homeless individuals in crisis",
    category: "mobile-team",
    region: "San Diego",
  },

  // ACT & Case Management Programs
  {
    id: "a1",
    name: "ACT Team - Central Region",
    organization: "Telecare Corporation",
    phone: "(619) 528-0800",
    description:
      "Assertive Community Treatment for individuals with serious mental illness",
    category: "mobile-team",
    region: "Central San Diego",
  },
  {
    id: "a2",
    name: "ACT Team - North Coastal",
    organization: "Telecare Corporation",
    phone: "(760) 721-1706",
    description: "Assertive Community Treatment for North Coastal region",
    category: "mobile-team",
    region: "North Coastal",
  },
  {
    id: "a3",
    name: "Strengths-Based Case Management",
    organization: "County of San Diego BHS",
    phone: "(619) 563-2700",
    description:
      "Strengths-based case management services for mental health clients",
    category: "mobile-team",
    region: "San Diego County",
  },

  // Police Departments
  {
    id: "p1",
    name: "San Diego Police - Central Division",
    phone: "(619) 744-9500",
    description:
      "Non-emergency police services for downtown and central San Diego",
    category: "police",
    region: "Central San Diego",
  },
  {
    id: "p2",
    name: "San Diego Police - Northern Division",
    phone: "(858) 538-8000",
    description: "Non-emergency police services for northern San Diego",
    category: "police",
    region: "Northern San Diego",
  },
  {
    id: "p3",
    name: "San Diego Police - Eastern Division",
    phone: "(619) 527-3500",
    description: "Non-emergency police services for eastern San Diego",
    category: "police",
    region: "Eastern San Diego",
  },
  {
    id: "p4",
    name: "Chula Vista Police Department",
    phone: "(619) 691-5151",
    description: "Non-emergency police services for Chula Vista",
    category: "police",
    region: "South Bay",
  },
  {
    id: "p5",
    name: "Escondido Police Department",
    phone: "(760) 839-4722",
    description: "Non-emergency police services for Escondido",
    category: "police",
    region: "North County",
  },

  // Clinics
  {
    id: "cl1",
    name: "Jane Westin Clinic",
    organization: "County Psychiatric Hospital",
    phone: "(619) 563-2700",
    description: "Same-day psychiatric medication services",
    category: "clinic",
    region: "San Diego",
  },
  {
    id: "cl2",
    name: "CRF Behavioral Health - North Coastal",
    organization: "County of San Diego",
    phone: "(760) 967-4475",
    description: "Behavioral health clinic serving North Coastal region",
    category: "clinic",
    region: "North Coastal",
  },
  {
    id: "cl3",
    name: "CRF Behavioral Health - East Region",
    organization: "County of San Diego",
    phone: "(619) 401-5500",
    description: "Behavioral health clinic serving East County",
    category: "clinic",
    region: "East County",
  },
];

export const safetyTips = [
  {
    id: "s1",
    title: "Always inform your supervisor of your location",
    description:
      "Share your schedule and check in regularly when conducting field visits.",
  },
  {
    id: "s2",
    title: "Trust your instincts",
    description:
      "If a situation feels unsafe, remove yourself and call for backup or police assistance.",
  },
  {
    id: "s3",
    title: "Maintain professional boundaries",
    description:
      "Keep appropriate physical distance and avoid meeting clients in isolated locations.",
  },
  {
    id: "s4",
    title: "De-escalation techniques",
    description:
      "Use calm voice, active listening, and non-threatening body language. Avoid arguing or making sudden movements.",
  },
  {
    id: "s5",
    title: "Know your emergency contacts",
    description:
      "Have PERT, MCRT, and local police numbers readily accessible on your phone.",
  },
  {
    id: "s6",
    title: "Trauma-informed approach",
    description:
      "Recognize that many clients have experienced trauma. Be patient, respectful, and avoid triggering language.",
  },
  {
    id: "s7",
    title: "When to call PERT vs. Police",
    description:
      "PERT: Mental health crisis without violence. Police: Immediate danger, weapons, or violent behavior. MCRT: Mobile crisis support for assessment.",
  },
  {
    id: "s8",
    title: "Document safety concerns",
    description:
      "Record any threatening behavior or safety incidents in your notes for future reference and team awareness.",
  },
];

