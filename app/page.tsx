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
  const particles = 12;
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
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((i * 360) / particles * (Math.PI / 180)) * 80,
            y: Math.sin((i * 360) / particles * (Math.PI / 180)) * 80,
            opacity: [1, 1, 0],
            scale: [1, 1.5, 0],
          }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: 'easeOut',
          }}
        />
      ))}
      <motion.div
        className="absolute w-4 h-4 rounded-full blur-sm"
        style={{ backgroundColor: color, left: -8, top: -8 }}
        initial={{ scale: 0 }}
        animate={{ scale: [0, 3, 0], opacity: [1, 0.5, 0] }}
        transition={{ duration: 0.5, delay }}
      />
    </motion.div>
  );
};

// Floating Heart Component
const FloatingHeart = ({ delay, left }: { delay: number; left: string }) => {
  const hearts = ['❤️', '💖', '💕', '💗', '💝', '💜', '💛', '🧡'];
  const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];
  
  return (
    <motion.div
      className="absolute bottom-0 text-2xl pointer-events-none"
      style={{ left }}
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ 
        y: '-100vh', 
        opacity: [0, 1, 1, 0],
        rotate: [0, 20, -20, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {randomHeart}
      </motion.div>
    </motion.div>
  );
};

// Musical Notes Component
const MusicalNote = ({ delay, startX }: { delay: number; startX: number }) => {
  const notes = ['🎵', '🎶', '🎼', '♪', '♫'];
  const randomNote = notes[Math.floor(Math.random() * notes.length)];
  
  return (
    <motion.div
      className="absolute text-3xl pointer-events-none"
      style={{ left: `${startX}%`, bottom: '20%' }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: -200,
        x: [0, 30, -20, 40, 0],
        rotate: [0, 15, -15, 10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    >
      {randomNote}
    </motion.div>
  );
};

// Birthday Banner Component
const BirthdayBanner = () => {
  const letters = "HAPPY BIRTHDAY!".split('');
  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4ECDC4', '#9B59B6', '#FF9F1C', '#E91E63'];
  
  return (
    <motion.div 
      className="flex justify-center gap-1 mb-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 1 }}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="text-2xl md:text-4xl font-bold"
          style={{ 
            color: colors[i % colors.length],
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
          }}
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
      className={`absolute ${side === 'left' ? 'left-4' : 'right-4'} top-1/2 text-6xl`}
      initial={{ scale: 0, rotate: side === 'left' ? -30 : 30 }}
      animate={{ 
        scale: [0, 1.2, 1],
        rotate: side === 'left' ? [-30, -15, -30] : [30, 15, 30],
      }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {side === 'left' ? '🎉' : '🎊'}
      </motion.div>
    </motion.div>
  );
};

// Birthday Crown Component
const BirthdayCrown = () => (
  <motion.div
    className="text-6xl md:text-7xl mb-4"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    👑
  </motion.div>
);

// Glitter Effect Component
const GlitterEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-yellow-300 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

// Birthday Wishes Component
const BirthdayWishes = () => {
  const wishes = [
    "🌟 May your dreams come true!",
    "🎈 Wishing you endless happiness!",
    "💖 You're amazing!",
    "🌈 Shine bright always!",
    "🎁 You deserve the best!",
    "✨ Stay wonderful!",
    "🦋 Keep being awesome!",
    "🌸 Spread joy everywhere!",
  ];

  return (
    <div className="mt-6 space-y-2">
      {wishes.slice(0, 4).map((wish, i) => (
        <motion.p
          key={i}
          className="text-pink-200 text-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 + i * 0.3 }}
        >
          {wish}
        </motion.p>
      ))}
    </div>
  );
};

// Age Display Component
const AgeDisplay = ({ age }: { age: number }) => (
  <motion.div
    className="flex items-center justify-center gap-2 my-4"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', bounce: 0.5, delay: 0.5 }}
  >
    <motion.span
      className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {age}
    </motion.span>
    <span className="text-2xl md:text-3xl text-white font-semibold">years of awesome!</span>
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
      transition={{ delay: index * 0.15, type: 'spring', bounce: 0.5 }}
      className="flex flex-col items-center relative"
    >
      {/* Smoke Effect */}
      {showSmoke && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <SmokeParticle delay={0} x={-10} />
          <SmokeParticle delay={0.1} x={5} />
          <SmokeParticle delay={0.2} x={-5} />
          <SmokeParticle delay={0.3} x={8} />
        </div>
      )}

      {/* Flame */}
      <AnimatePresence>
        {isLit && !flameOut && (
          <motion.div
            className="relative mb-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: [1, 1.5, 0],
              opacity: [1, 0.8, 0],
              x: [0, 15, 30],
              rotate: [0, 20, 45],
            }}
            transition={{
              exit: { duration: 0.4, ease: 'easeOut' },
            }}
          >
            {/* Outer glow */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute -inset-2 bg-yellow-400 rounded-full blur-lg opacity-40"
            />

            {/* Main flame */}
            <motion.div
              animate={{
                scaleY: [1, 1.15, 0.95, 1.1, 1],
                scaleX: [1, 0.9, 1.1, 0.95, 1],
                rotate: [0, 3, -3, 2, 0],
              }}
              transition={{ duration: 0.4, repeat: Infinity }}
              className="relative"
            >
              {/* Outer flame */}
              <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full rounded-b-[40%]"
                style={{
                  clipPath: 'ellipse(50% 60% at 50% 60%)',
                  filter: 'blur(0.5px)',
                }}
              />
              {/* Inner flame */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-white via-yellow-200 to-transparent rounded-full" />
              {/* Flame tip */}
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-100 rounded-full blur-[1px]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wick */}
      <div className="w-0.5 h-2 bg-gray-800 rounded-t-full" />

      {/* Candle body */}
      <motion.div
        animate={isLit && !flameOut ? { 
          boxShadow: ['0 0 10px rgba(255,200,100,0.3)', '0 0 20px rgba(255,200,100,0.5)', '0 0 10px rgba(255,200,100,0.3)']
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className={`w-3 h-10 bg-gradient-to-b ${candleColors[index]} rounded-sm rounded-t-none shadow-md relative overflow-hidden`}
      >
        {/* Wax drip */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
          className="absolute top-0 left-0 w-1.5 h-2 bg-white/40 rounded-b-full"
        />
        <div className="absolute top-0 right-0 w-1 h-1.5 bg-white/30 rounded-b-full" />
        {/* Shine */}
        <div className="absolute inset-y-0 left-0 w-1 bg-white/20" />
      </motion.div>
    </motion.div>
  );
};

// Cake Component
const BirthdayCake = ({
  showCandles,
  candlesLit,
  isBlowing,
  size = 'normal',
}: {
  showCandles: boolean;
  candlesLit: boolean;
  isBlowing: boolean;
  size?: 'normal' | 'large';
}) => {
  const scale = size === 'large' ? 1.2 : 1;
  
  return (
    <motion.div
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: scale, y: 0 }}
      transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
      className="relative flex flex-col items-center"
    >
      {/* Candles Container */}
      {showCandles && (
        <div className="flex justify-center gap-5 mb-0 relative z-20">
          {[0, 1, 2, 3, 4].map((i) => (
            <Candle
              key={i}
              index={i}
              isLit={candlesLit}
              isBlowing={isBlowing}
              blowDelay={i * 150}
            />
          ))}
        </div>
      )}

      {/* Cake Container */}
      <div className="relative flex flex-col items-center">
        {/* Top decoration */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-3xl z-30"
        >
          ✨
        </motion.div>

        {/* Layer 1 - Top (smallest) */}
        <motion.div
          className="relative z-10"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-36 h-14 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-500 rounded-t-[2rem] rounded-b-lg shadow-lg relative overflow-hidden">
            {/* Top frosting */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-pink-100 to-pink-200 rounded-t-[2rem]" />
            {/* Frosting drips */}
            <div className="absolute bottom-0 left-3 w-4 h-5 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 left-10 w-5 h-7 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 right-8 w-4 h-6 bg-pink-200 rounded-b-full" />
            <div className="absolute bottom-0 right-2 w-3 h-4 bg-pink-200 rounded-b-full" />
            {/* Sprinkles */}
            <div className="absolute top-5 left-5 w-1.5 h-3 bg-yellow-400 rounded-full rotate-45" />
            <div className="absolute top-6 left-10 w-1.5 h-3 bg-blue-400 rounded-full -rotate-12" />
            <div className="absolute top-5 right-8 w-1.5 h-3 bg-green-400 rounded-full rotate-30" />
            <div className="absolute top-7 right-4 w-1.5 h-3 bg-purple-400 rounded-full -rotate-45" />
            <div className="absolute top-4 left-16 w-1.5 h-3 bg-red-400 rounded-full rotate-12" />
          </div>
        </motion.div>

        {/* Layer 2 - Middle */}
        <motion.div
          className="relative z-5 -mt-2"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.15, ease: 'easeInOut' }}
        >
          <div className="w-48 h-16 bg-gradient-to-b from-purple-200 via-purple-400 to-purple-500 rounded-lg shadow-lg relative overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute bottom-0 left-4 w-5 h-6 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 left-14 w-4 h-5 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 right-12 w-5 h-7 bg-purple-200 rounded-b-full" />
            <div className="absolute bottom-0 right-4 w-4 h-5 bg-purple-200 rounded-b-full" />
            {/* Decorative band */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-3 bg-white/20 flex items-center justify-around">
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
              <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <div className="w-2 h-2 bg-pink-400 rounded-full" />
            </div>
          </div>
        </motion.div>

        {/* Layer 3 - Bottom (largest) */}
        <motion.div
          className="relative -mt-2"
          animate={{ y: [0, -1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3, ease: 'easeInOut' }}
        >
          <div className="w-60 h-20 bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 rounded-lg rounded-b-2xl shadow-xl relative overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute bottom-0 left-5 w-6 h-7 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 left-16 w-5 h-6 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 right-14 w-6 h-8 bg-amber-100 rounded-b-full" />
            <div className="absolute bottom-0 right-4 w-5 h-6 bg-amber-100 rounded-b-full" />
            {/* Cherry decorations */}
            <div className="absolute top-3 left-8">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-2 left-1/2 w-0.5 h-2 bg-green-600 rounded-full" />
            </div>
            <div className="absolute top-3 right-8">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-2 left-1/2 w-0.5 h-2 bg-green-600 rounded-full" />
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 bg-red-500 rounded-full shadow-md" />
              <div className="absolute -top-2 left-1/2 w-0.5 h-2 bg-green-600 rounded-full" />
            </div>
            {/* Decorative waves */}
            <div className="absolute bottom-4 left-0 right-0 h-2 bg-amber-200/50" 
              style={{ clipPath: 'polygon(0 100%, 5% 50%, 10% 100%, 15% 50%, 20% 100%, 25% 50%, 30% 100%, 35% 50%, 40% 100%, 45% 50%, 50% 100%, 55% 50%, 60% 100%, 65% 50%, 70% 100%, 75% 50%, 80% 100%, 85% 50%, 90% 100%, 95% 50%, 100% 100%)' }}
            />
          </div>
        </motion.div>

        {/* Cake plate */}
        <div className="relative -mt-1">
          <div className="w-72 h-5 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-400 rounded-full shadow-lg" />
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-68 h-2 bg-white/30 rounded-full" />
        </div>

        {/* Cake glow when candles lit */}
        {candlesLit && !isBlowing && (
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 -m-8 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full blur-2xl -z-10"
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
      className="absolute bottom-0 pointer-events-none"
      style={{ left }}
      initial={{ y: '100vh' }}
      animate={{ y: '-100vh' }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'linear',
      }}
    >
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="relative w-14 h-16 rounded-full shadow-lg"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`,
          }}
        >
          <div className="absolute top-3 left-3 w-4 h-4 bg-white/50 rounded-full" />
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
            style={{ backgroundColor: color }}
          />
          <motion.div 
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gray-400"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
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
      className="absolute text-yellow-300 pointer-events-none text-xl"
      style={{ left: `${randomX}%`, top: `${randomY}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
      }}
    >
      ✦
    </motion.div>
  );
};

// Wind Effect Component
const WindEffect = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
        style={{
          top: `${25 + i * 4}%`,
          width: '150px',
          left: '-150px',
        }}
        animate={{
          x: [0, 800],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.6,
          delay: i * 0.04,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

// Gift Box Component
const GiftBox = ({ delay }: { delay: number }) => {
  const gifts = ['🎁', '🎀', '📦', '💝'];
  const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
  
  return (
    <motion.div
      className="text-4xl"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', bounce: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: delay * 0.5 }}
      >
        {randomGift}
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function Home() {
  const [step, setStep] = useState<Step>('welcome');
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isBlowing, setIsBlowing] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const balloonColors = [
    '#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77',
    '#FF9F1C', '#9B59B6', '#3498DB', '#E91E63',
  ];

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
    
    setTimeout(() => setShowWind(false), 1000);
    
    setTimeout(() => {
      setStep('celebrate');
      setShowConfetti(true);
      setShowFireworks(true);
      setIsBlowing(false);
      
      // Multiple firework bursts
      const fireworkInterval = setInterval(() => {
        setShowFireworks(false);
        setTimeout(() => setShowFireworks(true), 100);
      }, 2000);
      
      setTimeout(() => {
        clearInterval(fireworkInterval);
        setShowConfetti(false);
        setShowFireworks(false);
      }, 15000);
    }, 1500);
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
      gradient: "from-purple-500 to-pink-500",
    },
    decorate: {
      title: "🎈 Let's Decorate!",
      subtitle: "The room is getting ready for the party",
      buttonText: "Bring the Cake! 🎂",
      gradient: "from-blue-500 to-cyan-500",
    },
    cake: {
      title: "🎂 Here Comes the Cake!",
      subtitle: "A delicious birthday cake just for you",
      buttonText: "Light the Candles! 🕯️",
      gradient: "from-amber-500 to-orange-500",
    },
    candles: {
      title: "🕯️ Make a Wish!",
      subtitle: "Close your eyes and make a special wish...",
      buttonText: "Ready to Blow! 💨",
      gradient: "from-yellow-500 to-red-500",
    },
    blow: {
      title: "💨 Take a Deep Breath...",
      subtitle: "Ready? Blow out all the candles!",
      buttonText: "🌬️ BLOW! 🌬️",
      gradient: "from-pink-500 to-rose-500",
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
          numberOfPieces={400}
          colors={balloonColors}
        />
      )}

      {/* Fireworks */}
      {showFireworks && (
        <>
          <Firework x={20} y={20} color={fireworkColors[0]} delay={0} />
          <Firework x={80} y={15} color={fireworkColors[1]} delay={0.3} />
          <Firework x={50} y={25} color={fireworkColors[2]} delay={0.6} />
          <Firework x={15} y={40} color={fireworkColors[3]} delay={0.9} />
          <Firework x={85} y={35} color={fireworkColors[4]} delay={1.2} />
          <Firework x={35} y={10} color={fireworkColors[5]} delay={1.5} />
        </>
      )}

      {/* Wind Effect */}
      {showWind && <WindEffect />}

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"
        />
        {Array.from({ length: 25 }).map((_, i) => (
          <Sparkle key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Balloons */}
      {step !== 'welcome' &&
        balloonColors.map((color, i) => (
          <Balloon key={i} color={color} delay={i * 1.5} left={`${5 + i * 12}%`} />
        ))}

      {/* Floating Hearts (celebration step) */}
      {step === 'celebrate' &&
        [...Array(10)].map((_, i) => (
          <FloatingHeart key={i} delay={i * 0.5} left={`${Math.random() * 90 + 5}%`} />
        ))}

      {/* Musical Notes (celebration step) */}
      {step === 'celebrate' &&
        [...Array(6)].map((_, i) => (
          <MusicalNote key={i} delay={i * 0.8} startX={10 + i * 15} />
        ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center w-full max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 md:p-16 lg:p-20 shadow-2xl border border-white/20 relative overflow-hidden"
              animate={
                step === 'celebrate'
                  ? {
                      boxShadow: [
                        '0 0 30px rgba(255,192,203,0.3)',
                        '0 0 80px rgba(255,192,203,0.6)',
                        '0 0 30px rgba(255,192,203,0.3)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Glitter Effect for celebration */}
              {step === 'celebrate' && <GlitterEffect />}

              {/* Party Poppers for celebration */}
              {step === 'celebrate' && (
                <>
                  <PartyPopper side="left" />
                  <PartyPopper side="right" />
                </>
              )}

              {/* Decorative corners */}
              <motion.div 
                className="absolute top-6 left-6 text-3xl"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div 
                className="absolute top-6 right-6 text-3xl"
                animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.div>
              <motion.div 
                className="absolute bottom-6 left-6 text-3xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                🌟
              </motion.div>
              <motion.div 
                className="absolute bottom-6 right-6 text-3xl"
                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
              >
                🌟
              </motion.div>

              {/* Birthday Banner for celebration */}
              {step === 'celebrate' && <BirthdayBanner />}

              {/* Crown for celebration */}
              {step === 'celebrate' && <BirthdayCrown />}

              {/* Title */}
              <motion.h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                animate={step === 'celebrate' ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {currentConfig.title}
              </motion.h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-pink-200 mb-10">{currentConfig.subtitle}</p>

              {/* Age Display for celebration */}
              {step === 'celebrate' && <AgeDisplay age={25} />}

              {/* Cake Display */}
              {(step === 'cake' || step === 'candles' || step === 'blow') && (
                <div className="my-10 flex justify-center">
                  <BirthdayCake
                    showCandles={step === 'candles' || step === 'blow'}
                    candlesLit={step === 'candles' || step === 'blow'}
                    isBlowing={isBlowing}
                    size="large"
                  />
                </div>
              )}

              {/* Celebration Effects */}
              {step === 'celebrate' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
                  <motion.div className="flex justify-center gap-3 text-5xl md:text-6xl mb-8">
                    {['🎈', '🎊', '🎉', '🎁', '🎈'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        animate={{ 
                          y: [0, -20, 0],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  {/* Gift Boxes */}
                  <div className="flex justify-center gap-6 mb-8">
                    {[0, 1, 2, 3].map((i) => (
                      <GiftBox key={i} delay={1 + i * 0.2} />
                    ))}
                  </div>
                  
                  <BirthdayCake showCandles={false} candlesLit={false} isBlowing={false} size="large" />
                  
                  {/* Birthday Wishes */}
                  <BirthdayWishes />
                </motion.div>
              )}

              {/* Decorations for decorate step */}
              {step === 'decorate' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-6xl md:text-7xl mb-10 flex justify-center gap-6"
                >
                  {['🎈', '🎊', '🎁', '🎀', '🎉'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              )}

              {/* Welcome icon */}
              {step === 'welcome' && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-9xl mb-10"
                >
                  🎂
                </motion.div>
              )}

              {/* Button */}
              {currentConfig.buttonText && (
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(255,255,255,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  disabled={isBlowing}
                  className={`bg-gradient-to-r ${currentConfig.gradient} text-white text-xl md:text-2xl px-12 py-5 rounded-full font-bold shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed`}
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

              {/* Restart button */}
              {step === 'celebrate' && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetCelebration}
                  className="mt-10 bg-white/20 text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
                >
                  ✨ Celebrate Again! 🔄
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {(['welcome', 'decorate', 'cake', 'candles', 'blow', 'celebrate'] as Step[]).map((s) => (
            <motion.div
              key={s}
              className={`h-3 rounded-full transition-all duration-300 ${
                s === step ? 'w-10 bg-white shadow-lg shadow-white/50' : 'w-3 bg-white/30'
              }`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}