import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Video, VideoOff, Clock, Brain, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";

interface Question {
  id: string;
  text: string;
  timeLimit: number;
  hint?: string;
}

interface MockInterviewSessionProps {
  moduleId?: string;
}

const MockInterviewSession: React.FC<MockInterviewSessionProps> = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes per question
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mock questions based on module type
  const questions: Question[] = [
    {
      id: "1",
      text: "請介紹一下您自己，並說明為什麼您想要這個職位？",
      timeLimit: 120,
      hint: "包含教育背景, 提到相關經驗, 展現對職位的熱忱"
    },
    {
      id: "2",
      text: "描述一個您在團隊中遇到的挑戰，以及您是如何解決的？",
      timeLimit: 180,
      hint: "使用STAR方法, 具體說明您的角色, 強調最終結果"
    },
    {
      id: "3",
      text: "在React中，useState和useEffect的主要用途是什麼？請舉例說明。",
      timeLimit: 240,
      hint: "說明hook的概念, 提供實際代碼例子, 解釋最佳實踐"
    },
    {
      id: "4",
      text: "如果您需要在6個月內學習一項新技術，您會如何制定學習計劃？",
      timeLimit: 150,
      hint: "制定階段性目標, 提到實際操作, 說明評估方法"
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    if (sessionStarted && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleNextQuestion();
    }
  }, [sessionStarted, timeRemaining]);

  useEffect(() => {
    if (videoEnabled) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [videoEnabled]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: audioEnabled
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "無法存取攝影機",
        description: "請確認您已授予攝影機存取權限",
        variant: "destructive"
      });
      setVideoEnabled(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = () => {
    setSessionStarted(true);
    setTimeRemaining(currentQuestion.timeLimit);
    toast({
      title: "面試開始",
      description: "請開始回答第一個問題，放輕鬆並展現您的最佳狀態！"
    });
  };

  const handleNextQuestion = () => {
    // Save current answer
    setAnswers(prev => [...prev, currentAnswer]);
    setCurrentAnswer("");

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeRemaining(questions[currentQuestionIndex + 1].timeLimit);
      toast({
        title: "下一題",
        description: `第 ${currentQuestionIndex + 2} 題，請繼續保持！`
      });
    } else {
      // Interview completed
      handleCompleteInterview();
    }
  };

  const handleCompleteInterview = () => {
    toast({
      title: "面試完成！",
      description: "正在分析您的表現，請稍候...",
    });
    
    // Simulate AI processing time
    setTimeout(() => {
      navigate(`/student/mock-interview-result/${moduleId}`, {
        state: { answers, questions }
      });
    }, 2000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "開始錄音",
        description: "AI正在分析您的語音表達"
      });
    }
  };

  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <PageHeader title="模擬面試進行中" />
        <div className="container mx-auto px-4 max-w-4xl py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Brain className="h-6 w-6" />
                模擬面試即將開始
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg">您將回答 <strong>{totalQuestions}</strong> 個問題</p>
                <p className="text-muted-foreground">
                  每個問題都有時間限制，請在時間內盡量完整地回答
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-center gap-2 p-4 border rounded-lg">
                  <Video className={videoEnabled ? "h-5 w-5 text-green-500" : "h-5 w-5 text-gray-400"} />
                  <span>攝影機</span>
                  <Button
                    variant={videoEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVideo}
                  >
                    {videoEnabled ? "已開啟" : "已關閉"}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 p-4 border rounded-lg">
                  <Mic className={audioEnabled ? "h-5 w-5 text-green-500" : "h-5 w-5 text-gray-400"} />
                  <span>麥克風</span>
                  <Button
                    variant={audioEnabled ? "default" : "outline"}
                    size="sm"
                    onClick={toggleAudio}
                  >
                    {audioEnabled ? "已開啟" : "已關閉"}
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">面試提示：</h3>
                <ul className="text-left space-y-2 text-sm text-muted-foreground">
                  <li>• 保持放鬆，自然地表達您的想法</li>
                  <li>• 使用具體的例子來支持您的答案</li>
                  <li>• 注意時間管理，確保回答完整</li>
                  <li>• AI會分析您的表達方式和內容質量</li>
                </ul>
              </div>

              <Button 
                onClick={startSession}
                className="w-full md:w-auto px-8 py-3"
                disabled={!audioEnabled}
              >
                開始面試
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="模擬面試進行中" />
      <div className="container mx-auto px-4 max-w-4xl py-6">
        <div className="space-y-6">
          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>面試進度</span>
                  <span>{currentQuestionIndex + 1} / {totalQuestions}</span>
                </div>
                <Progress value={progress} />
              </div>
            </CardContent>
          </Card>

          {/* Current Question */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  問題 {currentQuestionIndex + 1}
                </CardTitle>
                <Badge variant="outline">{currentQuestion.hint}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-lg font-medium text-blue-900">
                    {currentQuestion.text}
                  </p>
                </div>

                {currentQuestion.hint && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      回答提示：
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {currentQuestion.hint.split(',').map((hint, index) => (
                        <li key={index}>• {hint.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recording Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-center gap-4">
                <Button
                  variant={isRecording ? "destructive" : "default"}
                  onClick={toggleRecording}
                  className="flex items-center gap-2"
                >
                  {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  {isRecording ? "停止錄音" : "開始錄音"}
                </Button>

                <Button
                  variant="outline"
                  onClick={toggleVideo}
                  className="flex items-center gap-2"
                >
                  {videoEnabled ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  攝影機
                </Button>

                <Button onClick={handleNextQuestion} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  {currentQuestionIndex === totalQuestions - 1 ? "完成面試" : "下一題"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video Preview */}
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {videoEnabled ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <VideoOff className="h-12 w-12 mb-2" />
                    <p>攝影機已關閉</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewSession;