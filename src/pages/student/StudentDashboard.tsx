import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, MessageCircle, Star, Clock, TrendingUp } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  
  const stats = {
    profileCompleteness: 85,
    appliedJobs: 12,
    interviewInvites: 3,
    savedJobs: 8
  };

  const recentActivity = [
    { type: "應徵", company: "科技公司 A", position: "前端工程師", status: "pending", date: "2024-06-10" },
    { type: "面試", company: "新創公司 B", position: "產品經理", status: "scheduled", date: "2024-06-08" },
    { type: "收藏", company: "傳統企業 C", position: "數據分析師", status: "saved", date: "2024-06-07" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-foreground">學生儀表板</h1>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        {/* Profile Completeness */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              個人檔案完整度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>完成度</span>
                <span>{stats.profileCompleteness}%</span>
              </div>
              <Progress value={stats.profileCompleteness} />
              <p className="text-sm text-muted-foreground">
                完善您的個人檔案以獲得更好的工作配對
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stats.appliedJobs}</div>
                <p className="text-sm text-muted-foreground">已應徵職位</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{stats.interviewInvites}</div>
                <p className="text-sm text-muted-foreground">面試邀請</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">{stats.savedJobs}</div>
                <p className="text-sm text-muted-foreground">收藏職位</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">78%</div>
                <p className="text-sm text-muted-foreground">配對成功率</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>最近活動</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{activity.type} - {activity.position}</p>
                      <p className="text-sm text-muted-foreground">{activity.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.status === 'pending' ? 'secondary' : activity.status === 'scheduled' ? 'default' : 'outline'}>
                      {activity.status === 'pending' ? '等待中' : activity.status === 'scheduled' ? '已安排' : '已收藏'}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4">
          <Button onClick={() => navigate('/student/job-recommendations')} className="h-20">
            瀏覽推薦職位
          </Button>
          <Button onClick={() => navigate('/student/messages')} variant="outline" className="h-20">
            查看訊息
          </Button>
          <Button onClick={() => navigate('/student/mock-interview')} variant="outline" className="h-20">
            模擬面試練習
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;