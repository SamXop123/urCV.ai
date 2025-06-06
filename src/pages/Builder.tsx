import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, ArrowRight, Bot, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import EducationForm from "@/components/resume/EducationForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeAnalysisComponent from "@/components/resume/ResumeAnalysis";
import ChatBot from "@/components/resume/ChatBot";
import ResumeGenerator from "@/components/resume/ResumeGenerator";
import FloatingChatBot from "@/components/FloatingChatBot";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
  };
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    certifications: string[];
  };
}

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: {
      technical: [],
      languages: [],
      certifications: [],
    },
  });

  const steps = [
    { title: "Personal Info", component: PersonalInfoForm },
    { title: "Education", component: EducationForm },
    { title: "Experience", component: ExperienceForm },
    { title: "Skills", component: SkillsForm },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleEnhanceResume = (enhancedData: ResumeData) => {
    setResumeData(enhancedData);
  };

  const getResumeContext = () => {
    return `Current resume data: ${JSON.stringify(resumeData, null, 2)}`;
  };

  const handleExtractedData = (extractedData: ResumeData) => {
    setResumeData(extractedData);
  };

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
            <span className="text-gray-600">Step {currentStep + 1} of {steps.length}</span>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-200 rounded-full h-2 max-w-md mx-auto">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Form Section */}
          <Card className="lg:col-span-2 p-6 shadow-xl border-0">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="form">Resume Form</TabsTrigger>
                <TabsTrigger value="analysis">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Analysis
                </TabsTrigger>
                <TabsTrigger value="chat">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Chat
                </TabsTrigger>
                <TabsTrigger value="generate">Generate</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="mt-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-gray-600">
                    Fill in your {steps[currentStep].title.toLowerCase()} details
                  </p>
                </div>

                <CurrentStepComponent 
                  data={resumeData}
                  updateData={updateResumeData}
                />

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </Button>

                  {currentStep === steps.length - 1 ? (
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2">
                      <span>Generate Resume</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <ResumeAnalysisComponent 
                  data={resumeData}
                  onEnhance={handleEnhanceResume}
                  onExtractedData={handleExtractedData}
                />
              </TabsContent>

              <TabsContent value="chat" className="mt-6">
                <ChatBot resumeContext={getResumeContext()} />
              </TabsContent>

              <TabsContent value="generate" className="mt-6">
                <ResumeGenerator data={resumeData} />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Preview Section */}
          <Card className="p-6 shadow-xl border-0">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h2>
              <p className="text-gray-600">See your resume update in real-time</p>
            </div>
            <ResumePreview data={resumeData} />
          </Card>
        </div>
      </div>

      {/* Floating Chat Bot */}
      <FloatingChatBot />
    </div>
  );
};

export default Builder;
