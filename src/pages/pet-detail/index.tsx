import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function PetDetail() {
  const router = useRouter()
  const { id } = router.params
  const { pets, activePetId, setActivePet } = useStore()
  
  // Use passed id or fallback to active pet
  const targetId = id || activePetId
  const pet = pets.find(p => p.id === targetId)

  if (!pet) {
    return (
      <View className="min-h-screen flex items-center justify-center bg-gray-50">
        <Text className="text-gray-500">找不到该宠物信息</Text>
      </View>
    )
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleSetActive = () => {
    setActivePet(pet.id)
    Taro.showToast({ title: '已设为当前活跃', icon: 'success' })
  }

  return (
    <View className="min-h-screen bg-[#fffaf0] pb-20 pet-detail-page">
      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex flex-row items-center">
        <View onClick={handleBack} className="p-2 -ml-2 text-gray-800">
          <Text>⬅️</Text>
        </View>
        <View className="text-lg font-bold text-gray-800 flex-1 text-center pr-8">
          <Text>宠物档案</Text>
        </View>
      </View>

      <ScrollView scrollY className="h-full">
        <View className="p-6">
          {/* Main Card */}
          <View className="bg-gradient-to-br from-white to-primary-50 rounded-4xl p-6 shadow-cute-orange mb-6 relative overflow-hidden animate-slide-up border border-primary-100/50">
            <View className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-2xl opacity-60 animate-float"></View>
            <View className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-100 rounded-full blur-2xl opacity-60 animate-float" style={{ animationDelay: '1s' }}></View>
            
            <View className="flex flex-col items-center relative z-10">
              <View className="relative">
                <Image 
                  src={pet.avatar} 
                  className="w-28 h-28 rounded-full border-4 border-white mb-4 shadow-cute" 
                  mode="aspectFill" 
                />
                <View className="absolute bottom-4 right-0 bg-white rounded-full p-1 shadow-sm">
                  <Text className="text-xl">{pet.type === 'dog' ? '🐶' : '🐱'}</Text>
                </View>
              </View>
              <View className="text-3xl font-black text-gray-800 mb-2">
                <Text>{pet.name}</Text>
              </View>
              <View className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                <Text>✨ 萌宠之星</Text>
              </View>
            </View>

            {/* Stats */}
            <View className="flex flex-row justify-around mt-6 pt-6 border-t border-primary-100/50 relative z-10">
              <View className="flex flex-col items-center bg-white/60 backdrop-blur-soft px-4 py-2 rounded-2xl">
                <Text className="text-sm text-gray-500 mb-1">总萌力</Text>
                <Text className="text-2xl font-black text-primary-500 animate-heartbeat inline-block">{pet.cuteness}</Text>
              </View>
              <View className="flex flex-col items-center bg-white/60 backdrop-blur-soft px-4 py-2 rounded-2xl">
                <Text className="text-sm text-gray-500 mb-1">颜值分</Text>
                <Text className="text-2xl font-black text-gray-800">{pet.appearanceScore}</Text>
              </View>
              <View className="flex flex-col items-center bg-white/60 backdrop-blur-soft px-4 py-2 rounded-2xl">
                <Text className="text-sm text-gray-500 mb-1">活跃度</Text>
                <Text className="text-2xl font-black text-gray-800">{pet.activityScore}</Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View className="bg-white rounded-4xl p-6 shadow-soft mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <View className="font-bold text-xl text-gray-800 mb-5 flex items-center gap-2">
              <Text className="text-primary-500">📋</Text>
              <Text>基本信息</Text>
            </View>
            
            <View className="flex flex-col gap-4">
              <View className="flex flex-row justify-between items-center pb-4 border-b border-gray-50">
                <Text className="text-gray-500">品种</Text>
                <Text className="font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-full">{pet.type === 'dog' ? '未知犬种' : '未知猫种'}</Text>
              </View>
              <View className="flex flex-row justify-between items-center pb-4 border-b border-gray-50">
                <Text className="text-gray-500">最新体重</Text>
                <Text className="font-bold text-gray-800 bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  {pet.weightRecords.length > 0 
                    ? `${pet.weightRecords[pet.weightRecords.length - 1].weight} kg` 
                    : '暂无记录'}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-gray-500">入驻天数</Text>
                <Text className="font-bold text-gray-800 bg-green-50 text-green-600 px-3 py-1 rounded-full">98 天</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View className="flex flex-col gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {pet.id !== activePetId && (
              <Button 
                className="w-full bg-primary-50 text-primary-600 rounded-full py-3.5 font-bold shadow-sm border border-primary-100"
                onClick={handleSetActive}
              >
                设为当前活跃宠物
              </Button>
            )}
            <Button 
              className="w-full bg-gradient-to-r from-primary-400 to-primary-500 text-white rounded-full py-3.5 shadow-cute font-bold text-lg"
              onClick={() => {
                Taro.showToast({ title: '已分享给好友', icon: 'success' })
              }}
            >
              分享档案
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
