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
import { getApplications, getCurrentUser, getUsers } from "@/services/api";
import { ApplicationForm, User } from "@/types";
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationForm[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/admin");
      return;
    }

    const fetchData = async () => {
      try {
        const [applicationsData, usersData] = await Promise.all([
          getApplications(),
          getUsers()
        ]);
        setApplications(applicationsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const statusCounts = {
    total: applications.length,
    pending: applications.filter(app => app.status === "pending").length,
    approved: applications.filter(app => app.status === "approved").length,
    rejected: applications.filter(app => app.status === "rejected").length,
  };

  const userStats = {
    total: users.length,
    students: users.filter(user => user.role === "student").length,
    active: users.filter(user => user.status === "active").length,
    recent: users.filter(user => {
      const registrationDate = new Date(user.registrationDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return registrationDate > thirtyDaysAgo;
    }).length,
  };

  const recentApplications = applications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentUsers = users
    .filter(user => user.role === "student")
    .sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Users</CardTitle>
              <CardDescription>All registered users</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-primary mr-2" />
                <span className="text-3xl font-bold">{userStats.total}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Students</CardTitle>
              <CardDescription>Currently active students</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-green-500 mr-2" />
                <span className="text-3xl font-bold">{userStats.students}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users</CardTitle>
              <CardDescription>Users with active status</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-blue-500 mr-2" />
                <span className="text-3xl font-bold">{userStats.active}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">New Users</CardTitle>
              <CardDescription>Registered in last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-purple-500 mr-2" />
                <span className="text-3xl font-bold">{userStats.recent}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.fullName}</TableCell>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">No applications found</div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered students</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : recentUsers.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "active"
                                ? "success"
                                : user.status === "suspended"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.registrationDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4">No recent users found</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;