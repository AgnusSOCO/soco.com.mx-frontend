import { useEffect } from "react";
import AnalyticsDashboardEnhanced from "./AnalyticsDashboardEnhanced";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Lock } from "lucide-react";

export default function ProtectedAnalyticsDashboard() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simple password protection (in production, use proper authentication)
  const DASHBOARD_PASSWORD = "soco2024analytics";

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem("analytics_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("analytics_authenticated", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Analytics Dashboard</CardTitle>
            <CardDescription className="text-center">
              Enter password to access analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter dashboard password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Access Dashboard
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Demo password: soco2024analytics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AnalyticsDashboardEnhanced />;
}

