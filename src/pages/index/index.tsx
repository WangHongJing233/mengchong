import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import { useStore } from '../../store'
import './index.scss'

export default function Index() {
  const { pets, activePetId, checkIn, playWithPet } = useStore()
  const activePet = pets.find(p => p.id === activePetId)
  const [showPK, setShowPK] = useState(false)
  const [pkResult, setPkResult] = useState<any>(null)
  const [showReward, setShowReward] = useState(false)

  if (!activePet) return <View className="p-4 text-center">请先添加宠物</View>

  const handlePK = () => {
    setShowPK(true)
    setTimeout(() => {
      const isWin = Math.random() > 0.5
      setPkResult({ isWin, reward: isWin ? 50 : 10 })
    }, 2000)
  }

  const closePK = () => {
    setShowPK(false)
    setPkResult(null)
  }

  const handleInteraction = (action: 'checkIn' | 'play') => {
    if (action === 'checkIn') checkIn()
    else playWithPet()
    
    setShowReward(true)
    setTimeout(() => setShowReward(false), 1500)
  }

  return (
    <View className="min-h-screen pb-20 relative bg-[#f7f8fa] overflow-hidden">
      {/* Global Glowing Background Elements */}
      <View className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary-50 to-transparent pointer-events-none"></View>
      <View className="absolute top-[-10%] left-[-20%] w-[140%] h-[500px] bg-gradient-radial from-primary-100/60 to-transparent opacity-80 pointer-events-none blur-3xl"></View>
      <View className="absolute top-[20%] right-[-30%] w-[300px] h-[300px] bg-gradient-radial from-blue-200/40 to-transparent opacity-60 pointer-events-none blur-3xl"></View>

      {/* Header Stats */}
      <View className="px-6 pt-12 pb-6 flex justify-between items-center relative z-10 bg-white/70 backdrop-blur-lg shadow-sm rounded-b-[2rem] border-b border-white/50">
        <View>
          <View className="text-2xl font-extrabold text-gray-800 flex items-center gap-2">
            <Text>{activePet.name}</Text>
            <View className="bg-primary-100 text-primary-600 text-xs px-2.5 py-1 rounded-full font-bold">
              <Text>Lv. 5</Text>
            </View>
          </View>
          <View className="text-sm text-gray-500 mt-1 font-medium"><Text>今天也要开心哦喵~</Text></View>
        </View>
        <View className="flex gap-3">
          <View className="bg-orange-50 rounded-2xl p-2 shadow-sm flex flex-col items-center min-w-[60px] border border-orange-100">
            <Text className="text-xs font-bold text-primary-600 mt-1">萌力 {activePet.cuteness}</Text>
          </View>
          <View className="bg-blue-50 rounded-2xl p-2 shadow-sm flex flex-col items-center min-w-[60px] border border-blue-100">
            <Text className="text-xs font-bold text-blue-600 mt-1">颜值 {activePet.appearanceScore}</Text>
          </View>
        </View>
      </View>

      {/* Pet Display Area */}
      <View className="relative w-full h-[380px] flex items-center justify-center mt-6">
        {/* Background glow behind pet */}
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full blur-[40px] opacity-60 animate-pulse"></View>
        <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-200 rounded-full blur-[30px] opacity-50"></View>
        
        {/* Glowing Base Stage */}
        <View className="absolute bottom-[50px] left-1/2 -translate-x-1/2 w-[240px] h-[50px] bg-gradient-to-b from-primary-200/50 to-transparent rounded-[100%] blur-[10px]"></View>
        <View className="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[180px] h-[30px] bg-primary-300/60 rounded-[100%] blur-[6px] animate-pulse"></View>
        <View className="absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[120px] h-[15px] bg-white/80 rounded-[100%] blur-[3px]"></View>

        <View className="relative z-10 animate-bounce-subtle">
          <View className="w-60 h-60 rounded-full p-2 bg-white shadow-cute relative">
            <View className="w-full h-full rounded-full overflow-hidden border-4 border-gray-50">
              <Image 
                src={activePet.avatar} 
                className="w-full h-full object-cover"
                mode="aspectFill"
              />
            </View>
            
            {showReward && (
              <View className="absolute -top-4 right-0 bg-white px-3 py-1.5 rounded-full shadow-lg font-bold text-rose-500 flex items-center gap-1 animate-bounce-subtle">
                <Text>+10 萌力</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-6 -mt-4 relative z-20">
        <View className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-soft border border-white/60 flex justify-around">
          <View 
            onClick={() => handleInteraction('checkIn')}
            className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
          >
            <View className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-blue-100 to-blue-50 text-blue-500 flex items-center justify-center shadow-[4px_4px_10px_rgba(59,130,246,0.15),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-white text-2xl">
              🐾
            </View>
            <Text className="text-sm font-bold text-gray-700">日常打卡</Text>
          </View>
          <View 
            onClick={() => handleInteraction('play')}
            className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
          >
            <View className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-500 flex items-center justify-center shadow-[4px_4px_10px_rgba(16,185,129,0.15),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-white text-2xl">
              🎾
            </View>
            <Text className="text-sm font-bold text-gray-700">互动玩耍</Text>
          </View>
          <View 
            onClick={handlePK}
            className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
          >
            <View className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-rose-100 to-rose-50 text-rose-500 flex items-center justify-center shadow-[4px_4px_10px_rgba(244,63,94,0.15),-4px_-4px_10px_rgba(255,255,255,0.9)] border border-white text-2xl">
              ⚔️
            </View>
            <Text className="text-sm font-bold text-gray-700">匹配PK</Text>
          </View>
        </View>
      </View>

      {/* Big PK Button */}
      <View className="px-6 mt-8">
        <View 
          onClick={handlePK}
          className="w-full bg-gradient-to-r from-primary-400 to-primary-600 text-white rounded-full py-4.5 font-black text-lg shadow-cute flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Text>✨ 开启萌宠对决 ✨</Text>
        </View>
      </View>

      {/* PK Modal */}
      {showPK && (
        <View className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
          <View className="bg-white w-full max-w-sm rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {!pkResult ? (
              <View className="text-center py-10">
                <View className="w-24 h-24 mx-auto border-4 border-primary-100 rounded-full border-t-primary-500 animate-spin mb-6"></View>
                <View className="text-xl font-bold text-gray-800"><Text>正在匹配对手...</Text></View>
                <View className="text-gray-500 mt-2 text-sm"><Text>综合颜值、萌力值与活跃度评估中</Text></View>
              </View>
            ) : (
              <View className="text-center py-6">
                <View className="text-6xl mb-4"><Text>{pkResult.isWin ? '🏆' : '🫂'}</Text></View>
                <View className={`text-2xl font-black mb-2 ${pkResult.isWin ? 'text-primary-600' : 'text-gray-600'}`}>
                  <Text>{pkResult.isWin ? 'PK 胜利！' : '再接再厉！'}</Text>
                </View>
                <View className="text-gray-600 mb-8 font-medium">
                  <Text>{pkResult.isWin ? '你的宝贝太迷人了，对手甘拜下风' : '对方也是个小可爱呢，差一点点就赢了'}</Text>
                </View>
                
                <View className="bg-primary-50 rounded-2xl p-4 mb-8">
                  <View className="text-sm text-primary-800 font-bold mb-1"><Text>获得萌力值奖励</Text></View>
                  <View className="text-3xl font-black text-primary-500 flex items-center justify-center gap-1">
                    <Text>+{pkResult.reward}</Text>
                  </View>
                </View>

                <View 
                  onClick={closePK}
                  className="w-full bg-gray-900 text-white rounded-2xl py-3.5 font-bold shadow-md active:scale-95 transition-transform flex items-center justify-center"
                >
                  <Text>开心收下</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}