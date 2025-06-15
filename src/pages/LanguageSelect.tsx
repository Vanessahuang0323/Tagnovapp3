import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LanguageSelect: React.FC = () => {
  const navigate = useNavigate();
  const { setLanguage, t } = useLanguage();

  const handleLanguageSelect = (lang: 'zh' | 'en') => {
    setLanguage(lang);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">選擇語言 / Select Language</CardTitle>
          <CardDescription className="text-center">
            請選擇您偏好的語言 / Please select your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full h-12 text-lg"
            onClick={() => handleLanguageSelect('zh')}
          >
            繁體中文
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-lg"
            onClick={() => handleLanguageSelect('en')}
          >
            English
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelect;