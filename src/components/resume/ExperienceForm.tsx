
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User } from "lucide-react";
import { experienceSchema, ExperienceValues } from "@/lib/validations";

interface ExperienceFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
  setIsValid?: (isValid: boolean) => void;
}

const ExperienceForm = ({ data, updateData, setIsValid }: ExperienceFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ExperienceValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  const isCurrent = watch("current");

  const onSubmit = (values: ExperienceValues) => {
    const experience = {
      id: Date.now().toString(),
      ...values,
    };
    updateData('experience', [...data.experience, experience]);
    reset();
  };

  const removeExperience = (id: string) => {
    updateData('experience', data.experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience */}
      {data.experience.map((exp) => (
        <Card key={exp.id} className="p-4 border-l-4 border-l-purple-500 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{exp.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {exp.location} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{exp.description}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Experience */}
      <Card className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Experience</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>Job Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Software Engineer"
                className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className={errors.company ? "text-red-500" : ""}>Company</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Tech Corp"
                className={`mt-1 ${errors.company ? "border-red-500" : ""}`}
              />
              {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="San Francisco, CA"
              className={`mt-1 ${errors.location ? "border-red-500" : ""}`}
            />
            {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className={errors.startDate ? "text-red-500" : ""}>Start Date</Label>
              <Input
                id="startDate"
                {...register("startDate")}
                placeholder="January 2023"
                className={`mt-1 ${errors.startDate ? "border-red-500" : ""}`}
              />
              {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className={errors.endDate ? "text-red-500" : ""}>End Date</Label>
              <Input
                id="endDate"
                {...register("endDate")}
                placeholder="December 2023"
                disabled={isCurrent}
                className={`mt-1 ${errors.endDate ? "border-red-500" : ""}`}
              />
              {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              {...register("current")}
              onCheckedChange={(checked) => {
                const e = { target: { name: "current", value: checked } };
                register("current").onChange(e as any);
              }}
            />
            <Label htmlFor="current" className="text-sm">
              I currently work here
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>Job Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your responsibilities and achievements..."
              className={`mt-1 min-h-[100px] ${errors.description ? "border-red-500" : ""}`}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add Experience
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ExperienceForm;
