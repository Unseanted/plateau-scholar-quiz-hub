
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
import { FileTextIcon, UserIcon, CheckIcon, XIcon } from "lucide-react";
import { getApplications, getCurrentUser } from "@/services/api";
import { ApplicationForm } from "@/types";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationForm[]>([]);
  const [loading, setLoading] = useState(true);

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

  const statusCounts = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "approved").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  const recentApplications = applications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Applications</CardTitle>
              <CardDescription>All submitted applications</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <FileTextIcon className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">{statusCounts.total}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Review</CardTitle>
              <CardDescription>Applications awaiting decision</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-yellow-500 mr-2" />
                <span className="text-3xl font-bold">{statusCounts.pending}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Approved</CardTitle>
              <CardDescription>Successful applications</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <CheckIcon className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-3xl font-bold">{statusCounts.approved}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rejected</CardTitle>
              <CardDescription>Declined applications</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <XIcon className="h-8 w-8 text-red-500 mr-2" />
                <span className="text-3xl font-bold">{statusCounts.rejected}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Latest scholarship applications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading applications...</div>
            ) : recentApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>LGA</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.fullName}</TableCell>
                      <TableCell>{application.institution}</TableCell>
                      <TableCell>{application.lga}</TableCell>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-4">No applications found</div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
