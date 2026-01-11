import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and modern design perfect for tech professionals",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNm6BkgT87_Fus1KSC2Bti9okSzIM0kOd5Pw&s",
      category: "Professional",
      type: 'modern'
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfhb5s6aonhcaD9iv2lEWPM-85yaLR8SLMbQ&s",
      category: "Creative",
      type: 'creative'
    },
    {
      id: 3,
      name: "Executive Standard",
      description: "Sophisticated template for senior executives",
      image: "https://www.shutterstock.com/image-photo/business-team-working-late-analyzing-260nw-2400035393.jpg",
      category: "Executive",
      type: 'professional'
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                urCV.ai
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <Link to="/builder">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                  Create Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
            Premium Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Choose Your Perfect
            <span className="text-blue-600"> Resume Template </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Select from our professionally designed templates and customize them to create your perfect resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg group flex flex-col h-full">
              <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden group-hover:shadow-inner">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Link to="/builder">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-full">
                      Preview Template
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900">{template.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{template.description}</p>
                <Link to="/builder">
                  <Button className="w-full bg-slate-900 hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                    Use This Template
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Get access to all premium templates and advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-8 border-2 border-transparent shadow-lg hover:shadow-xl transition-all">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Basic</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-6">Free</div>
                <ul className="text-sm text-gray-600 space-y-4 mb-8 text-left max-w-xs mx-auto">
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> 3 basic templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> PDF download</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-green-500 mr-2" /> Basic AI assistance</li>
                </ul>
                <Button variant="outline" className="w-full py-6 border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900 font-semibold text-lg">
                  Current Plan
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-2 border-blue-600 relative shadow-2xl scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 shadow-lg">
                <span className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
              <div className="text-center pt-4">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Premium</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-1">$9.99</div>
                <div className="text-sm text-gray-500 mb-6">per month</div>
                <ul className="text-sm text-gray-600 space-y-4 mb-8 text-left max-w-xs mx-auto">
                  <li className="flex items-center"><Check className="w-4 h-4 text-blue-600 mr-2" /> All premium templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-blue-600 mr-2" /> Unlimited downloads</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-blue-600 mr-2" /> Advanced AI features</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-blue-600 mr-2" /> Priority support</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                  Upgrade Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Templates;


