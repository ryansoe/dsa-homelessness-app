"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Star,
  Plus,
  Map as MapIcon,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockResources } from "@/data/resources";
import { mockClients } from "@/data/mock-data";
import {
  filterResources,
  sortResources,
  mockLLMSearch,
  ResourceFilters,
} from "@/lib/filters";
import { Resource, ResourceType } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("client");
  const client = clientId ? mockClients.find((c) => c.id === clientId) : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [showLLMExplanation, setShowLLMExplanation] = useState(false);
  const [llmExplanation, setLLMExplanation] = useState("");
  const [filters, setFilters] = useState<ResourceFilters>({});
  const [sortBy, setSortBy] = useState<
    "distance" | "name" | "updated" | "beds"
  >("distance");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [showMap, setShowMap] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredResources = useMemo(() => {
    const filtered = filterResources(mockResources, {
      ...filters,
      searchQuery,
    });
    return sortResources(filtered, sortBy);
  }, [filters, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 3) {
      const { explanation } = mockLLMSearch(query);
      setLLMExplanation(explanation);
      setShowLLMExplanation(true);
      setTimeout(() => setShowLLMExplanation(false), 5000);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const getBedStatusColor = (status?: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-300";
      case "limited":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "full":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Client Context Header */}
      {client && (
        <div className="bg-card border-b px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/clients/${client.id}`)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                Resource Search for {client.name}
              </h2>
              <div className="flex gap-2 mt-1">
                {client.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {!client && (
        <div className="bg-card border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">Service Search</h2>
          <p className="text-muted-foreground text-sm">
            Search for resources across San Diego County
          </p>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search Section */}
          <Card>
            <CardHeader>
              <CardTitle>Intelligent Resource Search</CardTitle>
              <CardDescription>
                Use natural language to find resources. Try: "rehab with
                co-occurring mental health tonight"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for resources using natural language..."
                  className="pl-10 text-base h-12"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {showLLMExplanation && (
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Badge className="mt-0.5">AI-Ranked</Badge>
                    <p className="text-sm">{llmExplanation}</p>
                  </div>
                </div>
              )}

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Resources</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">
                          Crisis Filters
                        </Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="walkIns"
                              checked={filters.acceptsWalkIns}
                              onCheckedChange={(checked) =>
                                setFilters({
                                  ...filters,
                                  acceptsWalkIns: checked as boolean,
                                })
                              }
                            />
                            <Label htmlFor="walkIns" className="font-normal">
                              Accepts walk-ins
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="coOccurring"
                              checked={filters.acceptsCoOccurring}
                              onCheckedChange={(checked) =>
                                setFilters({
                                  ...filters,
                                  acceptsCoOccurring: checked as boolean,
                                })
                              }
                            />
                            <Label
                              htmlFor="coOccurring"
                              className="font-normal"
                            >
                              Accepts co-occurring SUD + MH
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="noSobriety"
                              checked={filters.requiresSobriety === false}
                              onCheckedChange={(checked) =>
                                setFilters({
                                  ...filters,
                                  requiresSobriety: checked ? false : undefined,
                                })
                              }
                            />
                            <Label htmlFor="noSobriety" className="font-normal">
                              No sobriety requirement
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="openNow"
                              checked={filters.openNow}
                              onCheckedChange={(checked) =>
                                setFilters({
                                  ...filters,
                                  openNow: checked as boolean,
                                })
                              }
                            />
                            <Label htmlFor="openNow" className="font-normal">
                              Open now
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-base font-semibold">
                          Resource Type
                        </Label>
                        <div className="space-y-2">
                          {[
                            "shelter",
                            "rehab",
                            "food",
                            "medical",
                            "mental-health",
                            "housing",
                          ].map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={type}
                                checked={filters.types?.includes(
                                  type as ResourceType
                                )}
                                onCheckedChange={(checked) => {
                                  const types = filters.types || [];
                                  setFilters({
                                    ...filters,
                                    types: checked
                                      ? [...types, type as ResourceType]
                                      : types.filter((t) => t !== type),
                                  });
                                }}
                              />
                              <Label
                                htmlFor={type}
                                className="font-normal capitalize"
                              >
                                {type.replace("-", " ")}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setFilters({})}
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>

                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="beds">Bed Availability</SelectItem>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                  className="lg:hidden"
                >
                  <MapIcon className="h-4 w-4 mr-2" />
                  {showMap ? "Hide" : "Show"} Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {filteredResources.length} Resources Found
              </h3>
            </div>

            {filteredResources.map((resource) => (
              <Card
                key={resource.id}
                className={cn(
                  "cursor-pointer transition-colors hover:bg-accent/50",
                  selectedResource?.id === resource.id && "ring-2 ring-primary"
                )}
                onClick={() => {
                  setSelectedResource(resource);
                  router.push(`/resources/${resource.id}`);
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-2">
                        <h4 className="font-semibold text-lg">
                          {resource.name}
                        </h4>
                        <Badge variant="outline" className="capitalize">
                          {resource.type.replace("-", " ")}
                        </Badge>
                        {resource.bedStatus && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "capitalize",
                              getBedStatusColor(resource.bedStatus)
                            )}
                          >
                            {resource.bedStatus}
                            {resource.bedsAvailable !== undefined &&
                              ` (${resource.bedsAvailable}/${resource.bedsTotal})`}
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {resource.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {resource.tags.slice(0, 4).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {resource.distance
                            ? `${resource.distance} mi`
                            : "N/A"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {resource.phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(resource.id);
                        }}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            favorites.has(resource.id) &&
                              "fill-yellow-400 text-yellow-400"
                          )}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Plan
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `tel:${resource.phone}`;
                        }}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Panel */}
        <div
          className={cn(
            "lg:w-[500px] border-l bg-muted/30",
            showMap ? "block" : "hidden lg:block"
          )}
        >
          <div className="h-full p-6 flex flex-col items-center justify-center text-center">
            <MapIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Map View</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Interactive map showing resource locations would appear here. Pins
              would sync with the selected resource in the list.
            </p>
            {selectedResource && (
              <Card className="mt-4 w-full">
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{selectedResource.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedResource.address}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
