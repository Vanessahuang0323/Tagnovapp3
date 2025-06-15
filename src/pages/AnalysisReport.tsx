import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const AnalysisReport = () => {
  const navigate = useNavigate();
  const [professionalSkills] = useState([
    "JavaScript", "React", "Node.js", "Python", "Git"
  ]);
  const [coreStrengths] = useState([
    "Problem solving", "Team collaboration", "Quick learning", "Attention to detail"
  ]);

  const handleAddMoreLabels = () => {
    // Navigate to a form or modal to add more skills/strengths
    console.log('Add more labels');
  };

  const handleChatWithAgent = () => {
    navigate('/student/chat');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm">
        <div className="space-y-6">
          {/* Resume Highlights Summary */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center">
            <h2 className="text-lg font-semibold text-gray-800">Resume Highlights Summary</h2>
          </div>

          {/* Professional Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-foreground">Professional Skills</h3>
            </div>
            
            <div className="space-y-3">
              {professionalSkills.map((skill, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{skill}</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-purple-400 rounded-full" 
                        style={{ width: `${Math.random() * 40 + 60}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Strengths Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-foreground">Core Strengths</h3>
            </div>
            
            <div className="space-y-3">
              {coreStrengths.map((strength, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{strength}</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-400 rounded-full" 
                        style={{ width: `${Math.random() * 30 + 70}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add More Labels Button */}
          <div className="text-center">
            <Button
              variant="outline"
              className="rounded-full px-6 py-2 text-sm border-gray-300"
              onClick={handleAddMoreLabels}
            >
              # add more labels
            </Button>
          </div>

          {/* Chat with AI Agent Button */}
          <div className="pb-8">
            <Button 
              onClick={handleChatWithAgent}
              className="w-full bg-gradient-to-r from-purple-300 to-pink-300 text-gray-700 hover:opacity-90 font-medium py-3 rounded-full"
            >
              Chat with your AI Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;