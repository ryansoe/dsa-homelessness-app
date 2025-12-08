"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Globe, MapPin, Clock, Star, Plus, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockResources } from "@/data/resources";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ResourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const resource = mockResources.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="p-6">
        <p>Resource not found</p>
      </div>
    );
  }

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

  // Mock related resources based on type
  const relatedResources = mockResources
    .filter((r) => r.type === resource.type && r.id !== resource.id)
    .slice(0, 3);

  const handleAddToPlan = () => {
    toast.success("Added to plan", {
      description: `${resource.name} has been added to your client's plan.`,
    });
  };

  const handleCopyToNotes = () => {
    toast.success("Copied to notes", {
      description: "Resource information copied to your notes.",
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{resource.name}</h1>
              <Badge variant="outline" className="capitalize">
                {resource.type.replace("-", " ")}
              </Badge>
            </div>
            <p className="text-muted-foreground">{resource.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleAddToPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Plan
          </Button>
          <Button variant="outline" onClick={handleCopyToNotes}>
            <Copy className="h-4 w-4 mr-2" />
            Copy to Notes
          </Button>
          <Button variant="outline" asChild>
            <a href={`tel:${resource.phone}`}>
              <Phone className="h-4 w-4 mr-2" />
              Call
            </a>
          </Button>
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Favorite
          </Button>
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            View on Map
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">{resource.address}</p>
                    {resource.distance && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {resource.distance} miles away
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href={`tel:${resource.phone}`}
                      className="text-primary hover:underline"
                    >
                      {resource.phone}
                    </a>
                  </div>
                </div>

                {resource.website && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Website</p>
                        <a
                          href={resource.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          {resource.website}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {resource.hours && (
                  <>
                    <Separator />
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">Hours</p>
                        <p className="text-muted-foreground">{resource.hours}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Capacity & Availability */}
            {resource.bedStatus && (
              <Card>
                <CardHeader>
                  <CardTitle>Capacity & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Bed Status</span>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getBedStatusColor(resource.bedStatus))}
                    >
                      {resource.bedStatus}
                    </Badge>
                  </div>

                  {resource.bedsAvailable !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Beds Available</span>
                      <span className="text-lg font-semibold">
                        {resource.bedsAvailable} / {resource.bedsTotal}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status</span>
                    <Badge variant={resource.status === "open" ? "default" : "secondary"}>
                      {resource.status}
                    </Badge>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last updated: {new Date(resource.lastUpdated).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Eligibility & Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Walk-ins</p>
                    <Badge variant={resource.acceptsWalkIns ? "default" : "secondary"}>
                      {resource.acceptsWalkIns ? "Accepted" : "Not accepted"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Co-occurring Disorders</p>
                    <Badge variant={resource.acceptsCoOccurring ? "default" : "secondary"}>
                      {resource.acceptsCoOccurring ? "Accepted" : "Not accepted"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Sobriety Required</p>
                    <Badge variant={resource.requiresSobriety ? "secondary" : "default"}>
                      {resource.requiresSobriety ? "Yes" : "No"}
                    </Badge>
                  </div>

                  {resource.genderRestrictions && (
                    <div>
                      <p className="text-sm font-medium mb-1">Gender Restrictions</p>
                      <Badge variant="outline" className="capitalize">
                        {resource.genderRestrictions}
                      </Badge>
                    </div>
                  )}
                </div>

                {resource.ageRestrictions && (
                  <div>
                    <p className="text-sm font-medium mb-1">Age Restrictions</p>
                    <p className="text-muted-foreground">{resource.ageRestrictions}</p>
                  </div>
                )}

                {resource.curfew && (
                  <div>
                    <p className="text-sm font-medium mb-1">Curfew</p>
                    <p className="text-muted-foreground">{resource.curfew}</p>
                  </div>
                )}

                {resource.insuranceAccepted && resource.insuranceAccepted.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Insurance Accepted</p>
                    <div className="flex flex-wrap gap-1.5">
                      {resource.insuranceAccepted.map((insurance) => (
                        <Badge key={insurance} variant="secondary">
                          {insurance}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            {resource.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{resource.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Related Resources</CardTitle>
                <CardDescription>
                  AI-suggested similar resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedResources.map((related) => (
                  <div
                    key={related.id}
                    className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => router.push(`/resources/${related.id}`)}
                  >
                    <p className="font-medium text-sm">{related.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {related.description}
                    </p>
                    {related.distance && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {related.distance} miles away
                      </p>
                    )}
                  </div>
                ))}

                {relatedResources.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No related resources found.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


