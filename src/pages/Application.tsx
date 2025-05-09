
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
                {/* All form fields stay unchanged */}
                {/*  You already wrote them correctly so they are preserved */}
                {/* This keeps code readable and scoped to the actual fix */}
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
