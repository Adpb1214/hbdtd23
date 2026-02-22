/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

// Types
type Step = 'welcome' | 'decorate' | 'cake' | 'candles' | 'blow' | 'celebrate';

// Smoke Particle Component
const SmokeParticle = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
    animate={{
      opacity: [0, 0.8, 0],
      y: -60,
      x: [0, x, x * 1.5],
      scale: [0.5, 1.5, 2],
    }}
    transition={{
      duration: 2,
      delay,
      ease: 'easeOut',
    }}
  >
    <div className="w-3 h-3 bg-gray-400 rounded-full blur-sm" />
  </motion.div>
);

// Firework Component
const Firework = ({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) => {
  const particles = 8;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {[...Array(particles)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i * 360) / particles * (Math.PI / 180)) * 80,
            y: Math.sin((i * 360) / particles * (Math.PI / 180)) * 80,
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 1,
            delay: delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  );
};

// Floating Heart Component
const FloatingHeart = ({ delay, left }: { delay: number; left: string }) => {
  const hearts = ['❤️', '💖', '💕', '💗', '💝', '💜', '💛', '🧡'];
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
  
  return (
    <motion.div
      className="absolute bottom-0 text-2xl sm:text-3xl md:text-4xl pointer-events-none z-0"
      style={{ left }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      {randomHeart}
    </motion.div>
  );
};

// Birthday Banner Component
const BirthdayBanner = () => {
  const letters = "HAPPY BIRTHDAY!".split('');
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4ECDC4', '#9B59B6', '#FF9F1C', '#E91E63'];
  
  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4 px-2 relative z-10"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
          style={{ 
            color: colors[i % colors.length],
            textShadow: '3px 3px 6px rgba(0,0,0,0.4)'
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Party Popper Component
const PartyPopper = ({ side }: { side: 'left' | 'right' }) => {
  return (
    <motion.div
      className={`absolute ${side === 'left' ? 'left-4 sm:left-12' : 'right-4 sm:right-12'} top-1/3 text-5xl sm:text-6xl md:text-7xl z-10`}
      initial={{ scale: 0, rotate: side === 'left' ? -45 : 45 }}
      animate={{ 
        scale: 1,
        rotate: side === 'left' ? -15 : 15,
      }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
    >
      {side === 'left' ? '🎉' : '🎊'}
    </motion.div>
  );
};

// Birthday Crown Component
const BirthdayCrown = () => (
  <motion.div
    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 z-10"
    initial={{ y: -100, opacity: 0, rotate: -20 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
  >
    👑
  </motion.div>
);

// Birthday Wishes Component
const BirthdayWishes = () => {
  const wishes = [
    "🌟 May all your dreams come true!",
    "🎈 Wishing you endless joy & happiness!",
    "💖 You're absolutely amazing!",
    "🌈 Keep shining bright always!",
  ];

  return (
    <motion.div 
      className="mt-8 space-y-3 px-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {wishes.map((wish, i) => (
        <motion.p
          key={i}
          className="text-pink-100 text-lg sm:text-xl md:text-2xl font-medium text-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.15 }}
        >
          {wish}
        </motion.p>
      ))}
    </motion.div>
  );
};

// Age Display Component
const AgeDisplay = ({ age }: { age: number }) => (
  <motion.div
    className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 my-6 relative z-10"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: 'spring', bounce: 0.5, delay: 0.3 }}
  >
    <motion.span
      className="text-7xl sm:text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg"
      style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}
    >
      {age}
    </motion.span>
    <span className="text-2xl sm:text-3xl md:text-4xl text-white font-bold text-center drop-shadow-lg">
      years of<br className="sm:hidden" /> awesome!
    </span>
  </motion.div>
);

// Individual Candle Component
const Candle = ({
  index,
  isLit,
  isBlowing,
  blowDelay,
}: {
  index: number;
  isLit: boolean;
  isBlowing: boolean;
  blowDelay: number;
}) => {
  const [showSmoke, setShowSmoke] = useState(false);
  const [flameOut, setFlameOut] = useState(false);

  useEffect(() => {
    if (isBlowing) {
      const timer = setTimeout(() => {
        setFlameOut(true);
        setShowSmoke(true);
      }, blowDelay);
      return () => clearTimeout(timer);
    } else {
      setFlameOut(false);
      setShowSmoke(false);
    }
  }, [isBlowing, blowDelay]);

  const candleColors = [
    'from-pink-300 to-pink-500',
    'from-blue-300 to-blue-500',
    'from-yellow-300 to-yellow-500',
    'from-green-300 to-green-500',
    'from-purple-300 to-purple-500',
  ];

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', bounce: 0.5 }}
      className="flex flex-col items-center relative"
    >
      {showSmoke && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <SmokeParticle delay={0} x={-10} />
          <SmokeParticle delay={0.1} x={5} />
          <SmokeParticle delay={0.2} x={-5} />
        </div>
      )}

      <AnimatePresence>
        {isLit && !flameOut && (
          <motion.div
            className="relative mb-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: [1, 1.5, 0],
              opacity: [1, 0.8, 0],
              x: [0, 20, 40],
              rotate: [0, 30, 60],
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="absolute -inset-2 bg-yellow-400 rounded-full blur-lg opacity-50"
            />

            <motion.div
              animate={{
                scaleY: [1, 1.1, 0.95, 1.05, 1],
                scaleX: [1, 0.95, 1.05, 0.98, 1],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
              className="relative"
            >
              <div className="w-3 h-5 sm:w-4 sm:h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full"
                style={{ clipPath: 'ellipse(50% 60% at 50% 60%)' }}
              />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-gradient-to-t from-white via-yellow-200 to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-0.5 h-1.5 sm:h-2 bg-gray-800 rounded-t-full" />

      <div className={`w-2 h-8 sm:w-3 sm:h-10 bg-gradient-to-b ${candleColors[index]} rounded-sm rounded-t-none shadow-md relative overflow-hidden`}>
        <div className="absolute top-0 left-0 w-1 h-1.5 bg-white/40 rounded-b-full" />
        <div className="absolute inset-y-0 left-0 w-0.5 bg-white/20" />
      </div>
    </motion.div>
  );
};

// Cake Component
const BirthdayCake = ({
  showCandles,
  candlesLit,
  isBlowing,
}: {
  showCandles: boolean;
  candlesLit: boolean;
  isBlowing: boolean;
}) => {
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
      className="relative flex flex-col items-center scale-90 sm:scale-100 my-8 z-10"
    >
      {showCandles && (
        <div className="flex justify-center gap-3 sm:gap-4 mb-0 relative z-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <Candle
              key={i}
              index={i}
              isLit={candlesLit}
              isBlowing={isBlowing}
              blowDelay={i * 100}
            />
          ))}
        </div>
      )}

      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl z-30"
        >
          ✨
        </motion.div>

        {/* Layer 1 */}
        <motion.div className="relative z-10">
          <div className="w-28 sm:w-32 md:w-36 h-10 sm:h-12 md:h-14 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-500 rounded-t-[2rem] rounded-b-lg shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-gradient-to-b from-pink-100 to-pink-200 rounded-t-[2rem]" />
            <div className="absolute bottom-0 left-2 w-3 h-4 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 left-8 w-4 h-5 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 right-6 w-3 h-4 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 right-1 w-2 h-3 bg-pink-200 rounded-b-full" />
            <div className="absolute top-4 left-4 w-1 h-2 bg-yellow-400 rounded-full rotate-45" />
            <div className="absolute top-5 left-8 w-1 h-2 bg-blue-400 rounded-full -rotate-12" />
            <div className="absolute top-4 right-6 w-1 h-2 bg-green-400 rounded-full" />
            <div className="absolute top-5 right-3 w-1 h-2 bg-purple-400 rounded-full" />
          </div>
        </motion.div>

        {/* Layer 2 */}
        <motion.div className="relative z-5 -mt-2">
          <div className="w-36 sm:w-44 md:w-48 h-12 sm:h-14 md:h-16 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-500 rounded-lg shadow-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-3 w-4 h-5 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 left-12 w-3 h-4 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 right-10 w-4 h-6 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 right-3 w-3 h-4 bg-purple-200 rounded-b-full" />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-white/20 flex items-center justify-around">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Layer 3 */}
        <motion.div className="relative -mt-2">
          <div className="w-48 sm:w-56 md:w-60 h-14 sm:h-16 md:h-20 bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 rounded-lg rounded-b-2xl shadow-xl relative overflow-hidden">
            <div className="absolute bottom-0 left-4 w-5 h-6 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 left-14 w-4 h-5 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 right-12 w-5 h-7 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 right-3 w-4 h-5 bg-amber-100 rounded-b-full" />
            <div className="absolute top-2 left-6">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-1.5 left-1/2 w-0.5 h-1.5 bg-green-600 rounded-full" />
            </div>
            <div className="absolute top-2 right-6">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-1.5 left-1/2 w-0.5 h-1.5 bg-green-600 rounded-full" />
            </div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-1.5 left-1/2 w-0.5 h-1.5 bg-green-600 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Plate */}
        <div className="relative -mt-1">
          <div className="w-56 sm:w-64 md:w-72 h-4 sm:h-5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 rounded-full shadow-lg" />
        </div>

        {candlesLit && !isBlowing && (
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 -m-8 bg-yellow-300/20 rounded-full blur-3xl -z-10"
          />
        )}
      </div>
    </motion.div>
  );
};

// Floating Balloon Component
const Balloon = ({ color, delay, left }: { color: string; delay: number; left: string }) => {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none z-0"
      style={{ left }}
      initial={{ y: '100vh' }}
      animate={{ y: '-100vh' }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <motion.div
        animate={{ x: [0, 20, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="relative w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 rounded-full shadow-lg"
          style={{ background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)` }}
        >
          <div className="absolute top-2 left-2 w-3 h-3 bg-white/50 rounded-full" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: color }} />
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-0.5 h-14 bg-gray-400" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Sparkle Component
const Sparkle = ({ delay }: { delay: number }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  return (
    <motion.div
      className="absolute text-lg sm:text-xl text-yellow-300 pointer-events-none z-0"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, delay }}
    >
      ✦
    </motion.div>
  );
};

// Wind Effect Component
const WindEffect = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
        style={{ top: `${25 + i * 4}%`, width: '120px', left: '-120px' }}
        animate={{ x: [0, 2000], opacity: [0, 1, 0] }}
        transition={{ duration: 0.4, delay: i * 0.02, ease: 'easeOut' }}
      />
    ))}
  </div>
);

// Gift Box Component
const GiftBox = ({ delay, emoji }: { delay: number; emoji: string }) => (
  <motion.div
    className="text-4xl sm:text-5xl md:text-6xl"
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: 'spring', bounce: 0.5 }}
  >
    {emoji}
  </motion.div>
);

// Main Component
export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isBlowing, setIsBlowing] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const balloonColors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#FF9F1C', '#9B59B6', '#3498DB', '#E91E63'];
  const fireworkColors = ['#FF6B6B', '#FFD93D', '#4ECDC4', '#9B59B6', '#FF9F1C', '#E91E63'];

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBlow = useCallback(() => {
    setShowWind(true);
    setIsBlowing(true);
    
    setTimeout(() => setShowWind(false), 600);
    
    setTimeout(() => {
      setStep('celebrate');
      setShowConfetti(true);
      setShowFireworks(true);
      setIsBlowing(false);
      
      setTimeout(() => setShowFireworks(false), 3000);
      setTimeout(() => setShowConfetti(false), 12000);
    }, 1000);
  }, []);

  const nextStep = useCallback(() => {
    const steps: Step[] = ['welcome', 'decorate', 'cake', 'candles', 'blow', 'celebrate'];
    const currentIndex = steps.indexOf(step);
    
    if (step === 'blow') {
      handleBlow();
      return;
    }
    
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step, handleBlow]);

  const resetCelebration = () => {
    setStep('welcome');
    setIsBlowing(false);
    setShowWind(false);
    setShowConfetti(false);
    setShowFireworks(false);
  };

  const stepConfig = {
    welcome: {
      title: "🎉 A Special Celebration Awaits!",
      subtitle: "Someone very special has a birthday today...",
      buttonText: "Let's Celebrate! 🎊",
      gradient: "from-purple-600 via-pink-500 to-rose-500",
    },
    decorate: {
      title: "🎈 Let's Decorate!",
      subtitle: "The room is getting ready for the party",
      buttonText: "Bring the Cake! 🎂",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
    },
    cake: {
      title: "🎂 Here Comes the Cake!",
      subtitle: "A delicious birthday cake just for you",
      buttonText: "Light the Candles! 🕯️",
      gradient: "from-amber-500 via-orange-500 to-red-500",
    },
    candles: {
      title: "🕯️ Make a Wish!",
      subtitle: "Close your eyes and make a special wish...",
      buttonText: "Ready to Blow! 💨",
      gradient: "from-yellow-500 via-orange-500 to-red-500",
    },
    blow: {
      title: "💨 Take a Deep Breath...",
      subtitle: "Ready? Blow out all the candles!",
      buttonText: "🌬️ BLOW! 🌬️",
      gradient: "from-pink-500 via-rose-500 to-red-500",
    },
    celebrate: {
      title: "🎉 HAPPY BIRTHDAY TANUSHREE! 🎉",
      subtitle: "May all your wishes come true! 🌟",
      buttonText: "",
      gradient: "from-purple-500 via-pink-500 to-red-500",
    },
  };

  const currentConfig = stepConfig[step];

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Confetti */}
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={windowSize.width < 640 ? 150 : 300}
          colors={balloonColors}
          gravity={0.3}
        />
      )}

      {/* Fireworks */}
      {showFireworks && (
        <>
          <Firework x={20} y={20} color={fireworkColors[0]} delay={0} />
          <Firework x={80} y={15} color={fireworkColors[1]} delay={0.2} />
          <Firework x={50} y={25} color={fireworkColors[2]} delay={0.4} />
          <Firework x={15} y={40} color={fireworkColors[3]} delay={0.6} />
          <Firework x={85} y={35} color={fireworkColors[4]} delay={0.8} />
        </>
      )}

      {/* Wind Effect */}
      {showWind && <WindEffect />}

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-10 left-10 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        {Array.from({ length: windowSize.width < 640 ? 10 : 20 }).map((_, i) => (
          <Sparkle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Balloons */}
      {step !== 'welcome' &&
        balloonColors.slice(0, windowSize.width < 640 ? 4 : 8).map((color, i) => (
          <Balloon key={i} color={color} delay={i * 1.2} left={`${5 + i * (windowSize.width < 640 ? 22 : 12)}%`} />
        ))}

      {/* Floating Hearts */}
      {step === 'celebrate' &&
        [...Array(windowSize.width < 640 ? 4 : 8)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.4} left={`${Math.random() * 85 + 5}%`} />
        ))}

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
            className="text-center w-full max-w-5xl mx-auto flex flex-col items-center justify-center"
          >
            {/* Party Poppers */}
            {step === 'celebrate' && (
              <>
                <PartyPopper side="left" />
                <PartyPopper side="right" />
              </>
            )}

            {/* Birthday Banner */}
            {step === 'celebrate' && <BirthdayBanner />}

            {/* Crown */}
            {step === 'celebrate' && <BirthdayCrown />}

            {/* Title */}
            <motion.h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight px-2 drop-shadow-2xl"
              style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.3)' }}
            >
              {currentConfig.title}
            </motion.h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-2xl md:text-3xl text-pink-100 mb-8 px-4 drop-shadow-lg font-medium">
              {currentConfig.subtitle}
            </p>

            {/* Age Display */}
            {step === 'celebrate' && <AgeDisplay age={25} />}

            {/* Cake */}
            {(step === 'cake' || step === 'candles' || step === 'blow') && (
              <div className="my-8 flex justify-center w-full">
                <BirthdayCake
                  showCandles={step === 'candles' || step === 'blow'}
                  candlesLit={step === 'candles' || step === 'blow'}
                  isBlowing={isBlowing}
                />
              </div>
            )}

            {/* Celebration Content */}
            {step === 'celebrate' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 w-full flex flex-col items-center"
              >
                {/* Emoji Row */}
                <motion.div
                  className="flex justify-center gap-3 sm:gap-4 md:gap-6 text-4xl sm:text-5xl md:text-6xl mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {['🎈', '🎊', '🎉', '🎁', '🎈'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1, type: 'spring', bounce: 0.5 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
                
                {/* Gifts */}
                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-8">
                  {['🎁', '💝', '🎀', '🎁'].map((emoji, i) => (
                    <GiftBox key={i} delay={0.6 + i * 0.1} emoji={emoji} />
                  ))}
                </div>
                
                {/* Cake */}
                <div className="flex justify-center w-full mb-8">
                  <BirthdayCake showCandles={false} candlesLit={false} isBlowing={false} />
                </div>
                
                {/* Wishes */}
                <BirthdayWishes />
              </motion.div>
            )}

            {/* Decorations Step */}
            {step === 'decorate' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-5xl sm:text-6xl md:text-7xl mb-8 sm:mb-12 flex justify-center gap-4 sm:gap-6 md:gap-8"
              >
                {['🎈', '🎊', '🎁', '🎀', '🎉'].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.15, type: 'spring', bounce: 0.5 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Welcome Icon */}
            {step === 'welcome' && (
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl sm:text-8xl md:text-9xl mb-8 sm:mb-12"
              >
                🎂
              </motion.div>
            )}

            {/* Action Button */}
            {currentConfig.buttonText && (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,255,255,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                disabled={isBlowing}
                className={`
                  bg-gradient-to-r ${currentConfig.gradient}
                  text-white
                  text-xl sm:text-2xl md:text-3xl
                  px-10 sm:px-14 md:px-16
                  py-5 sm:py-6 md:py-7
                  rounded-full
                  font-black
                  shadow-2xl
                  transition-all duration-300
                  relative overflow-hidden
                  disabled:opacity-50 disabled:cursor-not-allowed
                  border-4 border-white/30
                  mt-4
                `}
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
              >
                <span className="relative z-10">{currentConfig.buttonText}</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            )}

            {/* Restart Button */}
            {step === 'celebrate' && (
              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={resetCelebration}
                className="
                  mt-10
                  bg-gradient-to-r from-white/20 to-white/10
                  backdrop-blur-sm
                  text-white
                  text-lg sm:text-xl md:text-2xl
                  px-10 sm:px-12 md:px-14
                  py-4 sm:py-5 md:py-6
                  rounded-full
                  font-bold
                  hover:from-white/30 hover:to-white/20
                  transition-all
                  border-2 border-white/40
                  shadow-xl
                "
              >
                ✨ Celebrate Again! 🔄
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="fixed bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-30">
          {(['welcome', 'decorate', 'cake', 'candles', 'blow', 'celebrate'] as Step[]).map((s) => (
            <motion.div
              key={s}
              className={`h-2 sm:h-3 md:h-4 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 sm:w-10 md:w-12 bg-white shadow-lg shadow-white/50'
                  : 'w-2 sm:w-3 md:w-4 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}