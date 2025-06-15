import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [language] = useState<'zh' | 'en'>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'en' || stored === 'zh-TW') ? (stored === 'en' ? 'en' : 'zh') : 'zh';
  });

  const content = {
    zh: {
      name: "姓名",
      namePlaceholder: "請輸入您的全名",
      currentSchool: "目前學校",
      schoolPlaceholder: "請輸入您的學校名稱",
      degreeProgram: "學位課程",
      department: "科系 / 主修",
      departmentPlaceholder: "請輸入您的科系/主修",
      currentYear: "目前年級",
      email: "電子郵件",
      emailPlaceholder: "請輸入您的電子郵件地址",
      phoneNumber: "電話號碼",
      phonePlaceholder: "電話號碼",
      password: "設定密碼",
      passwordPlaceholder: "設定密碼",
      thirdPartyLogin: "第三方登入",
      next: "下一步",
      select: "請選擇",
      country: "國家",
      bachelor: "學士",
      master: "碩士",
      phd: "博士",
      year1: "一年級",
      year2: "二年級", 
      year3: "三年級",
      year4: "四年級",
      graduate: "研究生"
    },
    en: {
      name: "Name",
      namePlaceholder: "Please enter your full name",
      currentSchool: "Current School",
      schoolPlaceholder: "Please enter your school name",
      degreeProgram: "Degree Program",
      department: "Department / Major",
      departmentPlaceholder: "Please enter your department/major",
      currentYear: "Current Year Level",
      email: "Gmail",
      emailPlaceholder: "Enter your email address",
      phoneNumber: "Phone Number",
      phonePlaceholder: "Phone Number",
      password: "Set Password",
      passwordPlaceholder: "Set Password",
      thirdPartyLogin: "Third-party Login",
      next: "Next",
      select: "Select",
      country: "Country",
      bachelor: "Bachelor's",
      master: "Master's",
      phd: "PhD",
      year1: "Year 1",
      year2: "Year 2",
      year3: "Year 3", 
      year4: "Year 4",
      graduate: "Graduate"
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    currentSchool: "",
    degreeProgram: "",
    department: "",
    currentYear: "",
    email: "",
    phoneCountry: "",
    phoneNumber: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Store student registration data for later use
    localStorage.setItem('studentRegisterData', JSON.stringify(formData));
    // Navigate to photo upload step
    navigate('/student/photo-upload');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-foreground">{content[language].name}</Label>
            <Input
              id="name"
              placeholder={content[language].namePlaceholder}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="currentSchool" className="text-sm font-medium text-foreground">{content[language].currentSchool}</Label>
            <Input
              id="currentSchool"
              placeholder={content[language].schoolPlaceholder}
              value={formData.currentSchool}
              onChange={(e) => handleInputChange("currentSchool", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="degreeProgram" className="text-sm font-medium text-foreground">{content[language].degreeProgram}</Label>
            <Select value={formData.degreeProgram} onValueChange={(value) => handleInputChange("degreeProgram", value)}>
              <SelectTrigger className="mt-1 bg-gray-100 border-0">
                <SelectValue placeholder={content[language].select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bachelor">{content[language].bachelor}</SelectItem>
                <SelectItem value="master">{content[language].master}</SelectItem>
                <SelectItem value="phd">{content[language].phd}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="department" className="text-sm font-medium text-foreground">{content[language].department}</Label>
            <Input
              id="department"
              placeholder={content[language].departmentPlaceholder}
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="currentYear" className="text-sm font-medium text-foreground">{content[language].currentYear}</Label>
            <Select value={formData.currentYear} onValueChange={(value) => handleInputChange("currentYear", value)}>
              <SelectTrigger className="mt-1 bg-gray-100 border-0">
                <SelectValue placeholder={content[language].select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{content[language].year1}</SelectItem>
                <SelectItem value="2">{content[language].year2}</SelectItem>
                <SelectItem value="3">{content[language].year3}</SelectItem>
                <SelectItem value="4">{content[language].year4}</SelectItem>
                <SelectItem value="graduate">{content[language].graduate}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">{content[language].email}</Label>
            <Input
              id="email"
              placeholder={content[language].emailPlaceholder}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">{content[language].phoneNumber}</Label>
            <div className="flex gap-2 mt-1">
              <Select value={formData.phoneCountry} onValueChange={(value) => handleInputChange("phoneCountry", value)}>
                <SelectTrigger className="w-24 bg-gray-100 border-0">
                  <SelectValue placeholder={content[language].country} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+886">+886</SelectItem>
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+86">+86</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder={content[language].phonePlaceholder}
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="flex-1 bg-gray-100 border-0"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">{content[language].password}</Label>
            <Input
              id="password"
              placeholder={content[language].passwordPlaceholder}
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div className="pt-4">
            <p className="text-xs text-gray-500 text-right mb-4">{content[language].thirdPartyLogin}</p>
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-300 to-pink-300 text-gray-700 hover:opacity-90 font-medium py-3 rounded-full"
            >
              {content[language].next}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;