
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, User, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 overflow-hidden theme-transition">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              urCV.ai
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/builder">
              <Button className="gradient-primary hover:opacity-90 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
            Build Your Perfect
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent animate-pulse">
              AI-Enhanced Resume
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Create stunning, ATS-friendly resumes in minutes. Our AI analyzes your content 
            and suggests improvements to help you stand out from the crowd.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/builder">
              <Button size="lg" className="gradient-primary hover:opacity-90 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                Start Building Now
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="border-2 border-border hover:border-primary/50 px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose urCV.ai?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of resume building with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-lg animate-slide-in-left bg-card theme-transition">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:rotate-12 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Smart Input Forms</h3>
            <p className="text-muted-foreground leading-relaxed">
              Intuitive forms that guide you through every section, ensuring you don't miss any important details
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-lg animate-fade-in animation-delay-200 bg-card theme-transition">
            <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:rotate-12 shadow-lg">
              <Edit className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">AI Enhancement</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our AI analyzes your resume and provides intelligent suggestions to improve impact and readability
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-lg animate-slide-in-right bg-card theme-transition">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 transform transition-transform duration-300 hover:rotate-12 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Professional Templates</h3>
            <p className="text-muted-foreground leading-relaxed">
              Beautiful, ATS-friendly templates designed by professionals to help you make the best impression
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-primary py-16 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Dream Resume?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've landed their dream jobs with urCV.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg transition-all duration-300">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="gradient-dark text-white py-8 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center shadow-md">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">urCV.ai</span>
          </div>
          <p className="text-white/70">© 2024 N-PCs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
