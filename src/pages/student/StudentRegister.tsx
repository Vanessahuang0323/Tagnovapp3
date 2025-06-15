import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentRegister: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    school: "",
    department: "",
    year: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Handle form submission
    navigate('/student/personality-test');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t('student.register.title')} />

      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">{t('student.register.name')}</Label>
            <Input
              id="name"
              placeholder={t('student.register.name')}
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="school">{t('student.register.school')}</Label>
            <Input
              id="school"
              placeholder={t('student.register.school')}
              value={formData.school}
              onChange={(e) => handleInputChange("school", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="department">{t('student.register.department')}</Label>
            <Input
              id="department"
              placeholder={t('student.register.department')}
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="year">{t('student.register.year')}</Label>
            <Select
              value={formData.year}
              onValueChange={(value) => handleInputChange("year", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('common.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1st Year</SelectItem>
                <SelectItem value="2">2nd Year</SelectItem>
                <SelectItem value="3">3rd Year</SelectItem>
                <SelectItem value="4">4th Year</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="email">{t('student.register.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('student.register.email')}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">{t('student.register.phone')}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t('student.register.phone')}
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">{t('student.register.password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t('student.register.password')}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            {t('common.next')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister; 