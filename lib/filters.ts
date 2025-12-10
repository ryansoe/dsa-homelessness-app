import { Resource, ResourceType, BedStatus } from "./types";

export interface ResourceFilters {
  searchQuery?: string;
  types?: ResourceType[];
  bedStatus?: BedStatus[];
  acceptsWalkIns?: boolean;
  acceptsCoOccurring?: boolean;
  requiresSobriety?: boolean;
  openNow?: boolean;
  maxDistance?: number;
  genderRestrictions?: string[];
}

export function filterResources(
  resources: Resource[],
  filters: ResourceFilters
): Resource[] {
  let filtered = [...resources];

  // Search query - searches name, description, tags
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        r.type.toLowerCase().includes(query)
    );
  }

  // Resource types
  if (filters.types && filters.types.length > 0) {
    filtered = filtered.filter((r) => filters.types!.includes(r.type));
  }

  // Bed status
  if (filters.bedStatus && filters.bedStatus.length > 0) {
    filtered = filtered.filter(
      (r) => r.bedStatus && filters.bedStatus!.includes(r.bedStatus)
    );
  }

  // Walk-ins
  if (filters.acceptsWalkIns !== undefined) {
    filtered = filtered.filter(
      (r) => r.acceptsWalkIns === filters.acceptsWalkIns
    );
  }

  // Co-occurring disorders
  if (filters.acceptsCoOccurring !== undefined) {
    filtered = filtered.filter(
      (r) => r.acceptsCoOccurring === filters.acceptsCoOccurring
    );
  }

  // Sobriety requirement
  if (filters.requiresSobriety !== undefined) {
    filtered = filtered.filter(
      (r) => r.requiresSobriety === filters.requiresSobriety
    );
  }

  // Open now (simplified - just checks if status is "open")
  if (filters.openNow) {
    filtered = filtered.filter((r) => r.status === "open");
  }

  // Distance
  if (filters.maxDistance !== undefined && filters.maxDistance > 0) {
    filtered = filtered.filter(
      (r) => r.distance !== undefined && r.distance <= filters.maxDistance!
    );
  }

  // Gender restrictions
  if (filters.genderRestrictions && filters.genderRestrictions.length > 0) {
    filtered = filtered.filter(
      (r) =>
        !r.genderRestrictions ||
        r.genderRestrictions === "none" ||
        filters.genderRestrictions!.includes(r.genderRestrictions)
    );
  }

  return filtered;
}

export function sortResources(
  resources: Resource[],
  sortBy: "distance" | "name" | "updated" | "beds"
): Resource[] {
  const sorted = [...resources];

  switch (sortBy) {
    case "distance":
      return sorted.sort((a, b) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });

    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "updated":
      return sorted.sort(
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );

    case "beds":
      return sorted.sort((a, b) => {
        if (!a.bedsAvailable) return 1;
        if (!b.bedsAvailable) return -1;
        return b.bedsAvailable - a.bedsAvailable;
      });

    default:
      return sorted;
  }
}

// Mock LLM search with pre-baked responses
export function mockLLMSearch(query: string): {
  results: Resource[];
  explanation: string;
} {
  const lowerQuery = query.toLowerCase();

  // Pre-baked intelligent responses
  if (
    lowerQuery.includes("rehab") &&
    (lowerQuery.includes("co-occurring") ||
      lowerQuery.includes("mental health"))
  ) {
    return {
      results: [], // Will be filtered from main list
      explanation:
        "Found facilities accepting clients with co-occurring substance use and mental health disorders. Results prioritized by availability and low-barrier entry.",
    };
  }

  if (lowerQuery.includes("tonight") || lowerQuery.includes("emergency")) {
    return {
      results: [],
      explanation:
        "Showing emergency shelters with immediate availability and 24/7 access. Walk-ins accepted.",
    };
  }

  if (lowerQuery.includes("food") || lowerQuery.includes("meal")) {
    return {
      results: [],
      explanation:
        "Food resources sorted by proximity. Most locations accept walk-ins and don't require ID.",
    };
  }

  return {
    results: [],
    explanation:
      "Results ranked by relevance using AI analysis of your query and current resource availability.",
  };
}



