import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaXTwitter, FaFacebookF, FaTiktok } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";
import { CheckIcon, UserIcon, FileTextIcon } from "lucide-react";

const Index = () => {
  return (
    <MainLayout withGradient={true}>
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Plateau State Scholarship Program
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Supporting the education and future of Plateau State students
                through comprehensive scholarships and financial aid.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/quiz">
                  <Button size="lg" className="font-medium">
                    Check Eligibility
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="font-medium">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-xl opacity-20" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary rounded-xl opacity-20" />
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Application Process</CardTitle>
                    <CardDescription>Simple steps to apply</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/20 p-1.5 rounded-full">
                          <CheckIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Take the Eligibility Quiz
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Complete a short quiz to see if you qualify
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/20 p-1.5 rounded-full">
                          <FileTextIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Complete Application</p>
                          <p className="text-sm text-muted-foreground">
                            Fill out the application form with your details
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="bg-primary/20 p-1.5 rounded-full">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Upload Documents</p>
                          <p className="text-sm text-muted-foreground">
                            Submit your indigene form, admission letter, and
                            passport photo
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/quiz" className="w-full">
                      <Button className="w-full">Start Now</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" id="about">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About The Scholarship
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              The Plateau State Scholarship is designed to support indigenes of
              Plateau State in their educational pursuits, providing financial
              assistance to deserving and eligible students.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  To be eligible, you must be an indigene of Plateau State,
                  currently enrolled in a recognized educational institution.
                  You must provide proof of indigeneship and admission letter with a picture for identification.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  The scholarship covers tuition fees, study materials, and a
                  monthly stipend depending on your level of study and the
                  institution you attend.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Scholarships are awarded for the duration of your program,
                  subject to satisfactory academic performance and annual
                  renewal application.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        className="py-12 md:py-16 bg-white rounded-lg shadow-sm"
        id="contact"
      >
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Have questions about the scholarship? Reach out to our support
              team.
            </p>
            <div className="mt-8 grid gap-4 w-full max-w-md">
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>+234 803 3607 3557</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="16" rx="2" width="20" x="2" y="4" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <span>info@plateauscholarship.gov.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <svg
                    className="h-5 w-5 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span>Plateau State Scholarship Board, Jos, Nigeria</span>
              </div>
              <div className="flex justify-center items-center gap-4 mt-4 text-black">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter className="text-3xl hover:text-blue-500 transition-colors" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="text-3xl hover:text-blue-600 transition-colors" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok className="text-3xl hover:text-black transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
