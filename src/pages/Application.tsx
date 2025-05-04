
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { lgaList } from "@/data/quizQuestions";
import { submitApplication, uploadFile } from "@/services/api";
import { ApplicationForm } from "@/types";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  dateOfBirth: z.date({
    required_error: "Please select your date of birth",
  }),
  address: z.string().min(5, "Address must be at least 5 characters"),
  lga: z.string({
    required_error: "Please select your Local Government Area",
  }),
  institution: z.string().min(3, "Institution name must be at least 3 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  level: z.string({
    required_error: "Please select your current level of study",
  }),
  matricNumber: z.string().min(3, "Matriculation number must be at least 3 characters"),
});

const Application = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [indigeneForm, setIndigeneForm] = useState<File | null>(null);
  const [admissionLetter, setAdmissionLetter] = useState<File | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
    // Check if user has completed the quiz
    const storedScore = sessionStorage.getItem("quizScore");
    if (!storedScore) {
      toast.error("Please complete the eligibility quiz first");
      navigate("/quiz");
      return;
    }
    setQuizScore(parseInt(storedScore, 10));
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      institution: "",
      course: "",
      matricNumber: "",
    },
  });

  const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Validate files
    if (!indigeneForm) {
      toast.error("Please upload your indigene form");
      return;
    }
    if (!admissionLetter) {
      toast.error("Please upload your admission letter");
      return;
    }
    if (!passportPhoto) {
      toast.error("Please upload your passport photograph");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload files and get URLs
      toast.info("Uploading documents...");
      const indigeneFormUrl = await uploadFile(indigeneForm);
      const admissionLetterUrl = await uploadFile(admissionLetter);
      const passportPhotoUrl = await uploadFile(passportPhoto);

      // Submit application
      const applicationData: ApplicationForm = {
        ...data,
        indigeneFormUrl,
        admissionLetterUrl,
        passportPhotoUrl,
        status: "pending",
        quizScore: quizScore || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await submitApplication(applicationData);
      
      if (result.success) {
        toast.success("Application submitted successfully!");
        navigate("/application/success");
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Scholarship Application</h1>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please fill in all required fields</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1950-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residential Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lga"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local Government Area</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your LGA" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {lgaList.map((lga) => (
                              <SelectItem key={lga} value={lga}>
                                {lga}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Educational Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your university or college name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course of Study</FormLabel>
                          <FormControl>
                            <Input placeholder="Your course or program" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="100">100 Level</SelectItem>
                              <SelectItem value="200">200 Level</SelectItem>
                              <SelectItem value="300">300 Level</SelectItem>
                              <SelectItem value="400">400 Level</SelectItem>
                              <SelectItem value="500">500 Level</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="matricNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Matriculation Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your matriculation or student ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Required Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Please upload the following documents in PDF or image format
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="indigene-form">Indigene Form</Label>
                      <Input
                        id="indigene-form"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange(setIndigeneForm)}
                        className="mt-1"
                      />
                      {indigeneForm && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {indigeneForm.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="admission-letter">Admission Letter</Label>
                      <Input
                        id="admission-letter"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange(setAdmissionLetter)}
                        className="mt-1"
                      />
                      {admissionLetter && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {admissionLetter.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="passport-photo">Passport Photograph</Label>
                      <Input
                        id="passport-photo"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange(setPassportPhoto)}
                        className="mt-1"
                      />
                      {passportPhoto && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Selected: {passportPhoto.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Application;
