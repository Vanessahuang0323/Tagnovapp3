import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'student' | 'company';
}

export const RouteGuard = ({ 
  children, 
  requireAuth = false,
  requireRole
}: RouteGuardProps) => {
  const location = useLocation();
  const { toast } = useToast();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('userRole');

  if (requireAuth && !isAuthenticated) {
    toast({
      title: "需要登入",
      description: "請先登入以訪問此頁面",
      variant: "destructive"
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireRole && userRole !== requireRole) {
    toast({
      title: "權限不足",
      description: "您沒有權限訪問此頁面",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 