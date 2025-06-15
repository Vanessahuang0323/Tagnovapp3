import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Heart, X, MapPin, Clock, Users, Briefcase, Building2, Calendar, RotateCcw, ThumbsDown } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { useToast } from "@/hooks/use-toast";

interface JobCard {
  id: string;
  company: string;
  position: string;
  location: string;
  workType: string;
  salary: string;
  matchPercentage: number;
  description: string;
  requirements: string[];
  benefits: string[];
  logo?: string;
  companyImage: string;
  companyDescription: string;
  companySize: string;
  foundedYear: string;
  industry: string;
}

const mockJobs: JobCard[] = [
  {
    id: "1",
    company: "創新科技有限公司",
    position: "前端工程師",
    location: "台北市信義區",
    workType: "全職",
    salary: "55,000 - 75,000",
    matchPercentage: 92,
    description: "我們正在尋找一位熱愛前端開發的工程師，加入我們的產品團隊。",
    requirements: ["React", "TypeScript", "CSS/SCSS", "Git"],
    benefits: ["彈性工時", "遠端工作", "教育訓練", "健康保險"],
    companyImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    companyDescription: "專注於創新技術解決方案的軟體開發公司，致力於為客戶提供最佳的數位體驗。",
    companySize: "50-100人",
    foundedYear: "2018",
    industry: "軟體開發"
  },
  {
    id: "2",
    company: "數位行銷公司",
    position: "UI/UX 設計師",
    location: "台北市大安區",
    workType: "全職",
    salary: "50,000 - 70,000",
    matchPercentage: 85,
    description: "負責產品介面設計與使用者體驗優化，與跨部門團隊密切合作。",
    requirements: ["Figma", "Adobe Creative Suite", "原型設計", "使用者研究"],
    benefits: ["年終獎金", "員工旅遊", "免費午餐", "成長機會"],
    companyImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    companyDescription: "領先的數位行銷服務提供商，幫助企業在數位時代建立品牌影響力。",
    companySize: "30-50人",
    foundedYear: "2016",
    industry: "數位行銷"
  },
  {
    id: "3",
    company: "金融科技新創",
    position: "產品經理實習生",
    location: "台北市松山區",
    workType: "實習",
    salary: "25,000 - 35,000",
    matchPercentage: 78,
    description: "協助產品規劃與市場分析，參與產品開發全流程。",
    requirements: ["邏輯思考", "數據分析", "溝通協調", "英文能力"],
    benefits: ["導師制度", "實習津貼", "轉正機會", "技能培訓"],
    companyImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    companyDescription: "專注於金融科技創新的新創公司，致力於改革傳統金融服務模式。",
    companySize: "20-30人",
    foundedYear: "2020",
    industry: "金融科技"
  }
];

const JobCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedJobs, setLikedJobs] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [dismissedJobs, setDismissedJobs] = useState<string[]>([]);
  const [exitX, setExitX] = useState(0);
  const [exitY, setExitY] = useState(0);
  const { toast } = useToast();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Action indicators
  const leftActionOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0]);
  const rightActionOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1]);
  const upActionOpacity = useTransform(y, [-200, -50, 0], [1, 0.5, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

  const currentJob = mockJobs[currentIndex];
  const nextJob = mockJobs[currentIndex + 1];

  const handleSwipeLeft = (job: JobCard) => {
    // Save job (collect)
    if (!likedJobs.includes(job.id)) {
      setLikedJobs(prev => [...prev, job.id]);
    }
    toast({
      title: "已收藏",
      description: `${job.position} 已加入您的收藏清單`,
    });
    nextCard();
  };

  const handleSwipeRight = (job: JobCard) => {
    // Apply for job
    if (!appliedJobs.includes(job.id)) {
      setAppliedJobs(prev => [...prev, job.id]);
      toast({
        title: "已應徵",
        description: `已送出 ${job.position} 的應徵申請`,
      });
      // Redirect to pre-test or direct application
      setTimeout(() => {
        window.location.href = `/apply/${job.id}`;
      }, 1500);
    }
    nextCard();
  };

  const handleSwipeUp = (job: JobCard) => {
    // Dismiss job (not interested)
    if (!dismissedJobs.includes(job.id)) {
      setDismissedJobs(prev => [...prev, job.id]);
    }
    toast({
      title: "沒興趣",
      description: `${job.position} 已被標記為沒興趣`,
    });
    nextCard();
  };

  const handleDragEnd = (info: PanInfo) => {
    const threshold = 100;
    const velocityX = info.velocity.x;
    const velocityY = info.velocity.y;
    const movementX = info.offset.x;
    const movementY = info.offset.y;

    // Check for upward swipe first
    if (Math.abs(velocityY) >= 500 || Math.abs(movementY) >= threshold) {
      if (movementY < 0 || velocityY < 0) {
        // Swipe up - Not interested
        setExitY(-1000);
        if (currentJob) handleSwipeUp(currentJob);
        return;
      }
    }

    // Check for horizontal swipe
    if (Math.abs(velocityX) >= 500 || Math.abs(movementX) >= threshold) {
      if (movementX > 0 || velocityX > 0) {
        // Swipe right - Apply
        setExitX(1000);
        if (currentJob) handleSwipeRight(currentJob);
      } else {
        // Swipe left - Save
        setExitX(-1000);
        if (currentJob) handleSwipeLeft(currentJob);
      }
    }
  };

  const handleButtonSwipe = (type: 'left' | 'right' | 'up') => {
    if (currentJob) {
      if (type === 'left') {
        setExitX(-1000);
        handleSwipeLeft(currentJob);
      } else if (type === 'right') {
        setExitX(1000);
        handleSwipeRight(currentJob);
      } else if (type === 'up') {
        setExitY(-1000);
        handleSwipeUp(currentJob);
      }
    }
  };

  const nextCard = () => {
    setTimeout(() => {
      if (currentIndex < mockJobs.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // All jobs swiped, reset to show more options
        setCurrentIndex(0);
      }
      setExitX(0);
      setExitY(0);
      x.set(0);
      y.set(0);
    }, 300);
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setLikedJobs([]);
    setAppliedJobs([]);
    setDismissedJobs([]);
    setExitX(0);
    setExitY(0);
    x.set(0);
    y.set(0);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-orange-500";
  };

  if (!currentJob) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-bold mb-4">沒有更多職缺了</h2>
            <p className="text-muted-foreground mb-6">
              您已經瀏覽完所有適配的職位，可以查看相關職缺或前往課程平台增進能力。
            </p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <a href="/job-cards">重新查看職缺</a>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <a href="/student-register">前往課程平台增進能力</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="職位配對" />

      <div className="container mx-auto max-w-md p-4 py-8">
        <div className="text-sm text-muted-foreground text-center mb-4">
          {currentIndex + 1} / {mockJobs.length}
        </div>
        
        {/* Card Stack Container */}
        <div className="relative h-[600px] mb-6">
          {/* Next Card (Background) */}
          {nextJob && (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 0.95, opacity: 0.7 }}
              style={{
                transform: 'translateY(10px)',
                zIndex: 1,
              }}
            >
              <Card className="h-full overflow-hidden bg-white shadow-xl">
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`${getMatchColor(nextJob.matchPercentage)} text-white`}>
                    {nextJob.matchPercentage}% 配對
                  </Badge>
                </div>
                <CardHeader className="text-center">
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback className="text-lg">
                      {nextJob.company.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{nextJob.position}</CardTitle>
                  <CardDescription>{nextJob.company}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          )}

          {/* Current Card (Top) - Swipeable */}
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{
              x,
              y,
              rotate,
              opacity,
              scale,
              zIndex: 2,
            }}
            drag={true}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(_, info) => handleDragEnd(info)}
            animate={
              exitX !== 0 ? { x: exitX, opacity: 0, scale: 0.8 } :
              exitY !== 0 ? { y: exitY, opacity: 0, scale: 0.8 } : {}
            }
            transition={{ duration: 0.3 }}
            whileDrag={{ scale: 1.05 }}
          >
            {/* Action Indicators */}
            <motion.div
              className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10 rounded-3xl"
              style={{ opacity: leftActionOpacity }}
            >
              <div className="bg-red-500 rounded-full p-4">
                <Heart className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10 rounded-3xl"
              style={{ opacity: rightActionOpacity }}
            >
              <div className="bg-green-500 rounded-full p-4">
                <X className="w-12 h-12 text-white rotate-45" />
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 bg-gray-500/20 flex items-center justify-center z-10 rounded-3xl"
              style={{ opacity: upActionOpacity }}
            >
              <div className="bg-gray-500 rounded-full p-4">
                <ThumbsDown className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <Card className="h-full overflow-hidden bg-white shadow-2xl" draggable={false}>
              {/* Match Percentage Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className={`${getMatchColor(currentJob.matchPercentage)} text-white`}>
                  {currentJob.matchPercentage}% 配對
                </Badge>
              </div>

              <CardHeader className="text-center">
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarFallback className="text-lg">
                    {currentJob.company.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{currentJob.position}</CardTitle>
                <CardDescription>{currentJob.company}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 overflow-y-auto max-h-96">
                {/* Company Photo */}
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={currentJob.companyImage}
                    alt={`${currentJob.company} 辦公環境`}
                    className="w-full h-32 object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Company Details */}
                <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                  <h4 className="font-semibold text-sm mb-2">公司資訊</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-muted-foreground" />
                      <span>{currentJob.industry}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{currentJob.companySize}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>成立於 {currentJob.foundedYear}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{currentJob.companyDescription}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{currentJob.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{currentJob.workType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>NT$ {currentJob.salary}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">職位描述</h4>
                  <p className="text-sm text-muted-foreground">{currentJob.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">技能要求</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentJob.requirements.map((req) => (
                      <Badge key={req} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">福利待遇</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentJob.benefits.map((benefit) => (
                      <Badge key={benefit} variant="secondary">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-red-200 hover:bg-red-50"
            onClick={() => handleButtonSwipe('left')}
          >
            <Heart className="h-6 w-6 text-red-500" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-16 rounded-full border-2 border-gray-200 hover:bg-gray-50"
            onClick={() => handleButtonSwipe('up')}
          >
            <ThumbsDown className="h-6 w-6 text-gray-500" />
          </Button>
          
          <Button
            size="lg"
            className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600"
            onClick={() => handleButtonSwipe('right')}
          >
            <X className="h-6 w-6 rotate-45" />
          </Button>
        </div>

        <div className="text-center mt-4 space-y-2 text-sm text-muted-foreground">
          <p>← 左滑收藏 | 上滑沒興趣 | 右滑應徵 →</p>
          <p>已收藏 {likedJobs.length} 個 | 沒興趣 {dismissedJobs.length} 個 | 已應徵 {appliedJobs.length} 個職位</p>
        </div>
      </div>
    </div>
  );
};

export default JobCards;