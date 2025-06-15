import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, BarChart3, Target, Mic, Upload, FileText, CheckCircle, AlertCircle, X, Eye, Sparkles, Languages } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { Logo } from "@/components/Logo";

type ProcessingStep = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
};

const Index: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [analysisPreview, setAnalysisPreview] = useState<any>(null);
  const [language, setLanguage] = useState<'zh' | 'en'>(() => {
    return (localStorage.getItem('language') as 'zh' | 'en') || 'zh';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Language content
  const content = {
    zh: {
      title: "AI Talent Matching Platform",
      subtitle: "AI-powered semantic analysis and CRM matching to connect talents with the right opportunities.",
      analyzerTitle: "AI Resume Analyzer",
      analyzerSubtitle: "Upload your resume and get personalized job recommendations with detailed analysis!",
      uploadPrompt: "點擊或拖拽上傳履歷",
      supportedFormats: `支援 PDF, DOC, DOCX, TXT, RTF (最大 ${Math.round(10)}MB)`,
      fileError: "檔案錯誤",
      fileSelected: "檔案已選擇",
      formatCorrect: "格式正確",
      sizeAppropriate: "大小適當",
      processing: "處理進度",
      analysisComplete: "分析完成！",
      foundJobs: "找到",
      jobsUnit: "個適合的職位",
      processingFailed: "處理失敗",
      processingError: "履歷分析過程中發生錯誤，請重試。",
      analyzing: "AI 分析中...",
      startAnalysis: "開始 AI 分析並尋找職位",
      uploadResume: "上傳履歷開始分析",
      analysisPreview: "分析預覽",
      coreSkills: "核心技能:",
      experience: "經驗:",
      education: "學歷:",
      matchingJobs: "匹配職位:",
      companyButton: "I'm a Company",
      studentButton: "I'm a Student",
      platformStats: "Platform Statistics",
      activeUsers: "Active Users",
      companies: "Companies",
      matchRate: "Match Rate",
      unsupportedFormat: "不支援的檔案格式。請上傳",
      fileTooLarge: "檔案大小超過限制",
      processingSteps: {
        upload: { title: "檔案上傳", description: "正在上傳您的履歷檔案..." },
        extract: { title: "AI 內容解析", description: "提取履歷中的關鍵資訊..." },
        analyze: { title: "技能分析", description: "分析您的專業技能和經驗..." },
        match: { title: "職位匹配", description: "尋找最適合的工作機會..." },
        results: { title: "生成結果", description: "準備個人化的職位推薦..." }
      },
      features: {
        resume: { title: "AI Resume Analysis", subtitle: "Deep learning extraction of skills and potential" },
        matching: { title: "Smart Job Matching", subtitle: "Precisely match with semantic tag analysis" },
        interview: { title: "Mock Interview Practice", subtitle: "AI-generated questions with real-time feedback" }
      }
    },
    en: {
      title: "AI Talent Matching Platform",
      subtitle: "AI-powered semantic analysis and CRM matching to connect talents with the right opportunities.",
      analyzerTitle: "AI Resume Analyzer",
      analyzerSubtitle: "Upload your resume and get personalized job recommendations with detailed analysis!",
      uploadPrompt: "Click or drag to upload resume",
      supportedFormats: `Supports PDF, DOC, DOCX, TXT, RTF (Max ${Math.round(10)}MB)`,
      fileError: "File Error",
      fileSelected: "File Selected",
      formatCorrect: "Correct Format",
      sizeAppropriate: "Appropriate Size",
      processing: "Processing Progress",
      analysisComplete: "Analysis Complete!",
      foundJobs: "Found",
      jobsUnit: "matching positions",
      processingFailed: "Processing Failed",
      processingError: "An error occurred during resume analysis, please try again.",
      analyzing: "AI Analyzing...",
      startAnalysis: "Start AI Analysis & Find Jobs",
      uploadResume: "Upload Resume to Start Analysis",
      analysisPreview: "Analysis Preview",
      coreSkills: "Core Skills:",
      experience: "Experience:",
      education: "Education:",
      matchingJobs: "Matching Jobs:",
      companyButton: "I'm a Company",
      studentButton: "I'm a Student",
      platformStats: "Platform Statistics",
      activeUsers: "Active Users",
      companies: "Companies",
      matchRate: "Match Rate",
      unsupportedFormat: "Unsupported file format. Please upload",
      fileTooLarge: "File size exceeds limit",
      processingSteps: {
        upload: { title: "File Upload", description: "Uploading your resume file..." },
        extract: { title: "AI Content Parsing", description: "Extracting key information from resume..." },
        analyze: { title: "Skills Analysis", description: "Analyzing your professional skills and experience..." },
        match: { title: "Job Matching", description: "Finding the best job opportunities..." },
        results: { title: "Generate Results", description: "Preparing personalized job recommendations..." }
      },
      features: {
        resume: { title: "AI Resume Analysis", subtitle: "Deep learning extraction of skills and potential" },
        matching: { title: "Smart Job Matching", subtitle: "Precisely match with semantic tag analysis" },
        interview: { title: "Mock Interview Practice", subtitle: "AI-generated questions with real-time feedback" }
      }
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ACCEPTED_FORMATS = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'application/rtf': '.rtf'
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or GIF file",
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('text')) return '📃';
    return '📄';
  };

  const handleFileSelect = useCallback((files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const error = validateFile(file) ? '' : validateFile(file);
    if (error) {
      setFileError(error);
      toast({
        title: content[language].fileError,
        description: error,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setFileError('');
    toast({
      title: content[language].fileSelected,
      description: `${file.name} (${formatFileSize(file.size)})`,
    });
  }, [toast, content, language]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError('');
    setAnalysisPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const initializeProcessingSteps = (): ProcessingStep[] => [
    {
      id: 'upload',
      title: content[language].processingSteps.upload.title,
      description: content[language].processingSteps.upload.description,
      status: 'processing',
      progress: 0
    },
    {
      id: 'extract',
      title: content[language].processingSteps.extract.title,
      description: content[language].processingSteps.extract.description,
      status: 'pending'
    },
    {
      id: 'analyze',
      title: content[language].processingSteps.analyze.title,
      description: content[language].processingSteps.analyze.description,
      status: 'pending'
    },
    {
      id: 'match',
      title: content[language].processingSteps.match.title,
      description: content[language].processingSteps.match.description,
      status: 'pending'
    },
    {
      id: 'results',
      title: content[language].processingSteps.results.title,
      description: content[language].processingSteps.results.description,
      status: 'pending'
    }
  ];

  const simulateFileProcessing = async () => {
    const steps = initializeProcessingSteps();
    setProcessingSteps(steps);

    // Step 1: Upload
    for (let progress = 0; progress <= 100; progress += 10) {
      setUploadProgress(progress);
      setProcessingSteps(prev => prev.map(step => 
        step.id === 'upload' ? { ...step, progress } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'upload' ? { ...step, status: 'completed' } : step
    ));

    // Step 2: Extract
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'extract' ? { ...step, status: 'processing' } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'extract' ? { ...step, status: 'completed' } : step
    ));

    // Step 3: Analyze
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'analyze' ? { ...step, status: 'processing' } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis preview
    setAnalysisPreview({
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: '2-3 年',
      education: '學士學位',
      matchingJobs: 8
    });

    setProcessingSteps(prev => prev.map(step => 
      step.id === 'analyze' ? { ...step, status: 'completed' } : step
    ));

    // Step 4: Match
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'match' ? { ...step, status: 'processing' } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 1800));
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'match' ? { ...step, status: 'completed' } : step
    ));

    // Step 5: Results
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'results' ? { ...step, status: 'processing' } : step
    ));
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProcessingSteps(prev => prev.map(step => 
      step.id === 'results' ? { ...step, status: 'completed' } : step
    ));
  };

  const handleFindJobs = async () => {
    if (!selectedFile) {
      handleUploadClick();
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await simulateFileProcessing();
      
      toast({
        title: content[language].analysisComplete,
        description: `${content[language].foundJobs} ${analysisPreview?.matchingJobs || 8} ${content[language].jobsUnit}`,
      });

      setTimeout(() => {
        navigate('/student/job-recommendations', { 
          state: { 
            resumeFile: selectedFile.name, 
            uploadedAt: new Date(),
            analysisData: analysisPreview
          }
        });
      }, 1000);
    } catch (error) {
      toast({
        title: content[language].processingFailed,
        description: content[language].processingError,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const previewFile = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      window.open(url, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto max-w-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <Logo size="lg" className="flex-1" />
            <div className="flex-1 flex justify-end">
              {/* Language Toggle Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-1 border-muted-foreground/20 hover:bg-muted"
              >
                <Languages className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'zh' ? 'EN' : '中文'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-sm">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            {t('home.title')}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Enhanced Quick Start Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 mb-6 animate-scale-in">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-foreground">{content[language].analyzerTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {content[language].analyzerSubtitle}
            </p>
            
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInputChange}
              accept={Object.keys(ACCEPTED_FORMATS).join(',')}
              className="hidden"
            />
            
            {/* Drag & Drop Zone */}
            <div
              ref={dropZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={!selectedFile ? handleUploadClick : undefined}
              className={`
                relative border-2 border-dashed rounded-2xl p-6 mb-4 transition-all duration-300 cursor-pointer
                ${isDragOver 
                  ? 'border-purple-400 bg-purple-50 scale-105' 
                  : selectedFile 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-300 bg-white hover:border-purple-300 hover:bg-purple-50'
                }
              `}
            >
              {selectedFile ? (
                /* File Selected Display */
                <div className="animate-fade-in">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getFileIcon(selectedFile.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm truncate">
                          {selectedFile.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(selectedFile.size)} • {ACCEPTED_FORMATS[selectedFile.type as keyof typeof ACCEPTED_FORMATS]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {selectedFile.type === 'application/pdf' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            previewFile();
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {content[language].formatCorrect}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {content[language].sizeAppropriate}
                    </Badge>
                  </div>
                </div>
              ) : (
                /* Upload Prompt */
                <div className="text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    {content[language].uploadPrompt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {content[language].supportedFormats}
                  </p>
                </div>
              )}
            </div>

            {/* Error Display */}
            {fileError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <div className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{fileError}</span>
                </div>
              </div>
            )}

            {/* Processing Steps */}
            {isUploading && processingSteps.length > 0 && (
              <div className="mb-4 space-y-3 animate-fade-in">
                <div className="text-sm font-medium text-foreground mb-2">{content[language].processing}</div>
                {processingSteps.map((step) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : step.status === 'processing' ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600" />
                      ) : step.status === 'error' ? (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{step.title}</div>
                      <div className="text-xs text-muted-foreground">{step.description}</div>
                      {step.progress !== undefined && (
                        <Progress value={step.progress} className="h-1 mt-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Analysis Preview */}
            {analysisPreview && !isUploading && (
              <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200 animate-scale-in">
                <h4 className="font-medium text-foreground mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  {content[language].analysisPreview}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">{content[language].coreSkills}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {analysisPreview.skills?.slice(0, 2).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {analysisPreview.skills?.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{analysisPreview.skills.length - 2}</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{content[language].experience}</span>
                    <div className="font-medium">{analysisPreview.experience}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{content[language].education}</span>
                    <div className="font-medium">{analysisPreview.education}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{content[language].matchingJobs}</span>
                    <div className="font-medium text-green-600">{analysisPreview.matchingJobs} {language === 'zh' ? '個' : ''}</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Action Button */}
            <Button 
              size="lg" 
              className="w-full bg-white text-gray-700 hover:bg-gray-50 shadow-sm font-medium transition-all duration-200 hover:scale-105"
              onClick={handleFindJobs}
              disabled={isUploading || !selectedFile}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                  {content[language].analyzing}
                </>
              ) : selectedFile ? (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  {content[language].startAnalysis}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {content[language].uploadResume}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Feature Cards */}
        <div className="space-y-3 mb-8">
          <Card className="border border-gray-200 shadow-sm hover-scale transition-all duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="text-gray-600">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">AI Resume Analysis</h4>
                <p className="text-xs text-muted-foreground">Deep learning extraction of skills and potential</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs">
                New
              </Badge>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover-scale transition-all duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="text-gray-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Smart Job Matching</h4>
                <p className="text-xs text-muted-foreground">Precisely match with semantic tag analysis</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs bg-green-100 text-green-700">
                AI
              </Badge>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover-scale transition-all duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="text-gray-600">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-medium text-foreground text-sm">Mock Interview Practice</h4>
                <p className="text-xs text-muted-foreground">AI-generated questions with real-time feedback</p>
              </div>
              <Badge variant="secondary" className="ml-auto text-xs bg-purple-100 text-purple-700">
                Pro
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced User Type Buttons */}
        <div className="space-y-4 pb-8">
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-pink-200 to-purple-200 text-gray-700 hover:opacity-90 font-medium py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <a href="/company/register" className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-lg">🏢</span>
                </div>
                <span>I'm a Company</span>
              </div>
              <span className="ml-auto text-xl">→</span>
            </a>
          </Button>
          
          <Button 
            size="lg" 
            className="w-full bg-gradient-to-r from-purple-300 to-pink-300 text-gray-700 hover:opacity-90 font-medium py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            asChild
          >
            <a href="/student/register" className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <span className="text-lg">🎓</span>
                </div>
                <span>I'm a Student</span>
              </div>
              <span className="ml-auto text-xl">→</span>
            </a>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Platform Statistics</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">12K+</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">850+</div>
              <div className="text-xs text-muted-foreground">Companies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-xs text-muted-foreground">Match Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
