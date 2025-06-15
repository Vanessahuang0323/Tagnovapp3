import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    industry: "",
    companyDescription: "",
    workMode: "",
    password: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Navigate to company culture page
    navigate('/company/culture');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm">
        <div className="space-y-6">
          <div>
            <Label htmlFor="companyName" className="text-sm font-medium text-foreground">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="contactPerson" className="text-sm font-medium text-foreground">Contact Person</Label>
            <Input
              id="contactPerson"
              placeholder="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <div>
            <Label htmlFor="industry" className="text-sm font-medium text-foreground">Industry</Label>
            <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
              <SelectTrigger className="mt-1 bg-gray-100 border-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground">Company Description</Label>
            <Textarea
              id="description"
              placeholder="Company Description"
              value={formData.companyDescription}
              onChange={(e) => handleInputChange("companyDescription", e.target.value)}
              className="mt-1 bg-gray-100 border-0 resize-none"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="workMode" className="text-sm font-medium text-foreground">Work Mode</Label>
            <Select value={formData.workMode} onValueChange={(value) => handleInputChange("workMode", value)}>
              <SelectTrigger className="mt-1 bg-gray-100 border-0">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">Set Password / Third-party Login</Label>
            <Input
              id="password"
              placeholder="Set Password / Third-party Login"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="mt-1 bg-gray-100 border-0"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90 font-medium py-3 rounded-full mt-8"
          >
            Next
            <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;