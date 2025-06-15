import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const CompanyCulture = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    corporateCulture: "",
    companyOverview: "",
    logoFile: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({ ...prev, logoFile: file }));
  };

  const handleSubmit = () => {
    // Store company culture data and navigate to next step
    localStorage.setItem('companyCulture', JSON.stringify(formData));
    navigate('/company/register-complete');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm">
        <div className="space-y-6">
          <div>
            <Label htmlFor="corporateCulture" className="text-sm font-medium text-foreground">Corporate Culture</Label>
            <Textarea
              id="corporateCulture"
              placeholder="Corporate Culture"
              value={formData.corporateCulture}
              onChange={(e) => handleInputChange("corporateCulture", e.target.value)}
              className="mt-1 bg-gray-100 border-0 resize-none"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="companyOverview" className="text-sm font-medium text-foreground">Company overview</Label>
            <Textarea
              id="companyOverview"
              placeholder="Company overview"
              value={formData.companyOverview}
              onChange={(e) => handleInputChange("companyOverview", e.target.value)}
              className="mt-1 bg-gray-100 border-0 resize-none"
              rows={4}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground">Logo/Workplace environment</Label>
            <div className="mt-2 bg-gray-100 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-2">Upload images</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="logo-upload"
                onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
              />
              <Label htmlFor="logo-upload" className="cursor-pointer">
                <Button variant="outline" size="sm" className="mt-2 bg-white" asChild>
                  <span>Choose File</span>
                </Button>
              </Label>
              {formData.logoFile && (
                <p className="text-xs text-gray-600 mt-2">
                  Uploaded: {formData.logoFile.name}
                </p>
              )}
            </div>
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

export default CompanyCulture;