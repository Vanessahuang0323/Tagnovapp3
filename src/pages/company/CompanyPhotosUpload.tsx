import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompanyPhotosUpload = () => {
  const navigate = useNavigate();
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedPhotos(prev => [...prev, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    localStorage.setItem('companyPhotos', JSON.stringify(uploadedPhotos));
    navigate('/company/register-complete');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card p-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-foreground">企業相簿上傳</h1>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>上傳企業照片</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">上傳企業環境照片</p>
              <p className="text-muted-foreground mb-4">支援 JPG, PNG 格式，建議至少上傳 3-5 張照片</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button asChild>
                <label htmlFor="photo-upload" className="cursor-pointer">
                  選擇照片
                </label>
              </Button>
            </div>

            {uploadedPhotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={photo} 
                      alt={`企業照片 ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleComplete} 
              className="w-full"
              disabled={uploadedPhotos.length === 0}
            >
              完成註冊
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyPhotosUpload;