
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, LogOutIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const ApplicationSuccess = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    // Clear user session
    sessionStorage.removeItem("currentUser");
    toast.success("Signed out successfully");
    navigate("/");
  };
  
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12">
        <Card className="shadow-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Application Submitted!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Your scholarship application has been successfully submitted. We will review your
              application and get back to you via email.
            </p>
            <div className="bg-muted rounded-md p-4 text-sm">
              <p className="font-medium">What happens next?</p>
              <ol className="mt-2 text-left list-decimal pl-5 space-y-1">
                <li>Our team will review your application and documents</li>
                <li>If eligible, you will receive a confirmation email within 7 working days</li>
                <li>You may be contacted for additional information or interviews</li>
                <li>Final selection results will be announced via email and a comprehensive list will be available on the website</li>
              </ol>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link to="/" className="w-full">
              <Button className="w-full">Return to Home</Button>
            </Link>
            <Link to="/gallery" className="w-full">
              <Button variant="outline" className="w-full">View Scholarship Gallery</Button>
            </Link>
            <Link to="/students" className="w-full">
              <Button variant="outline" className="w-full">View Student Profiles</Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2" 
              onClick={handleSignOut}
            >
              <LogOutIcon className="h-4 w-4" /> Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ApplicationSuccess;
