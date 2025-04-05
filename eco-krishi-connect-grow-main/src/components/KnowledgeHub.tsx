import React from 'react';
import { Book, Calendar, Clock, GraduationCap, HeartHandshake, Lightbulb, Search, User2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Define a type for the resources
type ResourceType = "article" | "video" | "podcast" | "tool";

interface Resource {
  title: string;
  description: string;
  link: string;
  type: ResourceType;
  date: string;
  author: string;
  views: number;
  tags: string[];
  image: string;
  avatarUrl: string;
}

const KnowledgeHub: React.FC = () => {
  const resources: Resource[] = [
    {
      title: "Understanding Soil Health for Organic Farming",
      description: "Learn about the key indicators of soil health and how to improve them for organic farming.",
      link: "#",
      type: "article",
      date: "2024-03-15",
      author: "Dr. Emily Carter",
      views: 2350,
      tags: ["soil health", "organic farming", "best practices"],
      image: "https://images.unsplash.com/photo-1606938990441-8f296954a6c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1573496864227-4a6c396391e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    },
    {
      title: "Natural Pest Control Methods",
      description: "Explore effective and eco-friendly ways to manage pests in your organic farm.",
      link: "#",
      type: "article",
      date: "2024-03-10",
      author: "James Miller",
      views: 1800,
      tags: ["pest control", "organic farming", "natural methods"],
      image: "https://images.unsplash.com/photo-1563911020628-c99248a77843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      title: "The Role of Cover Crops in Soil Conservation",
      description: "Discover how cover crops can prevent erosion, improve soil structure, and increase biodiversity.",
      link: "#",
      type: "article",
      date: "2024-03-05",
      author: "Linda Adams",
      views: 1500,
      tags: ["cover crops", "soil conservation", "organic farming"],
      image: "https://images.unsplash.com/photo-1567306226416-283f3ca149ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Organic Seed Saving Techniques",
      description: "Learn how to save seeds from your organic crops to preserve genetic diversity and reduce costs.",
      link: "#",
      type: "article",
      date: "2024-02-28",
      author: "David Green",
      views: 1250,
      tags: ["seed saving", "organic farming", "sustainability"],
      image: "https://images.unsplash.com/photo-1563123251-5149e7aa35ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      title: "Composting for Organic Farms",
      description: "A comprehensive guide to composting techniques for organic farms, including hot and cold composting methods.",
      link: "#",
      type: "article",
      date: "2024-02-20",
      author: "Sophia White",
      views: 1000,
      tags: ["composting", "organic farming", "soil enrichment"],
      image: "https://images.unsplash.com/photo-1558522861-4c608a94063a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b2933e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  return (
    <section className="eco-container py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-eco-dark">Knowledge Hub</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input type="text" placeholder="Search resources..." className="pr-10 rounded-full bg-eco-light border-gray-200 focus-visible:ring-eco-primary" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <Button variant="outline" size="sm">
            <Book className="mr-2 h-4 w-4" />
            All Resources
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-white shadow-md border-none">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-lg font-semibold line-clamp-1">{resource.title}</CardTitle>
              <CardDescription className="text-gray-500 line-clamp-2">{resource.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <img src={resource.image} alt={resource.title} className="rounded-md mb-4 w-full h-40 object-cover" />
              <div className="flex items-center space-x-2 mb-3">
                {resource.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 pt-0">
              <div className="flex items-center space-x-3">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={resource.avatarUrl} alt={resource.author} />
                  <AvatarFallback><User2 className="w-4 h-4 text-gray-500" /></AvatarFallback>
                </Avatar>
                <div className="text-sm text-gray-600">{resource.author}</div>
              </div>
              <div className="flex items-center space-x-4 text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-xs">{resource.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Lightbulb className="h-4 w-4" />
                  <span className="text-xs">{resource.views}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default KnowledgeHub;
