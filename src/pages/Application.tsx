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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ApplicationForm, LGA } from "@/types";

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
  
  useEffect(() => {
    // Check for quiz eligibility
    const quizScore = sessionStorage.getItem("quizScore");
    if (!quizScore) {
      navigate("/quiz");
      toast.error("Please complete the eligibility quiz first");
      return;
    }
    
    // Check for user authentication
    const currentUser = sessionStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/signin");
      toast.error("Please sign in to continue with your application");
      return;
    }
  }, [navigate]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [indigeneForm, setIndigeneForm] = useState<File | null>(null);
  const [admissionLetter, setAdmissionLetter] = useState<File | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  useEffect(() => {
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

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setter(e.target.files[0]);
      }
    };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!indigeneForm || !admissionLetter || !passportPhoto) {
      toast.error("Please upload all required documents");
      return;
    }

    setIsSubmitting(true);

    try {
      toast.info("Uploading documents...");

      const [indigeneFormUrl, admissionLetterUrl, passportPhotoUrl] =
        await Promise.all([
          uploadFile(indigeneForm),
          uploadFile(admissionLetter),
          uploadFile(passportPhoto),
        ]);

      // Create application data with all required fields explicitly set
      const applicationData: ApplicationForm = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        lga: data.lga as LGA,
        institution: data.institution,
        course: data.course,
        level: data.level,
        matricNumber: data.matricNumber,
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
        <h1 className="text-3xl font-bold mb-6 text-center">
          Scholarship Application
        </h1>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Please fill in all required fields</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="johndoe@example.com"
                            {...field}
                          />
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
                          <Input placeholder="+234 803 123 4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-3">
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
                                  "pl-3 text-left font-normal",
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
                                date > new Date() ||
                                date < new Date("1950-01-01")
                              }
                              initialFocus
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
                        <FormLabel>Home Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your current address"
                            className="resize-none"
                            {...field}
                          />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Educational Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="University of Jos"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course of Study</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Computer Science"
                              {...field}
                            />
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
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
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
                              <SelectItem value="postgrad">Postgraduate</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="matricNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Matriculation Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="UNIJOS/2022/123456"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium mb-4">
                    Required Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="indigeneForm">Indigene Form</Label>
                      <Input
                        id="indigeneForm"
                        type="file"
                        onChange={handleFileChange(setIndigeneForm)}
                        className="mt-1"
                        accept="image/*,.pdf"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload your indigene certificate (PDF or image)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="admissionLetter">Admission Letter</Label>
                      <Input
                        id="admissionLetter"
                        type="file"
                        onChange={handleFileChange(setAdmissionLetter)}
                        className="mt-1"
                        accept="image/*,.pdf"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload your admission letter (PDF or image)
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="passportPhoto">Passport Photo</Label>
                      <Input
                        id="passportPhoto"
                        type="file"
                        onChange={handleFileChange(setPassportPhoto)}
                        className="mt-1"
                        accept="image/*"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Upload a recent passport photograph
                      </p>
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
