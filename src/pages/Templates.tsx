
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and modern design perfect for tech professionals",
      image: "/placeholder.svg",
      category: "Professional"
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      image: "/placeholder.svg",
      category: "Creative"
    },
    {
      id: 3,
      name: "Executive",
      description: "Sophisticated template for senior executives",
      image: "/placeholder.svg",
      category: "Executive"
    },
    {
      id: 4,
      name: "Fresh Graduate",
      description: "Perfect template for recent graduates",
      image: "/placeholder.svg",
      category: "Entry Level"
    },
    {
      id: 5,
      name: "Minimalist",
      description: "Simple and clean design focusing on content",
      image: "/placeholder.svg",
      category: "Minimal"
    },
    {
      id: 6,
      name: "Academic",
      description: "Designed for academic and research positions",
      image: "/placeholder.svg",
      category: "Academic"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              urCV.ai
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
            </Link>
            <Link to="/builder">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Resume Template
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select from our professionally designed templates and customize them to create your perfect resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <Link to="/builder">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Use This Template
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">urCV.ai</span>
          </div>
          <p className="text-gray-400">© 2024 N-PCs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Templates;
