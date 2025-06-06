
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/pages/Builder';
import { generateWordDocument, generatePDFFromElement, downloadFile } from '@/services/documentService';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Image, Link as LinkIcon } from 'lucide-react';

interface ResumeGeneratorProps {
  data: ResumeData;
}

const ResumeGenerator = ({ data }: ResumeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareableLink, setShareableLink] = useState<string | null>(null);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateWordResume = async () => {
    setIsGenerating(true);
    try {
      const wordBlob = await generateWordDocument(data);
      downloadFile(wordBlob, `${data.personalInfo.fullName || 'resume'}.docx`);
      toast({
        title: "Word Document Generated",
        description: "Your resume has been downloaded as a Word document!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate Word document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFResume = async () => {
    if (!resumePreviewRef.current) return;
    
    setIsGenerating(true);
    try {
      const pdfBlob = await generatePDFFromElement(resumePreviewRef.current);
      downloadFile(pdfBlob, `${data.personalInfo.fullName || 'resume'}.pdf`);
      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded as a PDF!",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImageResume = async () => {
    if (!resumePreviewRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(resumePreviewRef.current, {
        scale: 2,
        useCORS: true,
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          downloadFile(blob, `${data.personalInfo.fullName || 'resume'}.png`);
          toast({
            title: "Image Generated",
            description: "Your resume has been downloaded as an image!",
          });
        }
      }, 'image/png');
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateShareableLink = () => {
    const resumeDataEncoded = btoa(JSON.stringify(data));
    const link = `${window.location.origin}/resume/${resumeDataEncoded}`;
    setShareableLink(link);
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Shareable link has been copied to clipboard!",
    });
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Generate & Download Resume</h3>
        
        {/* Hidden Resume Preview for PDF/Image Generation */}
        <div ref={resumePreviewRef} className="hidden">
          <div className="bg-white p-8 shadow-lg rounded-lg max-w-[800px]">
            {/* Header */}
            <div className="border-b-2 border-gray-200 pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {data.personalInfo.fullName || "Your Name"}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
                {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
                {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
                {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            {data.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
                <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Experience</h2>
                <div className="space-y-4">
                  {data.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                        </div>
                        <p className="text-sm text-gray-600">
                          {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">{exp.location}</p>
                      {exp.description && (
                        <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Education</h2>
                <div className="space-y-3">
                  {data.education.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.school}</p>
                        </div>
                        <p className="text-sm text-gray-600">{edu.graduationDate}</p>
                      </div>
                      <p className="text-sm text-gray-600">{edu.location}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(data.skills.technical.length > 0 || data.skills.languages.length > 0 || data.skills.certifications.length > 0) && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills</h2>
                
                {data.skills.technical.length > 0 && (
                  <div className="mb-3">
                    <h3 className="font-medium text-gray-800">Technical Skills</h3>
                    <p className="text-gray-700">{data.skills.technical.join(", ")}</p>
                  </div>
                )}
                
                {data.skills.languages.length > 0 && (
                  <div className="mb-3">
                    <h3 className="font-medium text-gray-800">Languages</h3>
                    <p className="text-gray-700">{data.skills.languages.join(", ")}</p>
                  </div>
                )}
                
                {data.skills.certifications.length > 0 && (
                  <div className="mb-3">
                    <h3 className="font-medium text-gray-800">Certifications</h3>
                    <p className="text-gray-700">{data.skills.certifications.join(", ")}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={generateWordResume}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
          >
            <FileText className="w-4 h-4" />
            <span>Download Word</span>
          </Button>

          <Button
            onClick={generatePDFResume}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>

          <Button
            onClick={generateImageResume}
            disabled={isGenerating}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Image className="w-4 h-4" />
            <span>Download Image</span>
          </Button>

          <Button
            onClick={generateShareableLink}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <LinkIcon className="w-4 h-4" />
            <span>Share Link</span>
          </Button>
        </div>

        {shareableLink && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 font-medium">
              Shareable link copied to clipboard!
            </p>
            <p className="text-xs text-green-600 mt-1 break-all">
              {shareableLink}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumeGenerator;
