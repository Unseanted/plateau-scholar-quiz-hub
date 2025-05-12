
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getStudentProfileById } from "@/services/studentProfileService";
import { StudentProfile as StudentProfileType, Disbursement } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, GraduationCap, FileText, CircleDollarSign, BookOpen, User } from "lucide-react";

const StudentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<StudentProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        try {
          const data = await getStudentProfileById(id);
          setProfile(data || null);
        } catch (error) {
          console.error("Error fetching student profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [id]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDisbursementStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'processed':
        return 'bg-blue-500';
      default:
        return 'bg-yellow-500';
    }
  };

  // Handle case when profile is not found
  if (!loading && !profile) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <Card className="shadow-md">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold mb-4">Profile Not Found</h2>
                <p className="mb-6">The student profile you are looking for could not be found.</p>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <div className="text-center py-8">
            <p>Loading profile...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              &larr; Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview Card */}
          <Card className="shadow-md md:col-span-3">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  {profile?.passportPhotoUrl ? (
                    <AvatarImage src={profile.passportPhotoUrl} alt={profile.fullName} />
                  ) : (
                    <AvatarFallback className="text-2xl">{getInitials(profile?.fullName || "")}</AvatarFallback>
                  )}
                </Avatar>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold">{profile?.fullName}</h1>
                  <p className="text-muted-foreground">{profile?.matricNumber}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 justify-center md:justify-start">
                    <Badge variant="secondary">{profile?.institution}</Badge>
                    <Badge variant="outline">{profile?.course}</Badge>
                    <Badge 
                      className={`${profile?.scholarshipType === "full" 
                        ? "bg-green-100 text-green-800" 
                        : profile?.scholarshipType === "partial" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-purple-100 text-purple-800"}`}
                    >
                      {profile?.scholarshipType.charAt(0).toUpperCase() + profile?.scholarshipType.slice(1)} Scholarship
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content Area */}
          <div className="col-span-1 md:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
                        <p>{profile?.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Phone</h4>
                        <p>{profile?.phone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Date of Birth</h4>
                        <p>{profile?.dateOfBirth ? formatDate(profile.dateOfBirth) : "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Gender</h4>
                        <p className="capitalize">{profile?.gender}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                        <p>{profile?.address}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">LGA</h4>
                        <p>{profile?.lga}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Scholarship Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Scholarship ID</h4>
                        <p>{profile?.id}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Academic Year</h4>
                        <p>{profile?.academicYear}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Award Amount</h4>
                        <p className="font-semibold">₦{profile?.scholarshipAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                        <Badge variant={profile?.status === "approved" ? "default" : "outline"}>
                          {profile?.status.charAt(0).toUpperCase() + profile?.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Application Date</h4>
                        <p>{profile?.createdAt ? formatDate(profile.createdAt) : "N/A"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Last Updated</h4>
                        <p>{profile?.updatedAt ? formatDate(profile.updatedAt) : "N/A"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Academic Tab */}
              <TabsContent value="academic" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Institution</h4>
                        <p>{profile?.institution}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Course</h4>
                        <p>{profile?.course}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Level</h4>
                        <p>{profile?.level}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Matric Number</h4>
                        <p>{profile?.matricNumber}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {profile?.performanceMetrics && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Academic Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">CGPA</h4>
                          <p className="text-2xl font-bold">{profile.performanceMetrics.cgpa}</p>
                          <p className="text-xs text-muted-foreground mt-1">out of 5.0</p>
                        </div>
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Attendance</h4>
                          <p className="text-2xl font-bold">{profile.performanceMetrics.attendance}%</p>
                          <p className="text-xs text-muted-foreground mt-1">class attendance</p>
                        </div>
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Semester</h4>
                          <p className="text-2xl font-bold">{profile.performanceMetrics.lastSemesterGrade}</p>
                          <p className="text-xs text-muted-foreground mt-1">grade</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CircleDollarSign className="h-5 w-5" />
                      Scholarship Financial Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Total Award Amount</h4>
                        <p className="text-lg font-bold">₦{profile?.scholarshipAmount?.toLocaleString()}</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ 
                            width: `${profile?.disbursements?.reduce((acc, curr) => 
                              curr.status === 'completed' ? acc + curr.amount : acc, 0) / (profile?.scholarshipAmount || 1) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className="text-muted-foreground">
                          Disbursed: ₦{profile?.disbursements?.reduce((acc, curr) => 
                            curr.status === 'completed' ? acc + curr.amount : acc, 0).toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          Remaining: ₦{((profile?.scholarshipAmount || 0) - 
                            (profile?.disbursements?.reduce((acc, curr) => 
                              curr.status === 'completed' ? acc + curr.amount : acc, 0) || 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-medium mb-3">Disbursement Schedule</h4>
                    <div className="space-y-4">
                      {profile?.disbursements?.map((disbursement: Disbursement) => (
                        <div key={disbursement.id} className="flex gap-4 bg-muted/50 p-3 rounded-lg">
                          <div className={`${getDisbursementStatusColor(disbursement.status)} h-12 w-1 rounded-full self-center`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">{disbursement.description}</h5>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {formatDate(disbursement.date)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">₦{disbursement.amount.toLocaleString()}</p>
                                <Badge variant="outline" className={`
                                  ${disbursement.status === 'completed' ? 'bg-green-100 text-green-800 border-green-200' : 
                                    disbursement.status === 'processed' ? 'bg-blue-100 text-blue-800 border-blue-200' : 
                                    'bg-yellow-100 text-yellow-800 border-yellow-200'}
                                `}>
                                  {disbursement.status.charAt(0).toUpperCase() + disbursement.status.slice(1)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1">
            <Card className="shadow-md mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link to={`#`}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      View Documents
                    </Button>
                  </Link>
                  <Link to={`#`}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Academic Calendar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contact Information</CardTitle>
                <CardDescription>Scholarship office details</CardDescription>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-3">
                  <p><strong>Email:</strong> scholarships@plateaustate.gov.ng</p>
                  <p><strong>Phone:</strong> +234 803 123 4567</p>
                  <p><strong>Office:</strong> Plateau State Secretariat, Jos</p>
                  <p className="text-xs text-muted-foreground mt-4">For inquiries about your scholarship disbursements or any other questions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentProfile;
