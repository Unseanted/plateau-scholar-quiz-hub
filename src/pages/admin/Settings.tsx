
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getCurrentUser } from "@/services/api";
import { toast } from "@/components/ui/sonner";

const formSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  emailNotifications: z.boolean(),
  emailSubject: z.string().min(2, "Email subject must be at least 2 characters"),
  emailTemplate: z.string().min(10, "Email template must be at least 10 characters"),
});

const Settings = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const user = getCurrentUser();
    
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/admin");
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "Plateau Scholarship Portal",
      emailNotifications: true,
      emailSubject: "Plateau Scholarship Application Update",
      emailTemplate: 
`Dear {name},

We're pleased to inform you that your application for the Plateau State Scholarship has been reviewed and {status}.

{custom_message}

If you have any questions, please don't hesitate to contact us.

Best regards,
Plateau State Scholarship Board`,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success("Settings saved successfully");
    console.log(data);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure general portal settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Site Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed in the browser tab and emails
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure notification emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Enable Email Notifications
                        </FormLabel>
                        <FormDescription>
                          Send email notifications to applicants when their status changes
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Template</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={10}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Use {"{name}"}, {"{status}"}, and {"{custom_message}"} as placeholders
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default Settings;
