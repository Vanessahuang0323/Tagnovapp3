import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CompanyChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello, after reviewing your resume, we believe you are a great fit for this position. We'd like to schedule an interview with you. May I ask when you would be available?",
      sender: "bot", // Company message
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isEditingInterview, setIsEditingInterview] = useState(false);
  const [interviewInfo, setInterviewInfo] = useState({
    location: "ABC Company",
    time: "Tuesday, June 24, 10:00 AM"
  });

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "bot", // Company sending message
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "好的，我們會安排面試官與您進行技術討論。請準備相關的專案經驗分享。",
        sender: "user", // Student response
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickReply = (text: string) => {
    setInputValue(text);
  };

  const handleConfirmInterview = () => {
    // Add confirmation logic here
    alert("面試已確認！");
  };

  const handleEditInterview = () => {
    setIsEditingInterview(true);
  };

  const handleSaveInterview = () => {
    setIsEditingInterview(false);
    alert("面試資訊已更新！");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader title="AI 人才顧問" />

      {/* Chat Messages */}
      <div className="flex-1 container mx-auto max-w-sm px-4 py-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "bot" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.sender === "bot" 
                ? "bg-pink-100 text-gray-800" 
                : "bg-purple-100 text-gray-800"
            }`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Quick Reply Options */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-pink-100 border-pink-200 text-gray-700 rounded-full px-4 py-2"
            onClick={() => quickReply("I'm available for an interview any morning this week.")}
          >
            I'm available for an interview any morning this week.
          </Button>
          
          <Button
            variant="outline" 
            size="sm"
            className="bg-pink-100 border-pink-200 text-gray-700 rounded-full px-4 py-2"
            onClick={() => quickReply("No problem. Thank you!")}
          >
            No problem. Thank you!
          </Button>
        </div>

        {/* Interview Confirmation */}
        <div className="bg-purple-100 rounded-2xl p-4 space-y-3">
          <p className="text-sm text-gray-700">
            The following is the confirmed interview information:
          </p>
          {isEditingInterview ? (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Location:</label>
                <Input
                  value={interviewInfo.location}
                  onChange={(e) => setInterviewInfo(prev => ({ ...prev, location: e.target.value }))}
                  className="text-sm bg-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Time:</label>
                <Input
                  value={interviewInfo.time}
                  onChange={(e) => setInterviewInfo(prev => ({ ...prev, time: e.target.value }))}
                  className="text-sm bg-white"
                />
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              <p>Location: {interviewInfo.location}</p>
              <p>Time: {interviewInfo.time}</p>
            </div>
          )}
          <div className="flex space-x-2">
            {isEditingInterview ? (
              <Button 
                size="sm" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                onClick={handleSaveInterview}
              >
                保存
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="bg-green-500 hover:bg-green-600 text-white rounded-full"
                onClick={handleConfirmInterview}
              >
                ✓
              </Button>
            )}
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-full"
              onClick={handleEditInterview}
            >
              ✏️
            </Button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="container mx-auto max-w-sm px-4 py-4 border-t">
        <div className="flex gap-2 items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type some words......"
            className="flex-1 bg-gray-100 border-0 rounded-full"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <Send className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyChat;