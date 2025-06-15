import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Clock, Brain, Target, Star, Award, Video, Mic, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

interface InterviewModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'technical' | 'behavioral' | 'case-study' | 'presentation';
  completed: boolean;
  score?: number;
}

const MockInterview = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const interviewModules: InterviewModule[] = [
    {
      id: '1',
      title: '技術面試 - 前端開發',
      description: 'React, JavaScript, HTML/CSS 相關技術問題，包含編程挑戰和系統設計',
      duration: '45分鐘',
      difficulty: 'intermediate',
      category: 'technical',
      completed: true,
      score: 85
    },
    {
      id: '2',
      title: '行為面試 - 領導力與團隊合作',
      description: 'STAR方法回答，領導經驗分享，衝突解決案例分析',
      duration: '30分鐘',
      difficulty: 'beginner',
      category: 'behavioral',
      completed: true,
      score: 92
    },
    {
      id: '3',
      title: '案例研究 - 產品策略',
      description: '產品分析、市場策略、用戶需求評估，適合產品經理職位',
      duration: '60分鐘',
      difficulty: 'advanced',
      category: 'case-study',
      completed: false
    },
    {
      id: '4',
      title: '技術簡報 - 系統架構設計',
      description: '5分鐘技術簡報，解釋複雜系統架構設計思路',
      duration: '15分鐘',
      difficulty: 'advanced',
      category: 'presentation',
      completed: false
    },
    {
      id: '5',
      title: '行為面試 - 挫折與成長',
      description: '面對挫折的處理方式，從失敗中學習的經驗分享',
      duration: '25分鐘',
      difficulty: 'beginner',
      category: 'behavioral',
      completed: false
    },
    {
      id: '6',
      title: '技術面試 - 後端開發',
      description: 'Node.js, 資料庫設計, API開發，系統效能優化',
      duration: '50分鐘',
      difficulty: 'intermediate',
      category: 'technical',
      completed: false
    }
  ];

  const categories = [
    { id: 'all', label: '全部', icon: Target },
    { id: 'technical', label: '技術面試', icon: Brain },
    { id: 'behavioral', label: '行為面試', icon: Users },
    { id: 'case-study', label: '案例研究', icon: Award },
    { id: 'presentation', label: '簡報展示', icon: Video }
  ];

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-700">初級</Badge>;
      case 'intermediate':
        return <Badge className="bg-orange-100 text-orange-700">中級</Badge>;
      case 'advanced':
        return <Badge className="bg-red-100 text-red-700">高級</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Brain className="h-4 w-4" />;
      case 'behavioral':
        return <Users className="h-4 w-4" />;
      case 'case-study':
        return <Award className="h-4 w-4" />;
      case 'presentation':
        return <Video className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const filteredModules = selectedCategory === 'all' 
    ? interviewModules 
    : interviewModules.filter(module => module.category === selectedCategory);

  const completedCount = interviewModules.filter(m => m.completed).length;
  const averageScore = interviewModules
    .filter(m => m.completed && m.score)
    .reduce((sum, m) => sum + (m.score || 0), 0) / 
    interviewModules.filter(m => m.completed && m.score).length;

  const handleStartInterview = (moduleId: string) => {
    navigate(`/student/mock-interview-session/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="模擬面試" />
      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl py-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">{completedCount}</div>
                  <p className="text-sm text-muted-foreground">已完成</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">{averageScore ? Math.round(averageScore) : 0}</div>
                  <p className="text-sm text-muted-foreground">平均分數</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">120</div>
                  <p className="text-sm text-muted-foreground">練習分鐘</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">技能驗證</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                整體進度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>完成進度</span>
                  <span>{completedCount}/{interviewModules.length} 模組</span>
                </div>
                <Progress value={(completedCount / interviewModules.length) * 100} />
                <p className="text-sm text-muted-foreground">
                  繼續練習以提升您的面試技能和信心
                </p>
              </div>
            </CardContent>
          </Card>

          {/* AI Features Highlight */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Brain className="h-5 w-5" />
                AI 驅動的智能面試平台
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <Target className="h-8 w-8 mx-auto text-blue-600" />
                  <h3 className="font-semibold text-blue-800">技能驗證</h3>
                  <p className="text-sm text-blue-600">驗證特定職位所需技能</p>
                </div>
                <div className="space-y-2">
                  <Brain className="h-8 w-8 mx-auto text-purple-600" />
                  <h3 className="font-semibold text-purple-800">智能面試</h3>
                  <p className="text-sm text-purple-600">數據驅動的面試評估</p>
                </div>
                <div className="space-y-2">
                  <Users className="h-8 w-8 mx-auto text-green-600" />
                  <h3 className="font-semibold text-green-800">24/7 練習</h3>
                  <p className="text-sm text-green-600">隨時隨地進行面試練習</p>
                </div>
                <div className="space-y-2">
                  <Award className="h-8 w-8 mx-auto text-orange-600" />
                  <h3 className="font-semibold text-orange-800">即時反饋</h3>
                  <p className="text-sm text-orange-600">AI 分析並提供改進建議</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Interview Modules */}
          <div className="grid gap-4">
            {filteredModules.map((module) => (
              <Card key={module.id} className={`transition-all hover:shadow-md ${module.completed ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(module.category)}
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        {module.completed && (
                          <Badge className="bg-green-100 text-green-700">
                            <Star className="h-3 w-3 mr-1" />
                            已完成
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground">{module.description}</p>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                        </div>
                        {getDifficultyBadge(module.difficulty)}
                        {module.completed && module.score && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            分數: {module.score}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      <Button 
                        onClick={() => handleStartInterview(module.id)}
                        className="flex items-center gap-2"
                        variant={module.completed ? "outline" : "default"}
                      >
                        <Play className="h-4 w-4" />
                        {module.completed ? '重新練習' : '開始面試'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MockInterview;