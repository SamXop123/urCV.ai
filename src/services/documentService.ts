
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '@/pages/Builder';

export const generateWordDocument = async (resumeData: ResumeData): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: resumeData.personalInfo.fullName,
          heading: HeadingLevel.TITLE,
        }),
        new Paragraph({
          children: [
            new TextRun(`${resumeData.personalInfo.email} | `),
            new TextRun(`${resumeData.personalInfo.phone} | `),
            new TextRun(`${resumeData.personalInfo.location}`),
          ],
        }),
        new Paragraph({
          text: resumeData.personalInfo.linkedin,
        }),
        new Paragraph({
          text: "",
        }),

        // Summary
        ...(resumeData.personalInfo.summary ? [
          new Paragraph({
            text: "Professional Summary",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: resumeData.personalInfo.summary,
          }),
          new Paragraph({
            text: "",
          }),
        ] : []),

        // Experience
        ...(resumeData.experience.length > 0 ? [
          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.experience.flatMap(exp => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${exp.title} - ${exp.company}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: `${exp.location} | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
            }),
            new Paragraph({
              text: exp.description,
            }),
            new Paragraph({
              text: "",
            }),
          ]),
        ] : []),

        // Education
        ...(resumeData.education.length > 0 ? [
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_1,
          }),
          ...resumeData.education.flatMap(edu => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${edu.degree} - ${edu.school}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              text: `${edu.location} | ${edu.graduationDate}`,
            }),
            ...(edu.gpa ? [
              new Paragraph({
                text: `GPA: ${edu.gpa}`,
              }),
            ] : []),
            new Paragraph({
              text: "",
            }),
          ]),
        ] : []),

        // Skills
        new Paragraph({
          text: "Skills",
          heading: HeadingLevel.HEADING_1,
        }),
        ...(resumeData.skills.technical.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Technical Skills: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.technical.join(", ")),
            ],
          }),
        ] : []),
        ...(resumeData.skills.languages.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Languages: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.languages.join(", ")),
            ],
          }),
        ] : []),
        ...(resumeData.skills.certifications.length > 0 ? [
          new Paragraph({
            children: [
              new TextRun({
                text: "Certifications: ",
                bold: true,
              }),
              new TextRun(resumeData.skills.certifications.join(", ")),
            ],
          }),
        ] : []),
      ],
    }],
  });

  return await Packer.toBlob(doc);
};

export const generatePDFFromElement = async (element: HTMLElement): Promise<Blob> => {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf.output('blob');
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
