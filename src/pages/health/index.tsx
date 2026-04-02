import { View, Text, Image, Input, Button, Form } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function HealthTracking() {
  const { pets, activePetId, addWeightRecord } = useStore()
  const activePet = pets.find(p => p.id === activePetId)
  const [showForm, setShowForm] = useState(false)
  const [weight, setWeight] = useState('')

  if (!activePet) return null

  const handleAdd = (e: any) => {
    e.preventDefault()
    if (!weight) return
    
    const today = new Date()
    const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    addWeightRecord(activePet.id, {
      date: dateStr,
      weight: parseFloat(weight)
    })
    
    setWeight('')
    setShowForm(false)
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="min-h-screen bg-[#fffaf0] pb-10">
      {/* Header */}
      <View className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex flex-row items-center">
        <View onClick={handleBack} className="p-2 -ml-2 text-gray-800">
          <Text>⬅️</Text>
        </View>
        <View className="text-lg font-bold text-gray-800 flex-1 text-center pr-8">
          <Text>体重追踪</Text>
        </View>
      </View>

      <View className="p-6">
        <View className="bg-white rounded-3xl p-6 shadow-soft mb-6">
          <View className="flex flex-row items-center justify-between mb-6">
            <View className="flex flex-row items-center gap-3">
              <Image src={activePet.avatar} className="w-12 h-12 rounded-full" mode="aspectFill" />
              <View>
                <View className="font-bold text-gray-800"><Text>{activePet.name} 的体重曲线</Text></View>
                <View className="text-xs text-gray-500"><Text>单位：kg</Text></View>
              </View>
            </View>
            <View className="text-2xl font-black text-primary-500">
              <Text>{(activePet.weightRecords.length > 0 && activePet.weightRecords[activePet.weightRecords.length - 1].weight) ? activePet.weightRecords[activePet.weightRecords.length - 1].weight : '--'}</Text>
            </View>
          </View>
          
          <View className="w-full mt-4 bg-orange-50 rounded-2xl p-4 flex flex-col gap-2">
            {activePet.weightRecords.length > 0 ? (
              activePet.weightRecords.slice(-5).map((record: any, index: number) => (
                <View key={index} className="flex flex-row justify-between items-center py-2 border-b border-orange-100 last:border-0">
                  <Text className="text-gray-500">{record.date}</Text>
                  <Text className="font-bold text-primary-600">{record.weight} kg</Text>
                </View>
              ))
            ) : (
              <View className="text-center py-6 text-gray-400">
                <Text>暂无体重记录，快来添加吧~</Text>
              </View>
            )}
          </View>
        </View>

        {!showForm ? (
          <View 
            onClick={() => setShowForm(true)}
            className="w-full bg-primary-50 text-primary-600 rounded-2xl py-4 font-bold flex flex-row items-center justify-center gap-2"
          >
            <Text>+ 记录今日体重</Text>
          </View>
        ) : (
          <Form onSubmit={handleAdd} className="bg-white rounded-3xl p-6 shadow-soft">
            <View className="font-bold text-gray-800 mb-4"><Text>记录体重 (kg)</Text></View>
            <Input 
              type="digit" 
              value={weight}
              onInput={(e) => setWeight(e.detail.value)}
              placeholder="请输入体重，如：4.5"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-4"
              autoFocus
            />
            <View className="flex flex-row gap-3">
              <Button 
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-100 text-gray-600 rounded-xl py-3 font-bold text-center m-0"
              >
                <Text>取消</Text>
              </Button>
              <Button 
                formType="submit"
                className="flex-1 bg-primary-500 text-white rounded-xl py-3 font-bold text-center m-0"
              >
                <Text>保存</Text>
              </Button>
            </View>
          </Form>
        )}
      </View>
    </View>
  )
}