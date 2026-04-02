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
    <View className="rank">
      {/* Header */}
      <View className="rank__header">
        <View className="rank__bg-blob rank__bg-blob--top-right"></View>
        <View className="rank__bg-blob rank__bg-blob--bottom-left"></View>
        
        <View className="rank__title">
          <Text>🏆 萌力排行榜</Text>
        </View>
        
        {/* Tabs */}
        <View className="rank__tabs">
          <View 
            className={`rank__tab ${tab === 'national' ? 'rank__tab--active' : ''}`}
            onClick={() => setTab('national')}
          >
            <Text>全国榜单</Text>
          </View>
          <View 
            className={`rank__tab ${tab === 'city' ? 'rank__tab--active' : ''}`}
            onClick={() => setTab('city')}
          >
            <Text>📍 同城榜单</Text>
          </View>
        </View>
      </View>

      {/* List */}
      <View className="rank__list">
        {mockLeaderboard.map((pet, index) => (
          <View 
            key={pet.id} 
            className="rank__item"
          >
            {/* Rank */}
            <View className="rank__item-rank">
              {index === 0 && <Text className="rank__item-medal">🥇</Text>}
              {index === 1 && <Text className="rank__item-medal">🥈</Text>}
              {index === 2 && <Text className="rank__item-medal">🥉</Text>}
              {index > 2 && <Text className="rank__item-number">{index + 1}</Text>}
            </View>
            
            {/* Avatar */}
            <Image 
              src={pet.avatar} 
              className="rank__item-avatar"
            />
            
            {/* Info */}
            <View className="rank__item-info">
              <View className="rank__item-name"><Text>{pet.name}</Text></View>
              <View className="rank__item-cuteness">
                <Text>❤️ {pet.cuteness} 萌力</Text>
              </View>
            </View>
            
            {/* Action */}
            <View className="rank__item-action">
              <Text>❤️</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
