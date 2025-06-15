import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MessageCircle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChatConversation {
  id: string;
  candidateName: string;
  candidatePhoto: string;
  position: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'scheduled' | 'pending' | 'completed';
}

const ChatList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: ChatConversation[] = [
    {
      id: "1",
      candidateName: "林佳穎",
      candidatePhoto: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      position: "前端工程師",
      lastMessage: "好的！我會準備相關研究成果",
      timestamp: "2小時前",
      unreadCount: 2,
      status: "scheduled"
    },
    {
      id: "2", 
      candidateName: "陳建宏",
      candidatePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      position: "全端工程師",
      lastMessage: "線上面試很方便，謝謝安排！",
      timestamp: "1天前",
      unreadCount: 0,
      status: "scheduled"
    },
    {
      id: "3",
      candidateName: "王美慧",
      candidatePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", 
      position: "UI/UX 設計師",
      lastMessage: "請準備您的設計作品集",
      timestamp: "3天前",
      unreadCount: 1,
      status: "pending"
    },
    {
      id: "4",
      candidateName: "張志偉", 
      candidatePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      position: "資料科學家",
      lastMessage: "我會準備相關研究成果",
      timestamp: "1週前",
      unreadCount: 0,
      status: "completed"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-green-100 text-green-700">已排程</Badge>;
      case 'pending':
        return <Badge variant="secondary">待確認</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700">已完成</Badge>;
      default:
        return <Badge variant="outline">一般</Badge>;
    }
  };

  const filteredConversations = conversations.filter(
    conv => 
      conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversationId: string) => {
    navigate(`/company/chat/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-4 border-b">
        <div className="container mx-auto max-w-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/company/talent-matching')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">🏷️</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">TAGNOVA</h1>
            </div>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">聊天室</h2>
            <p className="text-sm text-muted-foreground">與候選人的面試溝通記錄</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-lg font-bold">4</div>
                  <p className="text-xs text-muted-foreground">總對話</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
                  <div className="text-lg font-bold">2</div>
                  <p className="text-xs text-muted-foreground">已排程</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                  <div className="text-lg font-bold">3</div>
                  <p className="text-xs text-muted-foreground">待回覆</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜尋候選人或職位..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-100 border-0"
            />
          </div>

          {/* Conversations List */}
          <div className="space-y-4">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">沒有找到符合條件的對話</p>
              </div>
            ) : (
              filteredConversations.map((conversation) => (
                <Card key={conversation.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleConversationClick(conversation.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Profile Image */}
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.candidatePhoto} />
                        <AvatarFallback>{conversation.candidateName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      {/* Conversation Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-lg">{conversation.candidateName}</h3>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(conversation.status)}
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm font-medium text-blue-600 mb-1">{conversation.position}</p>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {conversation.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Button 
            onClick={() => navigate('/company/talent-matching')}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90"
          >
            回到人才配對
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatList;