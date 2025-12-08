"use client";

import { Lock, Shield, User, Bell, Database, LogOut, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account, security, and application preferences
          </p>
        </div>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Account Information</CardTitle>
            </div>
            <CardDescription>
              Your profile and organization details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Name</Label>
                <p className="font-medium">Case Manager</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Role</Label>
                <p className="font-medium">Case Manager</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email</Label>
                <p className="font-medium">case.manager@example.org</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">
                  Organization
                </Label>
                <p className="font-medium">San Diego County HHSA</p>
              </div>
            </div>

            <Separator />

            <Button variant="outline">Edit Profile</Button>
          </CardContent>
        </Card>

        {/* Security & Authentication */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security & Authentication</CardTitle>
            </div>
            <CardDescription>
              Manage your security settings and authentication methods
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Badge variant="default" className="bg-green-600">
                Enabled
              </Badge>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Session Timeout</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically log out after 30 minutes of inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Manage 2FA Devices
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <CardTitle>Data & Privacy</CardTitle>
            </div>
            <CardDescription>
              How your data is protected and managed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Encrypted Storage</h4>
                  <p className="text-sm text-muted-foreground">
                    All client notes and sensitive data are encrypted at rest
                    using AES-256 encryption. Data is also encrypted in transit
                    using TLS 1.3.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">HIPAA Compliance</h4>
                  <p className="text-sm text-muted-foreground">
                    This platform is designed to meet HIPAA requirements for
                    protected health information (PHI). All access is logged and
                    auditable. Business Associate Agreements (BAA) are in place
                    with all service providers.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Access Controls</h4>
                  <p className="text-sm text-muted-foreground">
                    Role-based access control (RBAC) ensures users only see data
                    they're authorized to access. All data access is logged with
                    timestamps and user identifiers for audit purposes.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Database className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">
                    Client data is retained according to organizational policies
                    and legal requirements. Automated backups are performed
                    daily and stored in geographically distributed, encrypted
                    locations.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive alerts and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reminder Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications for upcoming tasks and follow-ups
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Resource Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when resource availability changes
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Daily summary of your activities and reminders
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Prototype Notice */}
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="p-4">
            <div className="text-sm text-yellow-900">
              <p className="font-medium mb-1">Prototype Demo</p>
              <p className="text-xs">
                This settings page demonstrates the security and privacy
                features that would be implemented in a production system.
                Actual implementation would include integration with identity
                providers (Auth0, Okta), encryption key management services, and
                comprehensive audit logging infrastructure.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardContent className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => {
                toast.success("Signed out successfully");
                setTimeout(() => {
                  window.location.href = "/";
                }, 500);
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
