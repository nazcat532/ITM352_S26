import React from 'react';
import { AlertTriangle, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserNotRegisteredError = () => {
  const handleLogout = () => {
    // Logic to clear session/redirect to login
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full p-8 bg-card rounded-xl shadow-xl border border-border">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-orange-100 dark:bg-orange-950/30">
            <AlertTriangle className="w-10 h-10 text-orange-600 dark:text-orange-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">Access Restricted</h1>
          
          <p className="text-muted-foreground mb-8">
            Your account is authenticated, but you aren't registered in our system yet.
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-xl text-sm text-left border border-border">
              <p className="font-semibold mb-2">Next steps:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Contact your administrator to whitelist your email.
                </li>
                <li className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Ensure you used your authorized organization email.
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex-1 gap-2 rounded-lg"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Switch Account
              </Button>
              <Button 
                className="flex-1 gap-2 rounded-lg"
                asChild
              >
                <a href="mailto:admin@personalizedgymroutine.app">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;