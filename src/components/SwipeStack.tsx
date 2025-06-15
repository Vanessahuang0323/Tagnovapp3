import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from './SwipeCard';
import { Button } from '@/components/ui/button';
import { Heart, X, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  image: string;
  matchPercentage: number;
  bio: string;
}

interface SwipeStackProps {
  candidates: Candidate[];
  onLike: (candidate: Candidate) => void;
  onPass: (candidate: Candidate) => void;
  onComplete?: () => void;
}

const SwipeStack = ({ candidates, onLike, onPass, onComplete }: SwipeStackProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [likedCount, setLikedCount] = useState(0);
  const [passedCount, setPassedCount] = useState(0);
  const { toast } = useToast();

  const currentCandidate = candidates[currentIndex];
  const nextCandidate = candidates[currentIndex + 1];
  const hasMore = currentIndex < candidates.length;

  const handleSwipeLeft = (candidate: Candidate) => {
    setDirection('left');
    setPassedCount(prev => prev + 1);
    onPass(candidate);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 300);

    toast({
      title: "已略過",
      description: `${candidate.name} 已加入略過清單`,
    });
  };

  const handleSwipeRight = (candidate: Candidate) => {
    setDirection('right');
    setLikedCount(prev => prev + 1);
    onLike(candidate);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDirection(null);
    }, 300);

    toast({
      title: "已收藏",
      description: `${candidate.name} 已加入您的收藏清單`,
    });
  };

  const handleButtonSwipe = (type: 'left' | 'right') => {
    if (currentCandidate) {
      if (type === 'left') {
        handleSwipeLeft(currentCandidate);
      } else {
        handleSwipeRight(currentCandidate);
      }
    }
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setLikedCount(0);
    setPassedCount(0);
    setDirection(null);
  };

  useEffect(() => {
    if (!hasMore && onComplete) {
      onComplete();
    }
  }, [hasMore, onComplete]);

  if (!hasMore) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">瀏覽完成！</h2>
          <p className="text-gray-600 max-w-md">
            您已經瀏覽完所有候選人。收藏了 {likedCount} 位，略過了 {passedCount} 位。
          </p>
        </motion.div>

        <div className="flex gap-4">
          <Button
            onClick={resetStack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            重新開始
          </Button>
          <Button
            onClick={() => window.location.href = '/company/saved-candidates'}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            查看收藏清單
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          總共瀏覽了 {candidates.length} 位候選人
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentIndex + 1} / {candidates.length}</span>
          <span>♥️ {likedCount} | ✕ {passedCount}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex) / candidates.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative h-[600px] mb-6">
        <AnimatePresence mode="wait">
          {/* Next Card (Background) */}
          {nextCandidate && (
            <motion.div
              key={`next-${nextCandidate.id}`}
              className="absolute inset-0"
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 0.95, opacity: 0.7 }}
              style={{
                transform: 'translateY(10px)',
                zIndex: 1,
              }}
            >
              <SwipeCard
                candidate={nextCandidate}
                onSwipeLeft={() => {}}
                onSwipeRight={() => {}}
                isTop={false}
              />
            </motion.div>
          )}

          {/* Current Card (Top) */}
          {currentCandidate && (
            <motion.div
              key={`current-${currentCandidate.id}`}
              className="absolute inset-0"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ zIndex: 2 }}
            >
              <SwipeCard
                candidate={currentCandidate}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
                isTop={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8">
        <Button
          size="lg"
          variant="outline"
          className="h-16 w-16 rounded-full border-2 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
          onClick={() => handleButtonSwipe('left')}
          disabled={!currentCandidate}
        >
          <X className="h-6 w-6 text-red-500" />
        </Button>

        <Button
          size="lg"
          className="h-16 w-16 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200"
          onClick={() => handleButtonSwipe('right')}
          disabled={!currentCandidate}
        >
          <Heart className="h-6 w-6 text-white fill-current" />
        </Button>
      </div>

      {/* Instructions */}
      <div className="text-center mt-4 space-y-1 text-sm text-gray-500">
        <p>← 滑動卡片或點擊按鈕 →</p>
        <p>左滑略過 | 右滑收藏</p>
      </div>
    </div>
  );
};

export default SwipeStack;