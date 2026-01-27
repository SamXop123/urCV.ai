import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Briefcase, 
  Users, 
  Target, 
  Lightbulb, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const interviewQuestions = {
  general: [
    {
      question: "Tell me about yourself.",
      answer: "Provide a concise summary of your professional background, highlighting key experiences and achievements relevant to the position. Keep it to 2-3 minutes.",
      category: "general",
      difficulty: "easy"
    },
    {
      question: "What are your greatest strengths?",
      answer: "Focus on 2-3 key strengths that are relevant to the job. Provide specific examples of how you've demonstrated these strengths in previous roles.",
      category: "general",
      difficulty: "easy"
    },
    {
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness that you're actively working to improve. Show self-awareness and demonstrate steps you're taking to address it.",
      category: "general",
      difficulty: "medium"
    },
    {
      question: "Why do you want to work here?",
      answer: "Research the company beforehand. Mention specific aspects that appeal to you - company culture, values, products, or opportunities for growth.",
      category: "general",
      difficulty: "medium"
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition while being realistic. Connect your goals to the company's growth opportunities and demonstrate commitment to your field.",
      category: "general",
      difficulty: "medium"
    }
  ],
  behavioral: [
    {
      question: "Tell me about a time you faced a challenge at work.",
      answer: "Use the STAR method: Situation, Task, Action, Result. Describe the context, what you needed to do, actions you took, and positive outcomes.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Describe a situation where you had to work with a difficult team member.",
      answer: "Focus on how you maintained professionalism, found common ground, and achieved project goals despite interpersonal challenges.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Tell me about a time you failed at something.",
      answer: "Be honest and take responsibility. Focus on what you learned from the experience and how it helped you grow professionally.",
      category: "behavioral",
      difficulty: "hard"
    },
    {
      question: "Describe a situation where you took initiative.",
      answer: "Highlight times you went beyond your job description, identified problems, and implemented solutions without being asked.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Tell me about a time you had to meet a tight deadline.",
      answer: "Demonstrate your time management skills, prioritization abilities, and how you handle pressure while maintaining quality.",
      category: "behavioral",
      difficulty: "medium"
    }
  ],
  technical: [
    {
      question: "What technical skills do you consider your strongest?",
      answer: "List specific technologies, tools, or methodologies. Provide examples of projects where you've applied these skills successfully.",
      category: "technical",
      difficulty: "easy"
    },
    {
      question: "How do you stay updated with the latest technology trends?",
      answer: "Mention blogs, courses, conferences, or communities you follow. Show genuine passion for continuous learning.",
      category: "technical",
      difficulty: "easy"
    },
    {
      question: "Describe a complex technical problem you solved.",
      answer: "Explain the problem, your approach to solving it, technical challenges faced, and the final solution with its impact.",
      category: "technical",
      difficulty: "hard"
    },
    {
      question: "How do you ensure code quality and maintainability?",
      answer: "Discuss code reviews, testing, documentation, and best practices you follow to write clean, maintainable code.",
      category: "technical",
      difficulty: "medium"
    },
    {
      question: "What's your experience with [specific technology]?",
      answer: "Be honest about your experience level. Provide examples of projects and explain how you've used the technology effectively.",
      category: "technical",
      difficulty: "varies"
    }
  ],
  situational: [
    {
      question: "What would you do if you disagreed with your manager's decision?",
      answer: "Show respect for authority while demonstrating your ability to communicate constructively. Emphasize finding common ground.",
      category: "situational",
      difficulty: "hard"
    },
    {
      question: "How would you handle multiple competing priorities?",
      answer: "Demonstrate your prioritization skills, ability to communicate with stakeholders, and time management strategies.",
      category: "situational",
      difficulty: "medium"
    },
    {
      question: "What would you do if you made a mistake that affected the team?",
      answer: "Show accountability, quick communication, problem-solving skills, and focus on solutions rather than blame.",
      category: "situational",
      difficulty: "medium"
    },
    {
      question: "How would you handle a project that's falling behind schedule?",
      answer: "Discuss assessment, communication, prioritization, and collaborative problem-solving approaches.",
      category: "situational",
      difficulty: "hard"
    },
    {
      question: "What would you do if you didn't know how to complete a task?",
      answer: "Show resourcefulness, willingness to learn, and ability to seek help appropriately while taking initiative.",
      category: "situational",
      difficulty: "easy"
    }
  ]
};

const categoryIcons = {
  general: Users,
  behavioral: Target,
  technical: Lightbulb,
  situational: Briefcase
};

const categoryColors = {
  general: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  behavioral: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  technical: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  situational: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
};

const difficultyColors = {
  easy: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  hard: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
};

const InterviewQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const allQuestions = Object.entries(interviewQuestions).flatMap(([category, questions]) =>
    questions.map(q => ({ ...q, category }))
  );

  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Interview Questions
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Master Your Interview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive collection of interview questions with expert answers to help you prepare and succeed
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>All Categories</span>
            </Button>
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2 capitalize"
              >
                <Icon className="w-4 h-4" />
                <span>{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No questions found matching your criteria.</p>
            </div>
          ) : (
            filteredQuestions.map((item, index) => {
              const Icon = categoryIcons[item.category];
              const isExpanded = expandedQuestions.has(index);
              
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <Badge className={categoryColors[item.category]}>
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className={difficultyColors[item.difficulty]}>
                            {item.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.question}
                        </h3>
                      </div>
                      <Button variant="ghost" size="sm">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Pro Interview Tips 💡
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-blue-800 dark:text-blue-200">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Research the company and role thoroughly before the interview</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Practice the STAR method for behavioral questions</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Prepare thoughtful questions to ask the interviewer</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Follow up with a thank-you email within 24 hours</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
