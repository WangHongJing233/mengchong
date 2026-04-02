import { useState } from 'react';
import { useStore } from '@/store';
import { Trophy, MapPin, Heart } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [tab, setTab] = useState<'national' | 'city'>('national');
  const { pets } = useStore();
  
  // Create some mock leaderboard data
  const mockLeaderboard = [
    ...pets,
    { id: '101', name: '大橘', avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150', cuteness: 1850 },
    { id: '102', name: '柯基', avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150', cuteness: 1620 },
    { id: '103', name: '二哈', avatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150', cuteness: 1400 },
  ].sort((a, b) => b.cuteness - a.cuteness);

  return (
    <div className="min-h-full pb-20 bg-[#fffaf0]">
      {/* Header */}
      <div className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-4xl relative overflow-hidden shadow-cute">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        
        <h1 className="text-2xl font-black text-white flex items-center gap-2 relative z-10">
          <Trophy className="text-yellow-300" fill="currentColor" />
          萌力排行榜
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-primary-600/50 p-1 rounded-2xl mt-6 relative z-10 backdrop-blur-sm">
          <button 
            className={clsx(
              "flex-1 py-2 rounded-xl text-sm font-bold transition-colors",
              tab === 'national' ? "bg-white text-primary-600 shadow-sm" : "text-white/80"
            )}
            onClick={() => setTab('national')}
          >
            全国榜单
          </button>
          <button 
            className={clsx(
              "flex-1 py-2 rounded-xl text-sm font-bold transition-colors flex justify-center items-center gap-1",
              tab === 'city' ? "bg-white text-primary-600 shadow-sm" : "text-white/80"
            )}
            onClick={() => setTab('city')}
          >
            <MapPin size={14} /> 同城榜单
          </button>
        </div>
      </div>

      {/* List */}
      <div className="px-4 mt-6 flex flex-col gap-3">
        {mockLeaderboard.map((pet, index) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={pet.id} 
            className="bg-white rounded-2xl p-4 flex items-center shadow-soft"
          >
            {/* Rank */}
            <div className="w-8 flex justify-center mr-2">
              {index === 0 && <span className="text-2xl">🥇</span>}
              {index === 1 && <span className="text-2xl">🥈</span>}
              {index === 2 && <span className="text-2xl">🥉</span>}
              {index > 2 && <span className="text-gray-400 font-bold text-lg">{index + 1}</span>}
            </div>
            
            {/* Avatar */}
            <img 
              src={pet.avatar} 
              alt={pet.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-50"
            />
            
            {/* Info */}
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-gray-800 text-base">{pet.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-rose-500 font-bold bg-rose-50 w-max px-2 py-0.5 rounded-md">
                <Heart size={12} fill="currentColor" />
                {pet.cuteness} 萌力
              </div>
            </div>
            
            {/* Action */}
            <button className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center">
              <Heart size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}