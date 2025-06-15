import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './routes';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Common Pages
import Index from "./pages/Index";
import LanguageSelect from "./pages/LanguageSelect";
import NotFound from "./pages/NotFound";

// Company Pages
import CompanyRegister from "./pages/CompanyRegister";
import CompanyCulture from "./pages/company/CompanyCulture";
import CompanyPhotosUpload from "./pages/company/CompanyPhotosUpload";
import CompanyRegisterComplete from "./pages/company/CompanyRegisterComplete";
import CompanyChat from "./pages/CompanyChat";
import CompanyResults from "./pages/company/CompanyResults";
import CandidateView from "./pages/company/CandidateView";
import SendInterviewInvitation from "./pages/company/SendInterviewInvitation";
import SavedCandidates from "./pages/company/SavedCandidates";
import TalentCards from "./pages/TalentCards";
import TalentDefinitionChat from "./pages/TalentDefinitionChat";
import ChatRoom from "./pages/ChatRoom";
import ChatList from "./pages/company/ChatList";

// Student Pages
import StudentRegister from "./pages/StudentRegister";
import PersonalityTest from "./pages/student/PersonalityTest";
import PhotoUpload from "./pages/student/PhotoUpload";
import ResumeCompletion from "./pages/student/ResumeCompletion";
import StudentDashboard from "./pages/student/StudentDashboard";
import Messages from "./pages/student/Messages";
import MockInterview from "./pages/student/MockInterview";
import MockInterviewSession from "./pages/student/MockInterviewSession";
import MockInterviewResult from "./pages/student/MockInterviewResult";
import StudentChat from "./pages/StudentChat";
import StudentChatRoom from "./pages/student/StudentChatRoom";
import JobCards from "./pages/JobCards";
import JobApplication from "./pages/JobApplication";
import AnalysisReport from "./pages/AnalysisReport";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AppRoutes />
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
