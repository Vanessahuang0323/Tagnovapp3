import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const CompanyResults: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { title: t('company.results.stats.matches'), value: "23", icon: Users, trend: "+12%" },
    { title: t('company.results.stats.interviews'), value: "18", icon: Calendar, trend: "+8%" },
    { title: t('company.results.stats.hires'), value: "7", icon: Award, trend: "+15%" },
    { title: t('company.results.stats.matchRate'), value: "76%", icon: TrendingUp, trend: "+3%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="TAGNOVA" />

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm py-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">招聘成效分析</h2>
            <p className="text-sm text-muted-foreground">查看您的人才招聘表現與統計數據</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Latest Matches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('company.results.newMatches')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">張小明</p>
                  <p className="text-sm text-muted-foreground">前端工程師</p>
                </div>
                <Badge className="bg-green-100 text-green-700">{t('company.results.stats.hires')}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">李小華</p>
                  <p className="text-sm text-muted-foreground">UI/UX 設計師</p>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{t('company.results.stats.interviews')}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">王小美</p>
                  <p className="text-sm text-muted-foreground">數據分析師</p>
                </div>
                <Badge className="bg-yellow-100 text-yellow-700">{t('company.results.stats.matches')}</Badge>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => navigate('/company/talent-matching')}
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90"
          >
            {t('company.results.viewMore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyResults;