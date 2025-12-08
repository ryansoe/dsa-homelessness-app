"use client";

import { useState } from "react";
import { Plus, Mic, Lock, Clock, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockNotes } from "@/data/mock-data";
import { Note } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedPurpose, setEditedPurpose] = useState("");
  const [editedIntervention, setEditedIntervention] = useState("");
  const [editedFollowUp, setEditedFollowUp] = useState("");

  const handleSelectNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(false);
    setEditedContent(note.content);
    setEditedPurpose(note.purpose || "");
    setEditedIntervention(note.intervention || "");
    setEditedFollowUp(note.followUp || "");
  };

  const handleEditNote = () => {
    if (!selectedNote) return;
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (!selectedNote) return;

    const updatedNote: Note = {
      ...selectedNote,
      content: editedContent,
      purpose: editedPurpose,
      intervention: editedIntervention,
      followUp: editedFollowUp,
      updatedAt: new Date().toISOString(),
    };

    setNotes(notes.map((n) => (n.id === selectedNote.id ? updatedNote : n)));
    setSelectedNote(updatedNote);
    setIsEditing(false);
    toast.success("Note saved", {
      description: "Your changes have been saved and encrypted.",
    });
  };

  const handleCreateNote = (title: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      title,
      content: "",
      purpose: "",
      intervention: "",
      followUp: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      encrypted: true,
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
    setEditedContent("");
    setEditedPurpose("");
    setEditedIntervention("");
    setEditedFollowUp("");
    toast.success("New note created");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes[0] || null);
    }
    toast.success("Note deleted");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Notes List Sidebar */}
      <div className="lg:w-80 border-b lg:border-b-0 lg:border-r bg-card overflow-y-auto">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Case Notes</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                  <DialogDescription>
                    Enter a title for your new case note
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="title">Note Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Initial Assessment - John D."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.currentTarget.value) {
                          handleCreateNote(e.currentTarget.value);
                          e.currentTarget.value = "";
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      const input = document.getElementById("title") as HTMLInputElement;
                      if (input.value) {
                        handleCreateNote(input.value);
                        input.value = "";
                      }
                    }}
                  >
                    Create Note
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>All notes are encrypted</span>
          </div>
        </div>

        <div className="divide-y">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "p-4 cursor-pointer hover:bg-accent transition-colors",
                selectedNote?.id === note.id && "bg-accent"
              )}
              onClick={() => handleSelectNote(note)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm line-clamp-1">{note.title}</h3>
                {note.encrypted && <Lock className="h-3 w-3 text-muted-foreground flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDate(note.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedNote ? (
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Note Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{selectedNote.title}</h1>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Created: {formatDate(selectedNote.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Updated: {formatDate(selectedNote.updatedAt)}
                  </div>
                  {selectedNote.encrypted && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Encrypted
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {!isEditing ? (
                  <>
                    <Button onClick={handleEditNote}>Edit</Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteNote(selectedNote.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleSaveNote}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Template Tabs */}
            <Tabs defaultValue="structured" className="w-full">
              <TabsList>
                <TabsTrigger value="structured">Structured Template</TabsTrigger>
                <TabsTrigger value="freeform">Free-form</TabsTrigger>
              </TabsList>

              <TabsContent value="structured" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Purpose / Type of Meeting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedPurpose}
                        onChange={(e) => setEditedPurpose(e.target.value)}
                        placeholder="e.g., Initial intake, Follow-up visit, Crisis intervention..."
                        rows={2}
                      />
                    ) : (
                      <p className="text-muted-foreground">
                        {selectedNote.purpose || "No purpose specified"}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Intervention / Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedIntervention}
                        onChange={(e) => setEditedIntervention(e.target.value)}
                        placeholder="Document interventions, client progress, observations..."
                        rows={4}
                      />
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedNote.intervention || "No intervention documented"}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Follow-up Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedFollowUp}
                        onChange={(e) => setEditedFollowUp(e.target.value)}
                        placeholder="Next steps, scheduled follow-ups, action items..."
                        rows={3}
                      />
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedNote.followUp || "No follow-up steps specified"}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="freeform" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Note Content</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled
                        className="flex items-center gap-2"
                      >
                        <Mic className="h-4 w-4" />
                        Dictation (Demo)
                      </Button>
                    </div>
                    <CardDescription>
                      Free-form note taking. Dictation feature would enable voice-to-text.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="Type your notes here..."
                        rows={12}
                        className="font-mono text-sm"
                      />
                    ) : (
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedNote.content || "No content"}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* HIPAA Notice */}
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-primary mb-1">HIPAA-Compliant Storage</p>
                    <p className="text-muted-foreground">
                      All notes are encrypted at rest and in transit. Access is logged and auditable.
                      Notes sync automatically when connected.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-6">
            <div>
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Note Selected</h3>
              <p className="text-muted-foreground">
                Select a note from the list or create a new one to get started.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


