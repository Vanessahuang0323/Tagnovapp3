import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, Camera, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PhotoUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - uploadedPhotos.length);
    const newUrls = newFiles.map(file => URL.createObjectURL(file));

    setUploadedPhotos(prev => [...prev, ...newFiles]);
    setPreviewUrls(prev => [...prev, ...newUrls]);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (uploadedPhotos.length === 0) {
      toast({
        title: "請上傳至少一張照片",
        description: "我們需要您的照片來建立個人檔案",
        variant: "destructive"
      });
      return;
    }

    // Store photos and navigate to next step
    localStorage.setItem('studentPhotos', JSON.stringify(uploadedPhotos.map(f => f.name)));
    toast({
      title: "照片上傳成功",
      description: "您的照片已成功上傳",
    });
    navigate('/student/resume-completion');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-4 border-b">
        <div className="container mx-auto max-w-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigate('/student/personality-test')}>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">上傳個人照片</h2>
            <p className="text-sm text-muted-foreground">請上傳您的個人照片，讓企業更認識您</p>
          </div>

          {/* Upload Area */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">個人照片 (最多5張)</Label>
            
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
              <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">點擊上傳或拖拽照片到這裡</p>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="photo-upload"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <Label htmlFor="photo-upload" className="cursor-pointer">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    選擇照片
                  </span>
                </Button>
              </Label>
            </div>

            {/* Photo Grid */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Tips */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">照片小提示：</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 建議上傳清晰的正面照片</li>
                <li>• 照片檔案大小不超過5MB</li>
                <li>• 支援 JPG、PNG 格式</li>
                <li>• 避免使用過度修圖的照片</li>
              </ul>
            </div>

            {/* Photo Count */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                已上傳 {uploadedPhotos.length} / 5 張照片
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline"
              onClick={() => navigate('/student/resume-completion')}
              className="flex-1"
            >
              跳過
            </Button>
            <Button 
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90"
            >
              下一步
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;