import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageCircle, Eye, Star, Heart, MapPin, Briefcase, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

const SavedCandidates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock saved candidates data - matches TalentCards data
  const savedCandidates = [
    {
      id: "1",
      name: "林佳穎",
      school: "台灣大學",
      department: "資工系",
      photo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      skills: ["React", "TypeScript", "Node.js", "Python", "Git", "Docker"],
      matchScore: 95,
      savedDate: "2024-12-15",
      title: "前端工程師"
    },
    {
      id: "2", 
      name: "陳建宏",
      school: "清華大學",
      department: "電機系",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      skills: ["Vue.js", "Laravel", "MySQL", "Redis", "Kubernetes"],
      matchScore: 88,
      savedDate: "2024-12-14",
      title: "全端工程師"
    },
    {
      id: "3",
      name: "王美慧",
      school: "實踐大學", 
      department: "設計系",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      skills: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping"],
      matchScore: 92,
      savedDate: "2024-12-13",
      title: "UI/UX 設計師"
    },
    {
      id: "4",
      name: "張志偉",
      school: "台灣大學",
      department: "統計碩士",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      skills: ["Python", "R", "Machine Learning", "TensorFlow", "SQL"],
      matchScore: 85,
      savedDate: "2024-12-12",
      title: "資料科學家"
    }
  ];

  const filteredCandidates = savedCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewProfile = (candidateId: string) => {
    navigate(`/company/candidate-view/${candidateId}`);
  };

  const handleChat = (candidateId: string) => {
    navigate(`/company/chat-with-candidate/${candidateId}`);
  };

  const handleUnsave = (candidateId: string) => {
    // Remove from saved candidates logic
    console.log("Unsaved candidate:", candidateId);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">已收藏人才</h2>
            <p className="text-sm text-muted-foreground">管理您收藏的候選人列表</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋候選人或技能..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0"
            />
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            {filteredCandidates.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">沒有找到符合條件的候選人</p>
              </div>
            ) : (
              filteredCandidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Profile Image */}
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      
                      {/* Candidate Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg">{candidate.name}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleUnsave(candidate.id)}
                          >
                            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <p className="text-sm font-medium text-blue-600 mb-1">{candidate.title}</p>
                        <p className="text-sm text-muted-foreground mb-1">{candidate.school}</p>
                        <p className="text-sm text-muted-foreground mb-3">{candidate.department}</p>
                        
                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {candidate.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{candidate.skills.length - 3}</Badge>
                          )}
                        </div>
                        
                        {/* Match Score & Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{candidate.matchScore}% 配對</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProfile(candidate.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleChat(candidate.id)}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-2">
                          收藏於 {new Date(candidate.savedDate).toLocaleDateString('zh-TW')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Button 
            onClick={() => navigate('/company/talent-matching')}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90"
          >
            探索更多人才
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavedCandidates;