import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/PageHeader";

const SendInterviewInvitation = () => {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    candidateName: "張小明",
    position: "前端工程師",
    interviewType: "",
    date: "",
    time: "",
    location: "",
    duration: "",
    message: "",
    meetingLink: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.interviewType || !formData.date || !formData.time) {
      toast({
        title: "請填寫必要資訊",
        description: "面試類型、日期和時間為必填欄位",
        variant: "destructive"
      });
      return;
    }

    // Send invitation logic here
    toast({
      title: "面試邀請已發送",
      description: `已向 ${formData.candidateName} 發送面試邀請`,
    });
    
    navigate('/company/results');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">發送面試邀請</h2>
            <p className="text-sm text-muted-foreground">為候選人安排面試時間與相關資訊</p>
          </div>

          {/* Candidate Info */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-lg">👤</span>
              </div>
              <div>
                <h3 className="font-medium">{formData.candidateName}</h3>
                <p className="text-sm text-muted-foreground">{formData.position}</p>
              </div>
            </div>
          </div>

          {/* Interview Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="interviewType">面試類型 *</Label>
              <Select onValueChange={(value) => handleInputChange("interviewType", value)}>
                <SelectTrigger className="mt-1 bg-gray-100 border-0">
                  <SelectValue placeholder="選擇面試類型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">視訊面試</SelectItem>
                  <SelectItem value="onsite">現場面試</SelectItem>
                  <SelectItem value="phone">電話面試</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date">面試日期 *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
              <div>
                <Label htmlFor="time">面試時間 *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="duration">面試時長</Label>
              <Select onValueChange={(value) => handleInputChange("duration", value)}>
                <SelectTrigger className="mt-1 bg-gray-100 border-0">
                  <SelectValue placeholder="選擇面試時長" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30分鐘</SelectItem>
                  <SelectItem value="45">45分鐘</SelectItem>
                  <SelectItem value="60">1小時</SelectItem>
                  <SelectItem value="90">1.5小時</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.interviewType === "onsite" && (
              <div>
                <Label htmlFor="location">面試地點</Label>
                <Input
                  id="location"
                  placeholder="請輸入面試地點"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
            )}

            {formData.interviewType === "video" && (
              <div>
                <Label htmlFor="meetingLink">會議連結</Label>
                <Input
                  id="meetingLink"
                  placeholder="請輸入視訊會議連結"
                  value={formData.meetingLink}
                  onChange={(e) => handleInputChange("meetingLink", e.target.value)}
                  className="mt-1 bg-gray-100 border-0"
                />
              </div>
            )}

            <div>
              <Label htmlFor="message">額外訊息</Label>
              <Textarea
                id="message"
                placeholder="請輸入給候選人的額外訊息"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="mt-1 bg-gray-100 border-0 resize-none"
                rows={3}
              />
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90 font-medium py-3 rounded-full"
          >
            發送面試邀請
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendInterviewInvitation;