import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function Profile() {
  const { user, pets, activePetId, login, logout } = useStore()
  const activePet = pets.find(p => p.id === activePetId)

  if (!user) {
    return (
      <View className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf0] p-6">
        <View className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <Text className="text-4xl">🐾</Text>
        </View>
        <View className="text-2xl font-black text-gray-800 mb-2"><Text>欢迎来到萌宠PK</Text></View>
        <View className="text-gray-500 mb-8 text-center"><Text>记录爱宠点滴，与全城铲屎官一起PK互动</Text></View>
        <View 
          onClick={login}
          className="w-full max-w-xs bg-emerald-500 text-white rounded-full py-3.5 shadow-cute-green flex items-center justify-center gap-2"
        >
          <Text className="font-bold text-lg">微信一键登录</Text>
        </View>
      </View>
    )
  }

  const navigateToHealth = () => {
    Taro.navigateTo({ url: '/pages/health/index' })
  }

  return (
    <View className="min-h-screen pb-20 bg-[#f7f8fa]">
      {/* User Header */}
      <View className="bg-gradient-to-br from-primary-50 to-white pt-16 pb-10 px-6 rounded-b-4xl shadow-soft relative overflow-hidden">
        {/* Floating background elements */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100/50 rounded-full blur-2xl animate-float"></View>
        <View className="absolute top-20 -left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></View>

        <View className="absolute top-12 right-6 text-gray-400 text-xl bg-white/50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-soft shadow-sm z-10">
          <Text>⚙️</Text>
        </View>
        
        <View className="flex flex-row items-center gap-5 relative z-10">
          <View className="relative">
            <Image src={user.avatar} className="w-20 h-20 rounded-full border-4 border-white shadow-cute" />
            <View className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 border-2 border-white rounded-full"></View>
          </View>
          <View>
            <View className="text-2xl font-extrabold text-gray-800"><Text>{user.nickname}</Text></View>
            <View className="text-sm text-primary-600 mt-2 bg-primary-100/80 px-3 py-1 rounded-full inline-block backdrop-blur-soft font-bold">
              <Text>✨ 已在社区活跃 128 天</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pet Profiles */}
      <View className="mt-8 px-4 animate-slide-up">
        <View className="flex flex-row justify-between items-center mb-4 px-2">
          <View className="font-bold text-lg text-gray-800"><Text>我的宠物</Text></View>
          <View className="text-sm text-primary-500 font-bold flex flex-row items-center gap-1 bg-primary-50 px-3 py-1 rounded-full shadow-sm">
            <Text>+ 添加</Text>
          </View>
        </View>
        
        <ScrollView scrollX className="whitespace-nowrap pb-4 px-2" style={{ width: '100%' }}>
          {pets.map(pet => (
            <View 
              key={pet.id} 
              onClick={() => Taro.navigateTo({ url: `/pages/pet-detail/index?id=${pet.id}` })}
              className={`inline-block mr-4 w-[140px] rounded-4xl p-5 transition-all align-top active:scale-95 relative overflow-hidden ${
                pet.id === activePetId 
                  ? 'bg-gradient-to-br from-primary-400 to-primary-500 text-white shadow-cute scale-105 border border-primary-300' 
                  : 'bg-white text-gray-800 shadow-soft border border-gray-50'
              }`}
            >
              {pet.id === activePetId && (
                <View className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full blur-md"></View>
              )}
              <Image src={pet.avatar} className={`w-14 h-14 rounded-full mb-3 object-cover border-2 relative z-10 ${pet.id === activePetId ? 'border-white/30' : 'border-gray-100 shadow-sm'}`} mode="aspectFill" />
              <View className="font-extrabold text-base relative z-10"><Text>{pet.name}</Text></View>
              <View className={`text-xs mt-1 font-medium relative z-10 ${pet.id === activePetId ? 'text-primary-100' : 'text-gray-500'}`}>
                <Text>萌力 {pet.cuteness}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Menus */}
      <View className="mt-6 px-4 flex flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <View className="bg-white rounded-4xl p-2 shadow-soft border border-gray-50">
          <View 
            onClick={navigateToHealth} 
            className="p-4 flex flex-row items-center justify-between active:bg-gray-50 rounded-3xl transition-colors"
          >
            <View className="flex flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl shadow-inner">
                <Text className="animate-bounce-subtle">📈</Text>
              </View>
              <View className="font-bold text-gray-800 text-base"><Text>健康体重追踪</Text></View>
            </View>
            <View className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold"><Text>{'>'}</Text></View>
          </View>
        </View>
        
        <View className="bg-white rounded-4xl p-2 shadow-soft border border-gray-50 mt-4">
          <View 
            onClick={logout}
            className="p-4 flex flex-row items-center justify-between active:bg-gray-50 rounded-3xl transition-colors"
          >
            <View className="flex flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xl shadow-inner">
                <Text>🚪</Text>
              </View>
              <View className="font-bold text-gray-800 text-base"><Text>退出登录</Text></View>
            </View>
            <View className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold"><Text>{'>'}</Text></View>
          </View>
        </View>
      </View>
    </View>
  )
}