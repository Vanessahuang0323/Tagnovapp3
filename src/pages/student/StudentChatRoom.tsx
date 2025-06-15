import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Send, Building2, ArrowLeft, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "company" | "student";
  timestamp: Date;
}

interface InterviewInfo {
  date: string;
  time: string;
  location: string;
  contact: string;
  type: "onsite" | "online";
}

interface Company {
  id: string;
  name: string;
  position: string;
  logo: string;
  initialMessages: Message[];
  interviewInfo: InterviewInfo;
  quickResponses: string[];
}

const companiesData: Record<string, Company> = {
  "1": {
    id: "1",
    name: "台積電",
    position: "軟體工程師",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
    initialMessages: [
      {
        id: "1",
        text: "恭喜您通過初步篩選，我們想邀請您參加下週的技術面試。",
        sender: "company",
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: "2",
        text: "謝謝您的邀請！我很期待能參加面試，請問需要準備什麼資料嗎？",
        sender: "student",
        timestamp: new Date(Date.now() - 3300000)
      }
    ],
    interviewInfo: {
      date: "2024-12-23",
      time: "14:00",
      location: "新竹科學園區台積電總部",
      contact: "03-563-6688",
      type: "onsite"
    },
    quickResponses: [
      "謝謝！我會準時到達",
      "請問需要帶作品集嗎？",
      "是否有技術測驗？"
    ]
  },
  "2": {
    id: "2",
    name: "聯發科技",
    position: "前端開發工程師", 
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop",
    initialMessages: [
      {
        id: "1",
        text: "感謝您的應徵，我們需要您提供更多關於React專案的詳細資訊。",
        sender: "company",
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: "2",
        text: "好的，我會整理相關的專案資料給您參考。",
        sender: "student",
        timestamp: new Date(Date.now() - 6900000)
      }
    ],
    interviewInfo: {
      date: "2024-12-24",
      time: "10:30",
      location: "線上面試 (Google Meet)",
      contact: "meet.google.com/abc-defg-hij",
      type: "online"
    },
    quickResponses: [
      "我會準備作品集展示",
      "請問面試會有設計實作嗎？",
      "想了解團隊合作模式"
    ]
  },
  "3": {
    id: "3",
    name: "Google Taiwan",
    position: "產品經理實習生",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop",
    initialMessages: [
      {
        id: "1", 
        text: "您好！我們對您的背景很感興趣，想了解您的產品思維。",
        sender: "company",
        timestamp: new Date(Date.now() - 5400000)
      },
      {
        id: "2",
        text: "很榮幸！我很願意分享我對產品設計的想法。",
        sender: "student",
        timestamp: new Date(Date.now() - 5100000)
      }
    ],
    interviewInfo: {
      date: "2024-12-26",
      time: "15:30",
      location: "台北市信義區Google辦公室",
      contact: "02-8729-7500",
      type: "onsite"
    },
    quickResponses: [
      "我會準備產品分析案例",
      "可以討論實習內容嗎？",
      "需要什麼準備資料？"
    ]
  },
  "4": {
    id: "4",
    name: "Microsoft Taiwan", 
    position: "雲端解決方案架構師",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop",
    initialMessages: [
      {
        id: "1",
        text: "恭喜！我們很高興提供您這個職位，請查看詳細的聘用條件。",
        sender: "company",
        timestamp: new Date(Date.now() - 9000000)
      },
      {
        id: "2",
        text: "太感謝了！我會仔細閱讀聘用條件並盡快回覆。",
        sender: "student",
        timestamp: new Date(Date.now() - 8700000)
      }
    ],
    interviewInfo: {
      date: "2024-12-27",
      time: "09:00",
      location: "台北市信義區微軟辦公室",
      contact: "02-8729-2568",
      type: "onsite"
    },
    quickResponses: [
      "謝謝這個機會！",
      "什麼時候開始上班？",
      "有什麼需要準備的嗎？"
    ]
  }
};

const StudentChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const company = companiesData[id || "1"];

  useEffect(() => {
    if (company) {
      setMessages(company.initialMessages);
    }
  }, [company]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "student",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate company response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "好的，我們會安排面試官與您進行技術討論。請準備相關的專案經驗分享。",
        sender: "company",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickResponse = (response: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: response,
      sender: "student",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate company response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "感謝您的回覆，我們會盡快安排後續流程。",
        sender: "company",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "停止錄音" : "開始錄音",
      description: isRecording ? "錄音已停止" : "正在錄音中...",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="TAGNOVA" />

      <div className="flex-1 container mx-auto max-w-2xl p-4 flex flex-col">
        {/* Company Info */}
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={company.logo} />
                <AvatarFallback>
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-blue-900">{company.name}</h3>
                <p className="text-sm text-blue-700">{company.position}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Info Card */}
        <Card className="mb-4 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <h4 className="font-medium text-green-900">面試資訊</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-green-800">
                <span className="font-medium">日期：</span>
                {company.interviewInfo.date}
              </p>
              <p className="text-green-800">
                <span className="font-medium">時間：</span>
                {company.interviewInfo.time}
              </p>
              <p className="text-green-800">
                <span className="font-medium">地點：</span>
                {company.interviewInfo.location}
              </p>
              <p className="text-green-800">
                <span className="font-medium">聯絡方式：</span>
                {company.interviewInfo.contact}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        <div className="flex flex-wrap gap-2 mb-4">
          {company.quickResponses.map((response, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickResponse(response)}
              className="text-xs"
            >
              {response}
            </Button>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleRecording}
            className={isRecording ? "text-red-500" : ""}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="輸入訊息..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentChatRoom;