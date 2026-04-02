import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import { useStore } from '../../store'
import './index.scss'

export default function Rank() {
  const [tab, setTab] = useState<'national' | 'city'>('national')
  const { pets } = useStore()
  
  const mockLeaderboard = [
    ...pets,
    { id: '101', name: '大橘', avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150', cuteness: 1850 },
    { id: '102', name: '柯基', avatar: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=150', cuteness: 1620 },
    { id: '103', name: '二哈', avatar: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150', cuteness: 1400 },
  ].sort((a, b) => b.cuteness - a.cuteness)

  return (
    <View className="min-h-screen pb-20 bg-[#fffaf0]">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-4xl relative overflow-hidden shadow-cute">
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></View>
        <View className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></View>
        
        <View className="text-2xl font-black text-white flex items-center gap-2 relative z-10">
          <Text>🏆 萌力排行榜</Text>
        </View>
        
        {/* Tabs */}
        <View className="flex bg-primary-600/50 p-1 rounded-2xl mt-6 relative z-10 backdrop-blur-sm">
          <View 
            className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center transition-colors ${
              tab === 'national' ? "bg-white text-primary-600 shadow-sm" : "text-white/80"
            }`}
            onClick={() => setTab('national')}
          >
            <Text>全国榜单</Text>
          </View>
          <View 
            className={`flex-1 py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-1 transition-colors ${
              tab === 'city' ? "bg-white text-primary-600 shadow-sm" : "text-white/80"
            }`}
            onClick={() => setTab('city')}
          >
            <Text>📍 同城榜单</Text>
          </View>
        </View>
      </View>

      {/* List */}
      <View className="px-4 mt-6 flex flex-col gap-3">
        {mockLeaderboard.map((pet, index) => (
          <View 
            key={pet.id} 
            className="bg-white rounded-2xl p-4 flex flex-row items-center shadow-soft"
          >
            {/* Rank */}
            <View className="w-8 flex justify-center mr-2">
              {index === 0 && <Text className="text-2xl">🥇</Text>}
              {index === 1 && <Text className="text-2xl">🥈</Text>}
              {index === 2 && <Text className="text-2xl">🥉</Text>}
              {index > 2 && <Text className="text-gray-400 font-bold text-lg">{index + 1}</Text>}
            </View>
            
            {/* Avatar */}
            <Image 
              src={pet.avatar} 
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-50"
            />
            
            {/* Info */}
            <View className="ml-4 flex-1">
              <View className="font-bold text-gray-800 text-base"><Text>{pet.name}</Text></View>
              <View className="flex flex-row items-center gap-1 mt-1 text-xs text-rose-500 font-bold bg-rose-50 px-2 py-0.5 rounded-md" style={{width: 'max-content'}}>
                <Text>❤️ {pet.cuteness} 萌力</Text>
              </View>
            </View>
            
            {/* Action */}
            <View className="w-8 h-8 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center">
              <Text>❤️</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}