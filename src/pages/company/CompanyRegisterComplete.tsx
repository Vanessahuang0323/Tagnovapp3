import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyRegisterComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">註冊完成！</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            恭喜您成功註冊 Tagnova 企業版！現在您可以開始尋找合適的人才。
          </p>
          
          <div className="space-y-2">
            <Button onClick={() => navigate('/company/talent-definition')} className="w-full">
              開始定義人才需求
            </Button>
            <Button onClick={() => navigate('/company/talent-matching')} variant="outline" className="w-full">
              直接瀏覽人才庫
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyRegisterComplete;