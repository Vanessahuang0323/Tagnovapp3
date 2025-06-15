import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";

interface Education {
  school: string;
  degree: string;
  major: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

const ResumeCompletion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load previous registration data
  const [formData, setFormData] = useState(() => {
    const savedRegisterData = localStorage.getItem('studentRegisterData');
    if (savedRegisterData) {
      const registerData = JSON.parse(savedRegisterData);
      return {
        fullName: registerData.name || "",
        email: registerData.email || "",
        phone: registerData.phoneCountry + registerData.phoneNumber || "",
        summary: ""
      };
    }
    return {
      fullName: "",
      email: "",
      phone: "",
      summary: ""
    };
  });

  // Load previous registration data for education
  const [education, setEducation] = useState<Education[]>(() => {
    const savedRegisterData = localStorage.getItem('studentRegisterData');
    if (savedRegisterData) {
      const registerData = JSON.parse(savedRegisterData);
      return [{
        school: registerData.currentSchool || "",
        degree: registerData.degreeProgram || "",
        major: registerData.department || "",
        startYear: "",
        endYear: "",
        gpa: ""
      }];
    }
    return [{ school: "", degree: "", major: "", startYear: "", endYear: "", gpa: "" }];
  });

  const [experience, setExperience] = useState<Experience[]>([
    { title: "", company: "", startDate: "", endDate: "", description: "", current: false }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setEducation(prev => prev.map((edu, i) => 
      i === index ? { ...edu, [field]: value } : edu
    ));
  };

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    setExperience(prev => prev.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation(prev => [...prev, { school: "", degree: "", major: "", startYear: "", endYear: "", gpa: "" }]);
  };

  const removeEducation = (index: number) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience(prev => [...prev, { title: "", company: "", startDate: "", endDate: "", description: "", current: false }]);
  };

  const removeExperience = (index: number) => {
    setExperience(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "請填寫必要資訊",
        description: "姓名、電子郵件和電話為必填欄位",
        variant: "destructive"
      });
      return;
    }

    // Store resume data
    localStorage.setItem('resumeData', JSON.stringify({ formData, education, experience }));
    toast({
      title: "履歷資料已保存",
      description: "您的履歷資料已成功保存",
    });
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">確認並完善履歷資料</h2>
            <p className="text-sm text-muted-foreground">請確認之前填寫的基本資料，並補充教育背景和工作經驗</p>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">基本資料確認</h3>
            
            <div>
              <Label htmlFor="fullName">姓名 *</Label>
              <Input
                id="fullName"
                placeholder="請輸入您的全名"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            <div>
              <Label htmlFor="email">電子郵件 *</Label>
              <Input
                id="email"
                type="email"
                placeholder="請輸入您的電子郵件"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            <div>
              <Label htmlFor="phone">電話 *</Label>
              <Input
                id="phone"
                placeholder="請輸入您的電話號碼"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-1 bg-gray-100 border-0"
              />
            </div>

            <div>
              <Label htmlFor="summary">個人簡介</Label>
              <Textarea
                id="summary"
                placeholder="簡短介紹您的背景和目標"
                value={formData.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                className="mt-1 bg-gray-100 border-0 resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">教育背景</h3>
              <Button variant="outline" size="sm" onClick={addEducation}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {education.map((edu, index) => (
              <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">教育經歷 {index + 1}</span>
                  {education.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="學校名稱"
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                    className="bg-white border-0"
                  />
                  <Input
                    placeholder="學位"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    className="bg-white border-0"
                  />
                </div>

                <Input
                  placeholder="主修科系"
                  value={edu.major}
                  onChange={(e) => handleEducationChange(index, "major", e.target.value)}
                  className="bg-white border-0"
                />

                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="開始年份"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(index, "startYear", e.target.value)}
                    className="bg-white border-0"
                  />
                  <Input
                    placeholder="結束年份"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(index, "endYear", e.target.value)}
                    className="bg-white border-0"
                  />
                  <Input
                    placeholder="GPA (選填)"
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(index, "gpa", e.target.value)}
                    className="bg-white border-0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">工作經驗</h3>
              <Button variant="outline" size="sm" onClick={addExperience}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {experience.map((exp, index) => (
              <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">工作經驗 {index + 1}</span>
                  {experience.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="職位名稱"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    className="bg-white border-0"
                  />
                  <Input
                    placeholder="公司名稱"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="bg-white border-0"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="date"
                    placeholder="開始日期"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                    className="bg-white border-0"
                  />
                  <Input
                    type="date"
                    placeholder="結束日期"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                    className="bg-white border-0"
                    disabled={exp.current}
                  />
                </div>

                <Textarea
                  placeholder="工作內容描述"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                  className="bg-white border-0 resize-none"
                  rows={2}
                />
              </div>
            ))}
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90 font-medium py-3 rounded-full"
          >
            下一步
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCompletion;