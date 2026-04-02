import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const mockPosts = [
  {
    id: 1,
    author: '布丁的铲屎官',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    content: '今天去公园玩啦，开心！大家看看我的小可爱是不是又长胖了点~ 🐶',
    likes: 128,
    comments: 24,
    time: '2小时前'
  },
  {
    id: 2,
    author: '喵星人观测站',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    content: '新买的猫爬架到了，主子好像很满意的样子，一天都没下来过 🐱',
    likes: 356,
    comments: 42,
    time: '5小时前'
  },
  {
    id: 3,
    author: '柯基俱乐部',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
    content: '短腿的悲哀就是...够不到桌子上的零食 😭',
    likes: 89,
    comments: 12,
    time: '昨天'
  }
]

export default function Community() {
  return (
    <View className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <View className="text-2xl font-black text-gray-800"><Text>萌宠社区</Text></View>
      </View>

      {/* Feed */}
      <View className="p-4 flex flex-col gap-4">
        {mockPosts.map((post) => (
          <View key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-soft">
            <View className="p-4 flex flex-row items-center gap-3">
              <Image src={post.authorAvatar} className="w-10 h-10 rounded-full" />
              <View>
                <View className="font-bold text-sm text-gray-800"><Text>{post.author}</Text></View>
                <View className="text-xs text-gray-400"><Text>{post.time}</Text></View>
              </View>
            </View>
            
            <View className="px-4 pb-3 text-sm text-gray-700 leading-relaxed">
              <Text>{post.content}</Text>
            </View>
            
            <View className="w-full aspect-square bg-gray-100">
              <Image src={post.image} className="w-full h-full object-cover" mode="aspectFill" />
            </View>
            
            <View className="p-4 flex flex-row items-center gap-6">
              <View className="flex flex-row items-center gap-1.5 text-gray-500 hover:text-rose-500 transition-colors">
                <Text>❤️</Text>
                <Text className="text-sm font-medium">{post.likes}</Text>
              </View>
              <View className="flex flex-row items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                <Text>💬</Text>
                <Text className="text-sm font-medium">{post.comments}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      
      {/* FAB */}
      <View className="fixed bottom-24 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-cute flex items-center justify-center active:scale-95 transition-transform z-50">
        <Text className="text-3xl font-light pb-1">+</Text>
      </View>
    </View>
  )
}