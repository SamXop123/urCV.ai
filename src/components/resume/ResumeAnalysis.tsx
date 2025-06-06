import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { analyzeResume, enhanceResume, extractResumeDataWithAI, ResumeAnalysis } from '@/services/groqService';
import { parseResumeFile } from '@/services/fileParserService';
import { ResumeData } from '@/pages/Builder';
import { useToast } from '@/hooks/use-toast';
import { Bot, Upload, FileText } from 'lucide-react';

interface ResumeAnalysisProps {
  data: ResumeData;
  onEnhance: (enhancedData: ResumeData) => void;
  onExtractedData: (extractedData: ResumeData) => void;
}

const ResumeAnalysisComponent = ({ data, onEnhance, onExtractedData }: ResumeAnalysisProps) => {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(data);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceResume(data);
      onEnhance(enhanced);
      toast({
        title: "Resume Enhanced",
        description: "Your resume has been improved with AI suggestions!",
      });
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Failed to enhance resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsExtracting(true);

    try {
      const fileText = await parseResumeFile(file);
      const extractedData = await extractResumeDataWithAI(fileText);
      onExtractedData(extractedData);
      
      toast({
        title: "Resume Extracted",
        description: "Your resume data has been extracted successfully!",
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract resume data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="text-xl font-bold">AI Resume Analysis</h3>
        </div>

        {/* File Upload Section */}
        <div className="mb-6 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-4">
              Upload your existing resume to extract data automatically
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              onClick={triggerFileUpload}
              disabled={isExtracting}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 mb-2"
            >
              {isExtracting ? 'Extracting...' : 'Upload Resume'}
            </Button>
            {uploadedFile && (
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{uploadedFile.name}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
          
          <Button
            onClick={handleEnhance}
            disabled={isEnhancing}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-6">
          {/* Score */}
          <div className="text-center">
            <div className={`w-20 h-20 rounded-full ${getScoreColor(analysis.score)} flex items-center justify-center mx-auto mb-2`}>
              <span className="text-white text-xl font-bold">{analysis.score}</span>
            </div>
            <p className="text-gray-600">Resume Score</p>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
            <div className="space-y-2">
              {analysis.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <h4 className="font-semibold text-orange-700 mb-2">Areas for Improvement</h4>
            <div className="space-y-2">
              {analysis.improvements.map((improvement, index) => (
                <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800">
                  {improvement}
                </Badge>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">AI Suggestions</h4>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResumeAnalysisComponent;
