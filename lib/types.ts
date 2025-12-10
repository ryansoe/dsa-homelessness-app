export type ResourceType =
  | "shelter"
  | "food"
  | "clothing"
  | "hygiene"
  | "medical"
  | "mental-health"
  | "rehab"
  | "transportation"
  | "employment"
  | "housing"
  | "legal"
  | "other";

export type BedStatus = "available" | "limited" | "full" | "unknown";

export type ResourceStatus = "open" | "closed" | "by-appointment";

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  description: string;
  address: string;
  phone: string;
  website?: string;
  email?: string;
  hours?: string;

  // Capacity & Availability
  bedStatus?: BedStatus;
  bedsAvailable?: number;
  bedsTotal?: number;
  status: ResourceStatus;

  // Eligibility & Requirements
  acceptsWalkIns: boolean;
  requiresSobriety: boolean;
  acceptsCoOccurring: boolean;
  genderRestrictions?: "male" | "female" | "none";
  ageRestrictions?: string;
  insuranceAccepted?: string[];

  // Additional Info
  curfew?: string;
  tags: string[];
  distance?: number; // in miles
  coordinates?: { lat: number; lng: number };
  lastUpdated: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  age: number;
  gender: string;
  tags: string[];
  lastContact: string;
}

export interface Note {
  id: string;
  clientId?: string;
  title: string;
  content: string;
  purpose?: string;
  intervention?: string;
  followUp?: string;
  createdAt: string;
  updatedAt: string;
  encrypted: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  relatedTo?: {
    type: "resource" | "client" | "note";
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface PlanItem {
  id: string;
  resourceId: string;
  resource: Resource;
  timeframe: "near" | "short" | "long";
  targetDate?: string;
  status: "planned" | "in-progress" | "completed";
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  organization?: string;
  phone: string;
  description: string;
  category: "crisis" | "police" | "mobile-team" | "hotline" | "clinic";
  region?: string;
}



