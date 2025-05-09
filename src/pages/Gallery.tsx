
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

// Mock data for gallery images
const galleryImages = [
  {
    id: 1,
    title: "Scholarship Award Ceremony",
    description: "Students receiving their scholarship awards at the annual ceremony",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&h=500",
  },
  {
    id: 2,
    title: "Campus Excellence",
    description: "Our scholars excelling in their academic pursuits",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=500",
  },
  {
    id: 3,
    title: "Mentoring Session",
    description: "Scholars participating in professional development workshops",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&h=500",
  },
  {
    id: 4,
    title: "Technology Innovation",
    description: "Students developing tech solutions during hackathon events",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&h=500",
  },
  {
    id: 5,
    title: "Field Research",
    description: "Scholars conducting field research in Plateau State",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=500",
  },
];

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Grace Musa",
    position: "Computer Science Graduate, University of Jos",
    avatar: "/placeholder.svg",
    testimonial: "The Plateau Scholarship changed my life. I was able to focus on my studies without financial worry, and now I'm working at a leading tech company in Jos.",
  },
  {
    id: 2,
    name: "Ibrahim Danladi",
    position: "Medicine Student, Plateau State University",
    avatar: "/placeholder.svg",
    testimonial: "I dreamed of becoming a doctor but couldn't afford the tuition. This scholarship made it possible for me to pursue my passion for medicine.",
  },
  {
    id: 3,
    name: "Sarah James",
    position: "Engineering Graduate, Federal University Lafia",
    avatar: "/placeholder.svg",
    testimonial: "As a female engineer from Plateau State, this scholarship empowered me to break barriers. I'm now inspiring other young women to pursue STEM careers.",
  },
  {
    id: 4,
    name: "John Titus",
    position: "Agricultural Science Student, University of Agriculture Makurdi",
    avatar: "/placeholder.svg",
    testimonial: "The mentorship program that comes with this scholarship helped me develop innovative solutions for agricultural challenges in my community.",
  },
];

const Gallery = () => {
  return (
    <MainLayout>
      <div className="space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Our Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Celebrating the success stories and moments of our scholarship recipients
            across Plateau State. These images showcase our commitment to education and excellence.
          </p>
        </div>

        {/* Image Gallery Section */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Scholarship Moments</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card>
                      <div className="h-56 overflow-hidden rounded-t-lg">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{image.title}</CardTitle>
                        <CardDescription>{image.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2 translate-y-0" />
              <CarouselNext className="relative static ml-2 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Testimonials Section */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white/50 backdrop-blur-sm border border-accent/20">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 border-2 border-primary">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                    </Avatar>
                    <div>
                      <p className="text-lg font-medium leading-none mb-2">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">{testimonial.position}</p>
                      <p className="italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Gallery;
