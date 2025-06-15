import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Phone, Send, User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

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

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  initialMessages: Message[];
  interviewInfo: InterviewInfo;
  quickResponses: string[];
}

const candidatesData: Record<string, Candidate> = {
  "1": {
    id: "1",
    name: "林佳穎",
    title: "前端工程師",
    company: "創新科技有限公司",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
    initialMessages: [
      {
        id: "1",
        text: "林小姐您好！我們看了您的履歷，對您的React和TypeScript經驗很感興趣，想邀請您來面試前端工程師的職位。",
        sender: "company",
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: "2",
        text: "您好！謝謝您的邀請，我很期待能加入貴公司的前端團隊。",
        sender: "student",
        timestamp: new Date(Date.now() - 3300000)
      }
    ],
    interviewInfo: {
      date: "2024-12-23",
      time: "14:00",
      location: "台北市信義區信義路五段7號12樓",
      contact: "02-2345-6789",
      type: "onsite"
    },
    quickResponses: [
      "請準備您的設計作品集",
      "我們會安排設計實作討論",
      "可以分享您的團隊合作經驗"
    ]
  },
  "2": {
    id: "2", 
    name: "陳建宏",
    title: "全端工程師",
    company: "新創科技公司",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    initialMessages: [
      {
        id: "1",
        text: "陳先生您好！您的全端開發經驗很豐富，我們想邀請您面試我們的架構師職位。",
        sender: "company",
        timestamp: new Date(Date.now() - 7200000)
      },
      {
        id: "2",
        text: "謝謝！我對新創環境很有興趣，期待了解更多關於技術架構的挑戰。",
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
      "請準備您的設計作品集",
      "我們會安排設計實作討論",
      "可以分享您的團隊合作經驗"
    ]
  },
  "3": {
    id: "3",
    name: "王美慧", 
    title: "UI/UX 設計師",
    company: "數位設計工作室",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    initialMessages: [
      {
        id: "1",
        text: "王小姐您好！我們很欣賞您的設計作品，想邀請您加入我們的設計團隊。",
        sender: "company",
        timestamp: new Date(Date.now() - 5400000)
      },
      {
        id: "2", 
        text: "太棒了！我一直很關注貴公司的設計項目，很期待能參與其中。",
        sender: "student",
        timestamp: new Date(Date.now() - 5100000)
      }
    ],
    interviewInfo: {
      date: "2024-12-26",
      time: "15:30", 
      location: "台北市松山區民生東路四段133號8樓",
      contact: "02-8712-3456",
      type: "onsite"
    },
    quickResponses: [
      "請準備您的設計作品集",
      "我們會安排設計實作討論",
      "可以分享您的團隊合作經驗"
    ]
  },
  "4": {
    id: "4",
    name: "張志偉",
    title: "資料科學家", 
    company: "AI 科技公司",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    initialMessages: [
      {
        id: "1",
        text: "張先生您好！您在機器學習方面的經驗很符合我們的需求，想邀請您面試資料科學家職位。",
        sender: "company", 
        timestamp: new Date(Date.now() - 9000000)
      },
      {
        id: "2",
        text: "很榮幸！我對AI應用很有熱忱，期待能了解更多關於貴公司的資料科學項目。",
        sender: "student",
        timestamp: new Date(Date.now() - 8700000)
      }
    ],
    interviewInfo: {
      date: "2024-12-27",
      time: "09:00",
      location: "新竹科學園區創新二路1號",
      contact: "03-577-8899", 
      type: "onsite"
    },
    quickResponses: [
      "請準備您的設計作品集",
      "我們會安排設計實作討論",
      "可以分享您的團隊合作經驗"
    ]
  }
};

const ChatRoom = () => {
  const { id } = useParams();
  const candidate = candidatesData[id || "1"] || candidatesData["1"];
  
  const [messages, setMessages] = useState<Message[]>(candidate.initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [interviewScheduled, setInterviewScheduled] = useState(true);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "company",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");

    // Simulate company response based on candidate
    if (inputValue.includes("時間") || inputValue.includes("面試") || inputValue.includes("準備")) {
      setTimeout(() => {
        let responseText = "";
        
        switch (candidate.id) {
          case "1":
            responseText = "太好了！請記得帶上您的作品集，我們會安排技術主管與您討論React相關的項目經驗。";
            break;
          case "2": 
            responseText = "沒問題！我們會準備一些系統設計的討論題目，也會介紹我們目前的技術架構。";
            break;
          case "3":
            responseText = "很棒！請準備您最得意的設計案例，我們會有簡單的設計思考討論。";
            break;
          case "4":
            responseText = "好的！我們會討論一些機器學習的實際應用案例，也會了解您對數據處理的看法。";
            break;
          default:
            responseText = "好的！我們期待與您見面討論。";
        }
        
        const response: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: "company",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickResponse = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title={`與 ${candidate.name} 的面試溝通`} />

      <div className="flex-1 container mx-auto max-w-2xl p-4 flex flex-col">
        {/* Candidate Info */}
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={candidate.image} />
                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-blue-900">{candidate.name}</h3>
                <p className="text-sm text-blue-700">{candidate.title}</p>
                <p className="text-xs text-blue-600">{candidate.company}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Info Card */}
        {interviewScheduled && (
          <Card className="mb-4 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                面試懶人包
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span><strong>日期：</strong>{candidate.interviewInfo.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span><strong>時間：</strong>{candidate.interviewInfo.time}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span><strong>地點：</strong>{candidate.interviewInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 md:col-span-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span><strong>聯絡：</strong>{candidate.interviewInfo.contact}</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                {candidate.interviewInfo.type === "onsite" ? "現場面試" : "線上面試"}
              </Badge>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              面試溝通
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto max-h-96 mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "company" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "company" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.sender === "company" ? "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop" : candidate.image} />
                      <AvatarFallback>
                        {message.sender === "company" ? "企" : candidate.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "company"
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
                placeholder="輸入訊息..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Response Buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.quickResponses.map((response, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handleQuickResponse(response)}
            >
              {response}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;