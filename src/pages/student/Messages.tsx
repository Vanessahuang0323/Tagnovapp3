import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Building2, MessageCircle, Clock, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";

interface Conversation {
  id: string;
  companyName: string;
  companyLogo?: string;
  position: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: 'interview-invite' | 'follow-up' | 'screening' | 'offer';
}

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: '1',
      companyName: '台積電',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
      position: '軟體工程師',
      lastMessage: '恭喜您通過初步篩選，我們想邀請您參加下週的技術面試...',
      timestamp: '2小時前',
      unreadCount: 2,
      status: 'interview-invite'
    },
    {
      id: '2',
      companyName: '聯發科技',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=150&h=150&fit=crop',
      position: '前端開發工程師',
      lastMessage: '感謝您的應徵，我們需要您提供更多關於React專案的詳細資訊',
      timestamp: '1天前',
      unreadCount: 0,
      status: 'follow-up'
    },
    {
      id: '3',
      companyName: 'Google Taiwan',
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=150&h=150&fit=crop',
      position: '產品經理實習生',
      lastMessage: '您好！我們對您的背景很感興趣，想了解您的產品思維...',
      timestamp: '3天前',
      unreadCount: 1,
      status: 'screening'
    },
    {
      id: '4',
      companyName: 'Microsoft Taiwan',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=150&h=150&fit=crop',
      position: '雲端解決方案架構師',
      lastMessage: '恭喜！我們很高興提供您這個職位，請查看詳細的聘用條件...',
      timestamp: '1週前',
      unreadCount: 0,
      status: 'offer'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'interview-invite':
        return <Badge className="bg-green-100 text-green-700">面試邀請</Badge>;
      case 'follow-up':
        return <Badge variant="secondary">待回覆</Badge>;
      case 'screening':
        return <Badge className="bg-blue-100 text-blue-700">審核中</Badge>;
      case 'offer':
        return <Badge className="bg-purple-100 text-purple-700">錄取通知</Badge>;
      default:
        return <Badge variant="outline">一般</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'interview-invite':
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'follow-up':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'screening':
        return <Search className="h-4 w-4 text-blue-500" />;
      case 'offer':
        return <CheckCircle2 className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredConversations = conversations.filter(
    conv => 
      conv.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (conversationId: string) => {
    navigate(`/student/chat/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-6">
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-sm text-muted-foreground">進行中對話</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-sm text-muted-foreground">面試邀請</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">待回覆</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="搜尋公司或職位..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Conversations List */}
          <Card>
            <CardHeader>
              <CardTitle>對話列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation.id)}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.companyLogo} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Building2 className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{conversation.companyName}</h3>
                          {getStatusIcon(conversation.status)}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(conversation.status)}
                          {conversation.unreadCount > 0 && (
                            <Badge variant="destructive" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm font-medium text-muted-foreground">{conversation.position}</p>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;