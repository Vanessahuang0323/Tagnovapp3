import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Star, TrendingUp, TrendingDown, Brain, Target, Award, Clock, CheckCircle2, AlertTriangle, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  overallScore: number;
  category: string;
  strengths: string[];
  improvements: string[];
  detailedScores: {
    content: number;
    communication: number;
    confidence: number;
    technical: number;
  };
  recommendations: string[];
  nextSteps: string[];
}

const MockInterviewResult: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { moduleId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const results = {
    overallScore: 85,
    strengths: [
      "技術知識紮實",
      "表達清晰",
      "解決問題能力強"
    ],
    areasForImprovement: [
      "可以多分享實際案例",
      "建議加強團隊合作經驗的說明",
      "可以更深入討論技術細節"
    ],
    feedback: [
      {
        question: "請描述您最滿意的專案經驗",
        score: 90,
        feedback: "回答完整，清楚說明了專案的目標、過程和成果。建議可以多分享遇到的挑戰和解決方案。"
      },
      {
        question: "如何處理團隊衝突？",
        score: 80,
        feedback: "基本回答得當，但可以更具體地分享實際案例。建議準備2-3個具體的團隊合作經驗。"
      },
      {
        question: "您如何看待新技術的學習？",
        score: 85,
        feedback: "展現了積極學習的態度，建議可以分享具體的學習方法和成果。"
      }
    ]
  };

  // Mock AI analysis - in real app, this would come from AI processing
  useEffect(() => {
    const simulateAIAnalysis = async () => {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockResult: AnalysisResult = {
        overallScore: 78,
        category: "行為面試",
        strengths: [
          "回答結構清晰，使用STAR方法表達經驗",
          "語調自然，展現良好的溝通技巧",
          "具體的案例分享，展現實際解決問題的能力",
          "時間控制良好，回答完整且簡潔"
        ],
        improvements: [
          "可以更多強調量化成果和具體數據",
          "在描述團隊協作時可以更突出個人貢獻",
          "建議增加更多技術細節的說明",
          "可以展現更多主動性和領導力的例子"
        ],
        detailedScores: {
          content: 82,
          communication: 85,
          confidence: 72,
          technical: 75
        },
        recommendations: [
          "練習更多技術深度問題的回答",
          "準備更多量化成果的具體例子",
          "加強對行業趨勢和公司背景的了解",
          "提升非語言溝通技巧（眼神接觸、手勢等）"
        ],
        nextSteps: [
          "完成技術面試模組以提升技術表達能力",
          "參加案例研究練習以增強分析思維",
          "觀看面試技巧相關影片學習最佳實踐",
          "與導師或朋友進行模擬面試練習"
        ]
      };

      setResult(mockResult);
      setIsLoading(false);
    };

    simulateAIAnalysis();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-700">優秀</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-700">良好</Badge>;
    return <Badge className="bg-red-100 text-red-700">需改進</Badge>;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="py-4 px-4 border-b">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => navigate('/student/mock-interview')}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">🏷️</span>
                  </div>
                  <h1 className="text-xl font-bold text-foreground">TAGNOVA</h1>
                </div>
              </div>
              <h2 className="text-lg font-semibold">AI 分析中</h2>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-4xl py-8">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="space-y-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI 正在分析您的面試表現</h3>
                  <p className="text-muted-foreground">
                    我們的AI正在分析您的回答內容、溝通技巧和整體表現，請稍候...
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>分析進度</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-4 border-b">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/student/mock-interview')}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">🏷️</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">TAGNOVA</h1>
              </div>
            </div>
            <h2 className="text-lg font-semibold">面試結果分析</h2>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl p-4">
        {/* Overall Score */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
                <span className="text-3xl font-bold text-primary">{results.overallScore}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">整體表現評分</h3>
              <p className="text-muted-foreground">
                {results.overallScore >= 90 ? "表現優異" : 
                 results.overallScore >= 80 ? "表現良好" : 
                 results.overallScore >= 70 ? "表現尚可" : "需要加強"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Strengths and Areas for Improvement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                優勢
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                改進空間
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.areasForImprovement.map((area, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-1" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              詳細回饋
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {results.feedback.map((item, index) => (
                <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{item.question}</h4>
                    <Badge variant="outline" className="bg-primary/10">
                      得分：{item.score}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{item.feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={() => navigate('/student/mock-interview')}
            className="flex-1"
          >
            再次練習
          </Button>
          <Button
            onClick={() => navigate('/student/dashboard')}
            variant="outline"
            className="flex-1"
          >
            返回儀表板
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewResult;