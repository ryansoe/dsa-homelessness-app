"use client";

import { useState } from "react";
import { Phone, AlertTriangle, Shield, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { emergencyContacts, safetyTips } from "@/data/contacts";
import { toast } from "sonner";

export default function SafetyPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = emergencyContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const crisisContacts = filteredContacts.filter((c) => c.category === "crisis");
  const hotlineContacts = filteredContacts.filter((c) => c.category === "hotline");
  const mobileTeamContacts = filteredContacts.filter((c) => c.category === "mobile-team");
  const policeContacts = filteredContacts.filter((c) => c.category === "police");
  const clinicContacts = filteredContacts.filter((c) => c.category === "clinic");

  const handleCall = (phone: string, name: string) => {
    toast.success(`Calling ${name}`, {
      description: phone,
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Safety & Emergency Resources</h1>
            <p className="text-muted-foreground">
              Quick access to crisis lines, emergency contacts, and safety guidelines for field work
            </p>
          </div>
        </div>

        {/* Emergency Banner */}
        <Card className="border-red-300 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Emergency Situations</h3>
                <p className="text-sm text-red-800 mb-3">
                  If you or your client are in immediate danger, call 911 first. Use the resources
                  below for crisis support and mental health emergencies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    asChild
                  >
                    <a href="tel:911">
                      <Phone className="h-4 w-4 mr-2" />
                      Call 911
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white"
                    asChild
                  >
                    <a href="tel:988">
                      <Phone className="h-4 w-4 mr-2" />
                      988 Suicide & Crisis Lifeline
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white"
                    asChild
                  >
                    <a href="tel:8887247240">
                      <Phone className="h-4 w-4 mr-2" />
                      SD Access & Crisis Line
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts by name, organization, or type..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contacts Tabs */}
        <Tabs defaultValue="crisis" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="crisis">
              Crisis Lines
              <Badge variant="secondary" className="ml-2">
                {crisisContacts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="mobile">
              Mobile Teams
              <Badge variant="secondary" className="ml-2">
                {mobileTeamContacts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="hotlines">
              Hotlines
              <Badge variant="secondary" className="ml-2">
                {hotlineContacts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="police">
              Police
              <Badge variant="secondary" className="ml-2">
                {policeContacts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="clinics">
              Clinics
              <Badge variant="secondary" className="ml-2">
                {clinicContacts.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crisis" className="space-y-3 mt-6">
            <ContactList contacts={crisisContacts} onCall={handleCall} />
          </TabsContent>

          <TabsContent value="mobile" className="space-y-3 mt-6">
            <ContactList contacts={mobileTeamContacts} onCall={handleCall} />
          </TabsContent>

          <TabsContent value="hotlines" className="space-y-3 mt-6">
            <ContactList contacts={hotlineContacts} onCall={handleCall} />
          </TabsContent>

          <TabsContent value="police" className="space-y-3 mt-6">
            <ContactList contacts={policeContacts} onCall={handleCall} />
          </TabsContent>

          <TabsContent value="clinics" className="space-y-3 mt-6">
            <ContactList contacts={clinicContacts} onCall={handleCall} />
          </TabsContent>
        </Tabs>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips & Best Practices</CardTitle>
            <CardDescription>
              Essential guidelines for case managers working in the field
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {safetyTips.map((tip) => (
                <AccordionItem key={tip.id} value={tip.id}>
                  <AccordionTrigger className="text-left">
                    {tip.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {tip.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* When to Call Which Team */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Decision Guide: Which Team to Call?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Call PERT</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Mental health crisis</li>
                  <li>No immediate violence</li>
                  <li>Client is cooperative</li>
                  <li>Needs assessment</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Call Police (911)</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Immediate danger</li>
                  <li>Weapons present</li>
                  <li>Violent behavior</li>
                  <li>Criminal activity</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-primary">Call MCRT</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Mobile crisis support</li>
                  <li>On-site assessment</li>
                  <li>De-escalation needed</li>
                  <li>Resource connection</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ContactList({
  contacts,
  onCall,
}: {
  contacts: any[];
  onCall: (phone: string, name: string) => void;
}) {
  if (contacts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No contacts found
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {contacts.map((contact) => (
        <Card key={contact.id} className="hover:bg-accent/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start gap-2">
                  <h4 className="font-semibold text-lg">{contact.name}</h4>
                  {contact.region && (
                    <Badge variant="secondary" className="text-xs">
                      {contact.region}
                    </Badge>
                  )}
                </div>

                {contact.organization && (
                  <p className="text-sm text-muted-foreground">{contact.organization}</p>
                )}

                <p className="text-sm text-muted-foreground">{contact.description}</p>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-primary font-medium hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => onCall(contact.phone, contact.name)}
                asChild
              >
                <a href={`tel:${contact.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}



