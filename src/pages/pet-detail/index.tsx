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
          <View className="bg-white rounded-3xl p-6 shadow-soft mb-6 relative overflow-hidden">
            <View className="absolute -top-10 -right-10 w-32 h-32 bg-primary-50 rounded-full opacity-50"></View>
            
            <View className="flex flex-col items-center">
              <Image 
                src={pet.avatar} 
                className="w-24 h-24 rounded-full border-4 border-primary-100 mb-4 shadow-sm" 
                mode="aspectFill" 
              />
              <View className="text-2xl font-black text-gray-800 mb-1">
                <Text>{pet.name}</Text>
              </View>
              <View className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-bold mb-4">
                <Text>{pet.type === 'dog' ? '🐶 狗狗' : '🐱 猫咪'}</Text>
              </View>
            </View>

            {/* Stats */}
            <View className="flex flex-row justify-around mt-4 pt-6 border-t border-gray-100">
              <View className="flex flex-col items-center">
                <Text className="text-sm text-gray-500 mb-1">总萌力</Text>
                <Text className="text-xl font-bold text-primary-500">{pet.cuteness}</Text>
              </View>
              <View className="flex flex-col items-center">
                <Text className="text-sm text-gray-500 mb-1">颜值分</Text>
                <Text className="text-xl font-bold text-gray-800">{pet.appearanceScore}</Text>
              </View>
              <View className="flex flex-col items-center">
                <Text className="text-sm text-gray-500 mb-1">活跃度</Text>
                <Text className="text-xl font-bold text-gray-800">{pet.activityScore}</Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View className="bg-white rounded-3xl p-6 shadow-soft mb-6">
            <View className="font-bold text-lg text-gray-800 mb-4"><Text>基本信息</Text></View>
            
            <View className="flex flex-col gap-4">
              <View className="flex flex-row justify-between items-center pb-3 border-b border-gray-50">
                <Text className="text-gray-500">品种</Text>
                <Text className="font-medium text-gray-800">{pet.type === 'dog' ? '未知犬种' : '未知猫种'}</Text>
              </View>
              <View className="flex flex-row justify-between items-center pb-3 border-b border-gray-50">
                <Text className="text-gray-500">最新体重</Text>
                <Text className="font-medium text-gray-800">
                  {pet.weightRecords.length > 0 
                    ? `${pet.weightRecords[pet.weightRecords.length - 1].weight} kg` 
                    : '暂无记录'}
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-gray-500">入驻天数</Text>
                <Text className="font-medium text-gray-800">98 天</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View className="flex flex-col gap-3">
            {pet.id !== activePetId && (
              <Button 
                className="w-full bg-orange-100 text-primary-600 rounded-full py-3 font-bold"
                onClick={handleSetActive}
              >
                设为当前活跃宠物
              </Button>
            )}
            <Button 
              className="w-full bg-primary-500 text-white rounded-full py-3 shadow-cute font-bold"
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
