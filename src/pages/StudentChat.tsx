import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface StudentChatProps {
  flowType?: 'with-portfolio' | 'without-portfolio';
}

const StudentChat: React.FC<StudentChatProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  // Get flow type from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const flowType = urlParams.get("flow") || "with-portfolio";

  const conversationFlows = {
    "with-portfolio": [
      {
        botMessage: "歡迎來到 Tagnova！我是您的 AI 職涯顧問。讓我們開始了解您的求職需求吧！",
        question: "想尋找的產業類型及職缺是什麼？"
      },
      {
        botMessage: "很好！基於您的作品集和專案經驗，我將為您搜尋最適合的職位。",
        question: "請稍候，正在分析您的技能並搜尋適配職缺..."
      }
    ],
    "without-portfolio": [
      {
        botMessage: "歡迎來到 Tagnova！我是您的 AI 職涯顧問。",
        question: "有無社團經驗或其他豐富的在校經驗？請告訴我您的相關經歷。"
      },
      {
        botMessage: "謝謝您的分享！基於您的在校經驗，我將為您推薦合適的職位。",
        question: "請稍候，正在搜尋適配職缺..."
      }
    ]
  };

  useEffect(() => {
    // Initialize conversation
    const flow = conversationFlows[flowType as keyof typeof conversationFlows];
    if (flow && flow[0]) {
      const initialMessage: Message = {
        id: "1",
        text: flow[0].botMessage,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      
      setTimeout(() => {
        const questionMessage: Message = {
          id: "2",
          text: flow[0].question,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, questionMessage]);
      }, 1000);
    }
  }, [flowType]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const flow = conversationFlows[flowType as keyof typeof conversationFlows];
      const nextStep = currentStep + 1;
      
      if (nextStep < flow.length) {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: flow[nextStep].botMessage,
          sender: "bot",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);

        setTimeout(() => {
          const questionMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: flow[nextStep].question,
            sender: "bot",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, questionMessage]);
        }, 1000);

        setCurrentStep(nextStep);
      } else {
        // Conversation completed, redirect to job cards
        setTimeout(() => {
          window.location.href = "/job-cards";
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="AI 職涯顧問" />

      <div className="flex-1 container mx-auto max-w-2xl p-4 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              職涯對話
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender === "bot" ? "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop" : "https://images.unsplash.com/photo-1494790108755-2616b93a65f6?w=150&h=150&fit=crop"} />
                      <AvatarFallback>
                        {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="輸入您的回覆..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentChat;