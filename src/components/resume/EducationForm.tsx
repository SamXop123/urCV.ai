
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User } from "lucide-react";
import { educationSchema, EducationValues } from "@/lib/validations";

interface EducationFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
  setIsValid?: (isValid: boolean) => void;
}

const EducationForm = ({ data, updateData, setIsValid }: EducationFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    },
  });

  const onSubmit = (values: EducationValues) => {
    const education = {
      id: Date.now().toString(),
      ...values,
    };
    updateData('education', [...data.education, education]);
    reset();
  };

  const removeEducation = (id: string) => {
    updateData('education', data.education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      {data.education.map((edu) => (
        <Card key={edu.id} className="p-4 border-l-4 border-l-blue-500 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h4>
              <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">{edu.location} • {edu.graduationDate}</p>
              {edu.gpa && <p className="text-sm text-gray-500 dark:text-gray-500">GPA: {edu.gpa}</p>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Education */}
      <Card className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Education</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree" className={errors.degree ? "text-red-500" : ""}>Degree</Label>
              <Input
                id="degree"
                {...register("degree")}
                placeholder="Bachelor of Science in Computer Science"
                className={`mt-1 ${errors.degree ? "border-red-500" : ""}`}
              />
              {errors.degree && <p className="text-xs text-red-500">{errors.degree.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="school" className={errors.school ? "text-red-500" : ""}>School</Label>
              <Input
                id="school"
                {...register("school")}
                placeholder="University of Technology"
                className={`mt-1 ${errors.school ? "border-red-500" : ""}`}
              />
              {errors.school && <p className="text-xs text-red-500">{errors.school.message}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Boston, MA"
                className={`mt-1 ${errors.location ? "border-red-500" : ""}`}
              />
              {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationDate" className={errors.graduationDate ? "text-red-500" : ""}>Graduation Date</Label>
              <Input
                id="graduationDate"
                {...register("graduationDate")}
                placeholder="May 2024"
                className={`mt-1 ${errors.graduationDate ? "border-red-500" : ""}`}
              />
              {errors.graduationDate && <p className="text-xs text-red-500">{errors.graduationDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa" className={errors.gpa ? "text-red-500" : ""}>GPA (Optional)</Label>
              <Input
                id="gpa"
                {...register("gpa")}
                placeholder="3.8"
                className={`mt-1 ${errors.gpa ? "border-red-500" : ""}`}
              />
              {errors.gpa && <p className="text-xs text-red-500">{errors.gpa.message}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Education
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EducationForm;
