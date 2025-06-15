import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
}

const preTestQuestions: Question[] = [
  {
    id: "1",
    question: "您最喜歡的工作環境是？",
    options: ["安靜的個人空間", "開放式辦公室", "彈性遠端工作", "團隊協作空間"]
  },
  {
    id: "2", 
    question: "面對新技術學習，您的態度是？",
    options: ["積極主動學習", "需要時才學習", "團隊學習", "系統性學習"]
  },
  {
    id: "3",
    question: "您處理壓力的方式？",
    options: ["分解任務執行", "尋求同事協助", "暫停休息調整", "加班完成任務"]
  }
];

const JobApplication = () => {
  const [step, setStep] = useState(1); // 1: info, 2: pre-test, 3: submission
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const jobInfo = {
    company: "創新科技有限公司",
    position: "前端工程師",
    description: "我們正在尋找一位熱愛前端開發的工程師加入團隊。"
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < preTestQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep(3);
    }
  };

  const skipPreTest = () => {
    setStep(3);
  };

  const submitApplication = () => {
    setShowResults(true);
    // Simulate submission
    setTimeout(() => {
      window.location.href = "/job-cards";
    }, 3000);
  };

  const progress = ((currentQuestion + 1) / preTestQuestions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-4">應徵成功！</h2>
            <p className="text-muted-foreground mb-6">
              您的履歷已成功送出，企業將會在7個工作天內回覆您。
            </p>
            <div className="space-y-2">
              <Button className="w-full" onClick={() => window.location.href = "/job-cards"}>
                繼續尋找其他職位
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/analysis-report">查看應徵分析</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>應徵職位</CardTitle>
            <CardDescription>
              {jobInfo.company} - {jobInfo.position}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold">職位資訊</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">{jobInfo.position}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{jobInfo.company}</p>
                  <p className="text-sm">{jobInfo.description}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">前測說明</h4>
                  <p className="text-sm text-blue-700">
                    完成前測將有助於企業更好地了解您，提高面試成功率。前測為選填，您也可以選擇直接送出履歷。
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setStep(2)} className="flex-1">
                    參加前測
                  </Button>
                  <Button variant="outline" onClick={skipPreTest} className="flex-1">
                    直接應徵
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>前測進度</span>
                    <span>{currentQuestion + 1} / {preTestQuestions.length}</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">
                    問題 {currentQuestion + 1}: {preTestQuestions[currentQuestion].question}
                  </h3>
                  <RadioGroup
                    value={answers[preTestQuestions[currentQuestion].id] || ""}
                    onValueChange={(value) => 
                      handleAnswerChange(preTestQuestions[currentQuestion].id, value)
                    }
                  >
                    {preTestQuestions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                  >
                    上一題
                  </Button>
                  <Button 
                    onClick={nextQuestion}
                    disabled={!answers[preTestQuestions[currentQuestion].id]}
                  >
                    {currentQuestion === preTestQuestions.length - 1 ? "完成測驗" : "下一題"}
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold">確認應徵</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">應徵摘要</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>職位：</strong>{jobInfo.position}</p>
                    <p><strong>公司：</strong>{jobInfo.company}</p>
                    <p><strong>前測完成：</strong>
                      {Object.keys(answers).length > 0 ? "是" : "否"}
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">預計回覆時間</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    企業通常會在7個工作天內回覆您的應徵。
                  </p>
                </div>
                <Button onClick={submitApplication} className="w-full">
                  確認送出應徵
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobApplication;