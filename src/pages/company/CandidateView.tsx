import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Heart, Download, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const CandidateView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  // Mock candidate data
  const candidate = {
    id: "1",
    name: "張小明",
    school: "國立台灣大學",
    department: "資訊工程學系",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    personality: ["積極主動", "團隊合作", "細心負責", "學習能力強"],
    gpa: "3.8",
    experience: [
      { title: "前端實習生", company: "科技公司A", duration: "2023.06-2023.09" },
      { title: "專案助理", company: "新創公司B", duration: "2023.02-2023.05" }
    ],
    projects: [
      { name: "電商網站開發", tech: "React, Node.js", description: "完整的電商平台開發" },
      { name: "行動APP", tech: "React Native", description: "跨平台行動應用程式" }
    ],
    matchScore: 89
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleChat = () => {
    navigate(`/company/chat-with-candidate/${candidate.id}`);
  };

  const handleInviteInterview = () => {
    navigate(`/company/send-interview-invitation?candidateId=${candidate.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="TAGNOVA" 
        showBackButton={true}
        showHomeButton={true}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <img 
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-bold mb-1">{candidate.name}</h2>
                <p className="text-sm text-muted-foreground mb-1">{candidate.school}</p>
                <p className="text-sm text-muted-foreground mb-4">{candidate.department}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">配對度 {candidate.matchScore}%</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button onClick={handleChat} className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>聊天</span>
                  </Button>
                  <Button onClick={handleInviteInterview} variant="outline">
                    面試邀請
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">專業技能</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Personality */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">人格特質</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.personality.map((trait, index) => (
                  <Badge key={index} className="bg-purple-100 text-purple-700">{trait}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">工作經驗</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.duration}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">專案經驗</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {candidate.projects.map((project, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-1">{project.name}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                  <Badge variant="outline" className="text-xs">{project.tech}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CandidateView;