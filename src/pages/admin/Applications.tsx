
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getApplications, getCurrentUser, updateApplicationStatus } from "@/services/api";
import { ApplicationForm } from "@/types";
import { toast } from "@/components/ui/sonner";

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<ApplicationForm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/admin");
      return;
    }

    const fetchApplications = async () => {
      try {
        const data = await getApplications();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  const filteredApplications = applications.filter(app => 
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.lga.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewApplication = (application: ApplicationForm) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = async (id: string | undefined, status: "pending" | "approved" | "rejected") => {
    if (!id) return;

    try {
      await updateApplicationStatus(id, status);
      const updatedApplications = applications.map(app => 
        app.id === id ? { ...app, status } : app
      );
      setApplications(updatedApplications);
      setSelectedApplication(prev => prev ? { ...prev, status } : null);
      toast.success(`Application ${status}`);
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Applications</CardTitle>
                <CardDescription>Manage scholarship applications</CardDescription>
              </div>
              <div className="w-64">
                <Input 
                  placeholder="Search applications..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading applications...</div>
            ) : filteredApplications.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>LGA</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.fullName}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.lga}</TableCell>
                        <TableCell>{application.institution}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              application.status === "approved"
                                ? "success"
                                : application.status === "rejected"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(application.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="link" 
                            onClick={() => handleViewApplication(application)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4">
                {searchTerm ? "No matching applications found" : "No applications found"}
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedApplication && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Submitted on {new Date(selectedApplication.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Full Name:</span>
                      <span className="col-span-2 font-medium">{selectedApplication.fullName}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="col-span-2">{selectedApplication.email}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="col-span-2">{selectedApplication.phone}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Gender:</span>
                      <span className="col-span-2">{selectedApplication.gender}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Date of Birth:</span>
                      <span className="col-span-2">
                        {typeof selectedApplication.dateOfBirth === 'string' 
                          ? new Date(selectedApplication.dateOfBirth).toLocaleDateString() 
                          : new Date(selectedApplication.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Address:</span>
                      <span className="col-span-2">{selectedApplication.address}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">LGA:</span>
                      <span className="col-span-2">{selectedApplication.lga}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Educational Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Institution:</span>
                      <span className="col-span-2">{selectedApplication.institution}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Course:</span>
                      <span className="col-span-2">{selectedApplication.course}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="col-span-2">{selectedApplication.level}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Matric Number:</span>
                      <span className="col-span-2">{selectedApplication.matricNumber}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <span className="text-muted-foreground">Quiz Score:</span>
                      <span className="col-span-2">{selectedApplication.quizScore}/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-2">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-muted-foreground">Indigene Form:</span>
                    <Button variant="link" className="block" onClick={() => window.open(selectedApplication.indigeneFormUrl)}>
                      View Document
                    </Button>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Admission Letter:</span>
                    <Button variant="link" className="block" onClick={() => window.open(selectedApplication.admissionLetterUrl)}>
                      View Document
                    </Button>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Passport Photo:</span>
                    <Button variant="link" className="block" onClick={() => window.open(selectedApplication.passportPhotoUrl)}>
                      View Photo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg mb-4">Application Status</h3>
                <div className="flex gap-3">
                  <Button 
                    variant={selectedApplication.status === "pending" ? "default" : "outline"}
                    onClick={() => handleUpdateStatus(selectedApplication.id, "pending")}
                  >
                    Pending
                  </Button>
                  <Button 
                    variant={selectedApplication.status === "approved" ? "default" : "outline"} 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleUpdateStatus(selectedApplication.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant={selectedApplication.status === "rejected" ? "default" : "outline"} 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleUpdateStatus(selectedApplication.id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default Applications;
