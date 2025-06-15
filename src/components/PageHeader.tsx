import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '../contexts/LanguageContext';

interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  showBackButton = true, 
  showHomeButton = true,
  onBackClick,
  onHomeClick 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleBackClick = () => {
    try {
      if (onBackClick) {
        onBackClick();
      } else {
        navigate(-1);
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('common.navigationError'),
        variant: "destructive",
      });
    }
  };

  const handleHomeClick = () => {
    try {
      if (onHomeClick) {
        onHomeClick();
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('common.navigationError'),
        variant: "destructive",
      });
    }
  };

  return (
    <header className="py-6 px-4">
      <div className="container mx-auto max-w-sm">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {showBackButton && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleBackClick}
                className="h-9 w-9 hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                aria-label={t('common.back')}
                title={t('common.back')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Logo size="lg" className="flex-1" />
          <div className="flex-1 flex justify-end">
            {showHomeButton && (
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleHomeClick}
                className="h-9 w-9 hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                aria-label={t('common.home')}
                title={t('common.home')}
              >
                <Home className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        {title && (
          <h1 className="text-xl font-bold text-center mt-4">{title}</h1>
        )}
      </div>
    </header>
  );
};