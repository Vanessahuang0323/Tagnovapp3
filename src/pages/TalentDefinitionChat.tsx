import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
}

interface ChatResponse {
  message: string;
}

interface JobRequirement {
  title: string;
  department: string;
  skills: string[];
  experience: string;
  education: string;
  location: string;
  salary: string;
  benefits: string[];
}

interface ConversationStep {
  botMessage: string;
  question: string;
  options?: string[];
  field: keyof JobRequirement;
}

const conversationFlow: ConversationStep[] = [
  {
    botMessage: "歡迎使用 TAGNOVA 人才需求定義助手！讓我們一起定義您需要的人才。",
    question: "請告訴我您需要什麼職位的人才？",
    options: ["軟體工程師", "產品經理", "UI/UX 設計師", "其他"],
    field: "title"
  },
  {
    botMessage: "好的，接下來請告訴我這個職位屬於哪個部門？",
    question: "請選擇或輸入部門名稱：",
    options: ["研發部", "產品部", "設計部", "其他"],
    field: "department"
  },
  {
    botMessage: "了解，現在請告訴我這個職位需要哪些技能？",
    question: "請輸入所需的技能（用逗號分隔）：",
    field: "skills"
  },
  {
    botMessage: "很好，接下來請告訴我這個職位需要多少年的工作經驗？",
    question: "請選擇或輸入工作經驗要求：",
    options: ["1-3年", "3-5年", "5-10年", "10年以上"],
    field: "experience"
  },
  {
    botMessage: "了解，現在請告訴我這個職位的學歷要求？",
    question: "請選擇或輸入學歷要求：",
    options: ["高中", "專科", "大學", "碩士", "博士"],
    field: "education"
  },
  {
    botMessage: "好的，接下來請告訴我這個職位的工作地點？",
    question: "請選擇或輸入工作地點：",
    options: ["台北", "新竹", "台中", "高雄", "其他"],
    field: "location"
  },
  {
    botMessage: "了解，現在請告訴我這個職位的薪資範圍？",
    question: "請選擇或輸入薪資範圍：",
    options: ["30K-40K", "40K-50K", "50K-60K", "60K以上"],
    field: "salary"
  },
  {
    botMessage: "最後，請告訴我這個職位提供哪些福利？",
    question: "請選擇或輸入福利項目（用逗號分隔）：",
    options: ["年終獎金", "績效獎金", "股票分紅", "健康檢查", "教育補助"],
    field: "benefits"
  }
];

const TalentDefinitionChat: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: conversationFlow[0].botMessage
    },
    {
      role: 'assistant',
      content: conversationFlow[0].question,
      options: conversationFlow[0].options
    }
  ]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [jobRequirement, setJobRequirement] = useState<JobRequirement>({
    title: "",
    department: "",
    skills: [],
    experience: "",
    education: "",
    location: "",
    salary: "",
    benefits: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json() as ChatResponse;
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: unknown) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleSendMessage = (message?: string) => {
    const messageText = message || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Process the message and update job requirement
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (nextStep < conversationFlow.length) {
      const botResponse: Message = {
        role: 'assistant',
        content: conversationFlow[nextStep].botMessage
      };
      
      const questionMessage: Message = {
        role: 'assistant',
        content: conversationFlow[nextStep].question,
        options: conversationFlow[nextStep].options
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botResponse, questionMessage]);
      }, 1000);
    } else {
      const completionMessage: Message = {
        role: 'assistant',
        content: "人才需求定義完成！正在為您尋找合適的候選人..."
      };

      setMessages(prev => [...prev, completionMessage]);

      // Navigate to results page after a delay
      setTimeout(() => {
        navigate("/company/results");
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="TAGNOVA" />

      <div className="flex-1 container mx-auto max-w-2xl p-4 flex flex-col">
        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>進度</span>
            <span>{currentStep + 1} / {conversationFlow.length}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / conversationFlow.length) * 100}%` }}
            />
          </div>
        </div>

        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-6">
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96 mb-4">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                  >
                    <div className="flex items-start gap-2 max-w-[80%]">
                      {message.role === 'assistant' && (
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      {message.role === 'user' && (
                        <div className="bg-muted rounded-full p-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Options */}
                  {message.role === 'assistant' && message.options && (
                    <div className="flex flex-wrap gap-2 ml-12 mb-4">
                      {message.options.map((option: string) => (
                        <Button
                          key={option}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleSendMessage(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="輸入您的回覆..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Requirements Summary */}
        {(jobRequirement.title || jobRequirement.department) && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                目前需求摘要
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {jobRequirement.title && (
                  <div>
                    <span className="text-muted-foreground">職位：</span>
                    <span className="font-medium">{jobRequirement.title}</span>
                  </div>
                )}
                {jobRequirement.department && (
                  <div>
                    <span className="text-muted-foreground">部門：</span>
                    <span className="font-medium">{jobRequirement.department}</span>
                  </div>
                )}
                {jobRequirement.experience && (
                  <div>
                    <span className="text-muted-foreground">經驗：</span>
                    <span className="font-medium">{jobRequirement.experience}</span>
                  </div>
                )}
              </div>
              {jobRequirement.skills.length > 0 && (
                <div className="mt-3">
                  <span className="text-muted-foreground text-sm">技能要求：</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {jobRequirement.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TalentDefinitionChat;