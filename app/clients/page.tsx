"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, User, Calendar, FileText, Bell, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockClients } from "@/data/mock-data";
import { mockNotes, mockReminders } from "@/data/mock-data";
import { cn } from "@/lib/utils";

export default function ClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return mockClients;
    
    const query = searchQuery.toLowerCase();
    return mockClients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        client.gender.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const getClientStats = (clientId: string) => {
    const notes = mockNotes.filter((n) => n.clientId === clientId).length;
    const reminders = mockReminders.filter(
      (r) => r.relatedTo?.type === "client" && r.relatedTo.id === clientId && !r.completed
    ).length;
    const overdueReminders = mockReminders.filter(
      (r) =>
        r.relatedTo?.type === "client" &&
        r.relatedTo.id === clientId &&
        !r.completed &&
        new Date(r.dueDate) < new Date()
    ).length;

    return { notes, reminders, overdueReminders };
  };

  const getStatusColor = (tags: string[]) => {
    if (tags.some((t) => t.toLowerCase().includes("urgent") || t.toLowerCase().includes("crisis"))) {
      return "border-red-300 bg-red-50";
    }
    if (tags.some((t) => t.toLowerCase().includes("high-acuity"))) {
      return "border-yellow-300 bg-yellow-50";
    }
    if (tags.some((t) => t.toLowerCase().includes("stable"))) {
      return "border-green-300 bg-green-50";
    }
    return "";
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Clients</h1>
            <p className="text-muted-foreground">
              Manage your caseload and track client progress
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold">{mockClients.length}</p>
                </div>
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Acuity</p>
                  <p className="text-2xl font-bold">
                    {mockClients.filter((c) =>
                      c.tags.some((t) => t.toLowerCase().includes("high-acuity") || t.toLowerCase().includes("urgent"))
                    ).length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Reminders</p>
                  <p className="text-2xl font-bold">
                    {mockReminders.filter((r) => !r.completed && r.relatedTo?.type === "client").length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Notes</p>
                  <p className="text-2xl font-bold">
                    {mockNotes.filter((n) => n.clientId).length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients by name, tags, or demographics..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Client List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const stats = getClientStats(client.id);
            return (
              <Card
                key={client.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  getStatusColor(client.tags)
                )}
                onClick={() => router.push(`/clients/${client.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{client.name}</CardTitle>
                        <CardDescription>
                          {client.age} • {client.gender}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {client.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={
                          tag.toLowerCase().includes("urgent") || tag.toLowerCase().includes("high-acuity")
                            ? "destructive"
                            : tag.toLowerCase().includes("stable")
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Notes</p>
                      <p className="text-lg font-semibold">{stats.notes}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Reminders</p>
                      <p className="text-lg font-semibold">
                        {stats.reminders}
                        {stats.overdueReminders > 0 && (
                          <span className="text-red-600 ml-1">!</span>
                        )}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Last Contact</p>
                      <p className="text-xs font-medium">
                        {new Date(client.lastContact).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Last Contact */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="h-3 w-3" />
                    <span>
                      Last contact: {new Date(client.lastContact).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredClients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No clients found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}



