import { useState } from 'react';
import { useStore } from '@/store';
import { Heart, Star, Activity, Swords, PawPrint, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { pets, activePetId, checkIn, playWithPet } = useStore();
  const activePet = pets.find(p => p.id === activePetId);
  const [showPK, setShowPK] = useState(false);
  const [pkResult, setPkResult] = useState<any>(null);
  const [showReward, setShowReward] = useState(false);

  if (!activePet) return <div className="p-4 text-center">请先添加宠物</div>;

  const handlePK = () => {
    setShowPK(true);
    // Simulate PK process
    setTimeout(() => {
      const isWin = Math.random() > 0.5;
      setPkResult({ isWin, reward: isWin ? 50 : 10 });
    }, 2000);
  };

  const closePK = () => {
    setShowPK(false);
    setPkResult(null);
  };

  const handleInteraction = (action: 'checkIn' | 'play') => {
    if (action === 'checkIn') checkIn();
    else playWithPet();
    
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1500);
  };

  return (
    <div className="min-h-full pb-20 relative bg-gradient-to-b from-primary-50 to-[#fffaf0]">
      {/* Header Stats */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-900 flex items-center gap-2">
            {activePet.name} 
            <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full font-bold">
              Lv. 5
            </span>
          </h1>
          <p className="text-sm text-primary-600 mt-1 font-medium">今天也要开心哦喵~</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/60 backdrop-blur rounded-2xl p-2 shadow-sm flex flex-col items-center min-w-[60px]">
            <Heart size={18} className="text-rose-500 mb-1" fill="currentColor" />
            <span className="text-xs font-bold text-gray-700">{activePet.cuteness}</span>
          </div>
          <div className="bg-white/60 backdrop-blur rounded-2xl p-2 shadow-sm flex flex-col items-center min-w-[60px]">
            <Star size={18} className="text-yellow-500 mb-1" fill="currentColor" />
            <span className="text-xs font-bold text-gray-700">{activePet.appearanceScore}</span>
          </div>
        </div>
      </div>

      {/* Pet Display Area */}
      <div className="relative w-full h-[380px] flex items-center justify-center mt-4">
        {/* Decorative background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-secondary-200 rounded-full blur-2xl opacity-40"></div>
        
        <motion.div 
          className="relative z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <div className="w-56 h-56 rounded-full p-2 bg-white shadow-cute relative">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary-50">
              <img 
                src={activePet.avatar} 
                alt={activePet.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Interaction Badges */}
            <AnimatePresence>
              {showReward && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.5 }}
                  animate={{ opacity: 1, y: -40, scale: 1 }}
                  exit={{ opacity: 0, y: -60 }}
                  className="absolute -top-4 right-0 bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-rose-500 flex items-center gap-1"
                >
                  <Heart size={14} fill="currentColor" /> +10
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 shadow-soft flex justify-between">
          <button 
            onClick={() => handleInteraction('checkIn')}
            className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-blue-100">
              <PawPrint size={24} />
            </div>
            <span className="text-sm font-bold text-gray-600">日常打卡</span>
          </button>
          <button 
            onClick={() => handleInteraction('play')}
            className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-100">
              <Activity size={24} />
            </div>
            <span className="text-sm font-bold text-gray-600">互动玩耍</span>
          </button>
          <button 
            onClick={handlePK}
            className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-100">
              <Swords size={24} />
            </div>
            <span className="text-sm font-bold text-gray-600">匹配PK</span>
          </button>
        </div>
      </div>

      {/* Big PK Button */}
      <div className="px-6 mt-8">
        <button 
          onClick={handlePK}
          className="w-full bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-3xl py-4 font-black text-lg shadow-cute flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Sparkles className="animate-pulse" />
          开启萌宠对决
          <Sparkles className="animate-pulse" />
        </button>
      </div>

      {/* PK Modal */}
      <AnimatePresence>
        {showPK && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-sm rounded-4xl p-6 relative overflow-hidden shadow-2xl"
            >
              {!pkResult ? (
                <div className="text-center py-10">
                  <div className="w-24 h-24 mx-auto border-4 border-primary-100 rounded-full border-t-primary-500 animate-spin mb-6"></div>
                  <h3 className="text-xl font-bold text-gray-800">正在匹配对手...</h3>
                  <p className="text-gray-500 mt-2 text-sm">综合颜值、萌力值与活跃度评估中</p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">{pkResult.isWin ? '🏆' : '🫂'}</div>
                  <h3 className={`text-2xl font-black mb-2 ${pkResult.isWin ? 'text-primary-600' : 'text-gray-600'}`}>
                    {pkResult.isWin ? 'PK 胜利！' : '再接再厉！'}
                  </h3>
                  <p className="text-gray-600 mb-8 font-medium">
                    {pkResult.isWin ? '你的宝贝太迷人了，对手甘拜下风' : '对方也是个小可爱呢，差一点点就赢了'}
                  </p>
                  
                  <div className="bg-primary-50 rounded-2xl p-4 mb-8">
                    <div className="text-sm text-primary-800 font-bold mb-1">获得萌力值奖励</div>
                    <div className="text-3xl font-black text-primary-500 flex items-center justify-center gap-1">
                      <Heart fill="currentColor" /> +{pkResult.reward}
                    </div>
                  </div>

                  <button 
                    onClick={closePK}
                    className="w-full bg-gray-900 text-white rounded-2xl py-3.5 font-bold shadow-md active:scale-95 transition-transform"
                  >
                    开心收下
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}