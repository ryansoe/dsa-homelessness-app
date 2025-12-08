"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Calendar,
  FileText,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockClients, mockNotes } from "@/data/mock-data";

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const client = mockClients.find((c) => c.id === id);

  if (!client) {
    return (
      <div className="p-6">
        <p>Client not found</p>
      </div>
    );
  }

  const clientNotes = mockNotes.filter((n) => n.clientId === id);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{client.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{client.age} years old</span>
              <span>•</span>
              <span>{client.gender}</span>
              <span>•</span>
              <span>
                Last contact:{" "}
                {new Date(client.lastContact).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {client.tags.map((tag) => (
            <Badge
              key={tag}
              variant={
                tag.toLowerCase().includes("urgent") ||
                tag.toLowerCase().includes("high-acuity")
                  ? "destructive"
                  : tag.toLowerCase().includes("stable")
                  ? "default"
                  : "secondary"
              }
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold">{clientNotes.length}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Days Since Contact
                  </p>
                  <p className="text-2xl font-bold">
                    {Math.floor(
                      (new Date().getTime() -
                        new Date(client.lastContact).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => router.push(`/notes?client=${id}`)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(`/?client=${id}`)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search Resources
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notes">
              Notes
              <Badge variant="secondary" className="ml-2">
                {clientNotes.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Profile</CardTitle>
                <CardDescription>
                  Basic information and demographics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{client.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium">{client.age}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gender</p>
                    <p className="font-medium">{client.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Contact
                    </p>
                    <p className="font-medium">
                      {new Date(client.lastContact).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest notes and reminders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {clientNotes.slice(0, 3).map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                    onClick={() => router.push(`/notes?note=${note.id}`)}
                  >
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{note.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {clientNotes.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No notes yet
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-3 mt-6">
            {clientNotes.map((note) => (
              <Card
                key={note.id}
                className="cursor-pointer hover:bg-accent/50"
                onClick={() => router.push(`/notes?note=${note.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{note.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                        {note.encrypted && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="text-xs">
                              Encrypted
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {clientNotes.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start documenting your interactions with this client
                  </p>
                  <Button onClick={() => router.push(`/notes?client=${id}`)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Note
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>
                  Chronological history of interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...clientNotes]
                    .sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    )
                    .slice(0, 10)
                    .map((note) => (
                      <div key={note.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <div className="h-full w-px bg-border" />
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-medium text-sm">{note.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
