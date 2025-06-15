import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Star, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SwipeStack from "@/components/SwipeStack";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  image: string;
  matchPercentage: number;
  bio: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "林佳穎",
    title: "前端工程師",
    company: "創新科技公司",
    location: "台北市信義區",
    experience: "3 年經驗",
    education: "台灣大學資工系",
    skills: ["React", "TypeScript", "Node.js", "Python", "Git", "Docker", "AWS", "GraphQL"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 95,
    bio: "熱愛前端開發，專精於 React 生態系統。具備良好的溝通協調能力，熟悉敏捷開發流程。喜歡學習新技術，對 UI/UX 設計有獨特見解。"
  },
  {
    id: "2",
    name: "陳建宏",
    title: "全端工程師",
    company: "新創科技公司",
    location: "台北市大安區",
    experience: "5 年經驗",
    education: "清華大學電機系",
    skills: ["Vue.js", "Laravel", "MySQL", "Redis", "Kubernetes", "CI/CD", "Microservices"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 88,
    bio: "全端開發專家，具備豐富的系統架構設計經驗。熟悉雲端部署與 DevOps 流程，注重程式碼品質與性能優化。"
  },
  {
    id: "3",
    name: "王美慧",
    title: "UI/UX 設計師",
    company: "數位設計工作室",
    location: "台北市松山區",
    experience: "4 年經驗",
    education: "實踐大學設計系",
    skills: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping", "User Research", "Design System"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 92,
    bio: "專注於使用者體驗設計，擅長從使用者需求出發設計直觀易用的介面。具備豐富的跨平台設計經驗，熟悉設計系統建構。"
  },
  {
    id: "4",
    name: "張志偉",
    title: "資料科學家",
    company: "AI 科技公司",
    location: "新竹科學園區",
    experience: "6 年經驗",
    education: "台灣大學統計碩士",
    skills: ["Python", "R", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "SQL", "Tableau"],
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 85,
    bio: "資料科學與機器學習專家，具備豐富的大數據分析經驗。熟悉各種演算法模型，能將複雜數據轉化為商業洞察。"
  },
  {
    id: "5",
    name: "李雅婷",
    title: "產品經理",
    company: "電商平台",
    location: "台北市中山區",
    experience: "4 年經驗",
    education: "政治大學企管系",
    skills: ["Product Strategy", "User Analytics", "Agile", "Scrum", "A/B Testing", "Roadmap Planning"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 90,
    bio: "具備敏銳的市場洞察力與產品思維，擅長跨團隊協作與專案管理。熟悉數據驅動的產品優化流程，注重使用者體驗。"
  },
  {
    id: "6",
    name: "劉宗翰",
    title: "DevOps 工程師",
    company: "雲端服務公司",
    location: "台北市內湖區",
    experience: "5 年經驗",
    education: "交通大學資工系",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform", "Monitoring", "Linux", "Ansible"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 87,
    bio: "雲端基礎設施與自動化部署專家，熟悉各種 DevOps 工具與最佳實踐。具備大型系統運維經驗，注重系統穩定性與安全性。"
  },
  {
    id: "7",
    name: "徐筱涵",
    title: "行銷專員",
    company: "品牌行銷公司",
    location: "台北市中正區",
    experience: "3 年經驗",
    education: "輔仁大學新聞系",
    skills: ["Digital Marketing", "SEO/SEM", "Social Media", "Content Creation", "Analytics", "Campaign Management"],
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=600&fit=crop&crop=face",
    matchPercentage: 83,
    bio: "數位行銷專家，擅長整合行銷策略規劃與執行。熟悉各種數位行銷工具，具備優秀的內容創作與社群經營能力。"
  }
];

const TalentCards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [likedCandidates, setLikedCandidates] = useState<Candidate[]>([]);
  const [passedCandidates, setPassedCandidates] = useState<Candidate[]>([]);

  const handleLike = (candidate: Candidate) => {
    setLikedCandidates(prev => [...prev, candidate]);
    // 可以在這裡添加 API 調用來保存收藏
  };

  const handlePass = (candidate: Candidate) => {
    setPassedCandidates(prev => [...prev, candidate]);
    // 可以在這裡添加 API 調用來記錄略過
  };

  const handleComplete = () => {
    toast({
      title: "瀏覽完成！",
      description: `您收藏了 ${likedCandidates.length} 位候選人`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <PageHeader title="人才配對" />

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-6 py-8 max-w-sm">
        {/* Recommendation Header */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">智能人才推薦</h2>
          <p className="text-sm text-gray-600">
            根據您的需求為您推薦了 {mockCandidates.length} 位優質候選人
          </p>
        </div>

        {/* Swipe Stack */}
        <SwipeStack
          candidates={mockCandidates}
          onLike={handleLike}
          onPass={handlePass}
          onComplete={handleComplete}
        />
      </div>

      {/* Bottom Navigation */}
      <div className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-sm px-6 py-4">
          <div className="flex justify-around">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex flex-col items-center space-y-1 text-blue-600"
            >
              <Star className="h-5 w-5 fill-current" />
              <span className="text-xs">智能配對</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex flex-col items-center space-y-1 text-gray-400"
              onClick={() => navigate('/company/chat-list')}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs">聊天室</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="flex flex-col items-center space-y-1 text-gray-400"
              onClick={() => navigate('/company/saved-candidates')}
            >
              <User className="h-5 w-5" />
              <span className="text-xs">收藏清單</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCards;