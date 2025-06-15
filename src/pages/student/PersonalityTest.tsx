import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: "在團隊合作中，您通常扮演什麼角色？",
      options: [
        { value: "leader", label: "領導者 - 喜歡主導方向" },
        { value: "coordinator", label: "協調者 - 負責溝通協調" },
        { value: "executor", label: "執行者 - 專注完成任務" },
        { value: "supporter", label: "支持者 - 提供協助支援" }
      ]
    },
    {
      question: "面對壓力時，您的反應通常是？",
      options: [
        { value: "proactive", label: "主動應對 - 立即尋找解決方案" },
        { value: "analytical", label: "分析思考 - 先分析問題再行動" },
        { value: "collaborative", label: "尋求協助 - 與他人討論解決" },
        { value: "adaptive", label: "彈性調整 - 根據情況調整策略" }
      ]
    },
    {
      question: "您最喜歡的工作環境是？",
      options: [
        { value: "structured", label: "結構化 - 明確的流程和規範" },
        { value: "creative", label: "創意型 - 自由發揮創意空間" },
        { value: "collaborative", label: "協作型 - 團隊合作密切" },
        { value: "independent", label: "獨立型 - 可以獨立作業" }
      ]
    },
    {
      question: "學習新技能時，您偏好的方式是？",
      options: [
        { value: "hands-on", label: "實作學習 - 邊做邊學" },
        { value: "theoretical", label: "理論學習 - 先理解原理" },
        { value: "mentoring", label: "指導學習 - 有經驗者帶領" },
        { value: "self-directed", label: "自主學習 - 自己安排進度" }
      ]
    },
    {
      question: "在職場中，什麼對您最重要？",
      options: [
        { value: "achievement", label: "成就感 - 完成有意義的工作" },
        { value: "growth", label: "成長機會 - 持續學習發展" },
        { value: "stability", label: "穩定性 - 工作安全感" },
        { value: "impact", label: "影響力 - 能夠創造改變" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Save personality test results
      localStorage.setItem('personalityTestResults', JSON.stringify(answers));
      navigate('/student/photo-upload');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-foreground">人格特質測驗</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl p-4">
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <CardTitle>問題 {currentQuestion + 1} / {questions.length}</CardTitle>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
            
            <RadioGroup 
              value={answers[currentQuestion] || ""} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                上一題
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!answers[currentQuestion]}
              >
                {currentQuestion === questions.length - 1 ? '完成測驗' : '下一題'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalityTest;