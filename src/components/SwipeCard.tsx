import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { Heart, X, Star, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

interface SwipeCardProps {
  candidate: Candidate;
  onSwipeLeft: (candidate: Candidate) => void;
  onSwipeRight: (candidate: Candidate) => void;
  isTop?: boolean;
  style?: React.CSSProperties;
}

const SwipeCard = ({ candidate, onSwipeLeft, onSwipeRight, isTop = false, style }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  // Action indicators
  const leftActionOpacity = useTransform(x, [-200, -50, 0], [1, 0.5, 0]);
  const rightActionOpacity = useTransform(x, [0, 50, 200], [0, 0.5, 1]);
  const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

  const handleDragEnd = (info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const movement = info.offset.x;

    if (Math.abs(velocity) >= 500 || Math.abs(movement) >= threshold) {
      if (movement > 0 || velocity > 0) {
        // Swipe right - Like
        setExitX(1000);
        onSwipeRight(candidate);
      } else {
        // Swipe left - Pass
        setExitX(-1000);
        onSwipeLeft(candidate);
      }
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        scale,
        ...style,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => handleDragEnd(info)}
      animate={exitX !== 0 ? { x: exitX, opacity: 0, scale: 0.8 } : {}}
      transition={{ duration: 0.3 }}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full relative">
        {/* Match Percentage Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className={`${getMatchColor(candidate.matchPercentage)} text-white font-bold`}>
            {candidate.matchPercentage}% Match
          </Badge>
        </div>

        {/* Action Indicators */}
        <motion.div
          className="absolute inset-0 bg-red-500/20 flex items-center justify-center z-10"
          style={{ opacity: leftActionOpacity }}
        >
          <div className="bg-red-500 rounded-full p-4">
            <X className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-green-500/20 flex items-center justify-center z-10"
          style={{ opacity: rightActionOpacity }}
        >
          <div className="bg-green-500 rounded-full p-4">
            <Heart className="w-12 h-12 text-white fill-current" />
          </div>
        </motion.div>

        {/* Candidate Image */}
        <div className="relative h-72 overflow-hidden">
          <img 
            src={candidate.image}
            alt={candidate.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Candidate Info */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
            <p className="text-lg text-gray-600">{candidate.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <Briefcase className="h-3 w-3 text-gray-500" />
              <span className="text-gray-700 text-xs truncate">{candidate.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gray-500" />
              <span className="text-gray-700 text-xs truncate">{candidate.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-gray-500" />
              <span className="text-gray-700 text-xs">{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3 text-gray-500" />
              <span className="text-gray-700 text-xs truncate">{candidate.education}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {candidate.bio}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">技能專長</h4>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.slice(0, 8).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs px-2 py-1">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 8 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{candidate.skills.length - 8}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;