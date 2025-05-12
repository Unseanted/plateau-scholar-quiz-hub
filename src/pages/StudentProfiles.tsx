
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { getStudentProfiles } from "@/services/studentProfileService";
import { StudentProfile } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Search } from "lucide-react";

const StudentProfiles = () => {
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getStudentProfiles();
        setProfiles(data);
      } catch (error) {
        console.error("Error fetching student profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile => 
    profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    profile.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.lga.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <GraduationCap className="h-8 w-8" />
              Student Profiles
            </h1>
            <p className="text-muted-foreground">Browse scholarship recipients and their details</p>
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p>Loading student profiles...</p>
          </div>
        ) : filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Link to={`/student/${profile.id}`} key={profile.id}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Avatar>
                        {profile.passportPhotoUrl ? (
                          <AvatarImage src={profile.passportPhotoUrl} alt={profile.fullName} />
                        ) : (
                          <AvatarFallback>{getInitials(profile.fullName)}</AvatarFallback>
                        )}
                      </Avatar>
                      <Badge
                        className={`${
                          profile.scholarshipType === "full"
                            ? "bg-green-100 text-green-800"
                            : profile.scholarshipType === "partial"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {profile.scholarshipType.charAt(0).toUpperCase() + profile.scholarshipType.slice(1)}
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{profile.fullName}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      {profile.matricNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Institution:</span>
                        <span className="font-medium">{profile.institution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Course:</span>
                        <span>{profile.course}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level:</span>
                        <span>{profile.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium">₦{profile.scholarshipAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No student profiles found matching your search.</p>
            {searchTerm && (
              <Button variant="ghost" onClick={() => setSearchTerm("")} className="mt-2">
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default StudentProfiles;
