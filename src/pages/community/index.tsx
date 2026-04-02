import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import './index.scss'

interface Comment {
  id: number;
  user: string;
  content: string;
}

interface Post {
  id: number;
  author: string;
  authorAvatar: string;
  image: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  time: string;
}

const initialMockPosts: Post[] = [
  {
    id: 1,
    author: '布丁的铲屎官',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
    content: '今天去公园玩啦，开心！大家看看我的小可爱是不是又长胖了点~ 🐶',
    likes: 128,
    isLiked: false,
    comments: [
      { id: 101, user: '喵星人', content: '太可爱了吧！' },
      { id: 102, user: '铲屎官小李', content: '这是什么品种呀？' }
    ],
    time: '2小时前'
  },
  {
    id: 2,
    author: '喵星人观测站',
    authorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    content: '新买的猫爬架到了，主子好像很满意的样子，一天都没下来过 🐱',
    likes: 356,
    isLiked: true,
    comments: [
      { id: 201, user: '吸猫狂魔', content: '求链接！' }
    ],
    time: '5小时前'
  },
  {
    id: 3,
    author: '柯基俱乐部',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
    content: '短腿的悲哀就是...够不到桌子上的零食 😭',
    likes: 89,
    isLiked: false,
    comments: [],
    time: '昨天'
  },
  {
    id: 4,
    author: '大橘为重',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400',
    content: '橘猫的日常：除了吃就是睡 💤',
    likes: 210,
    isLiked: false,
    comments: [
      { id: 401, user: '猫奴', content: '十个橘猫九个胖！' }
    ],
    time: '昨天'
  }
]

export default function Community() {
  const [posts, setPosts] = useState<Post[]>(initialMockPosts)
  const [activeCommentPostId, setActiveCommentPostId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState('')

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { id: Date.now(), user: '我', content: commentText.trim() }
          ]
        }
      }
      return post
    }))
    setCommentText('')
    setActiveCommentPostId(null)
    
    Taro.showToast({
      title: '评论成功',
      icon: 'success',
      duration: 1500
    })
  }

  return (
    <View className="min-h-screen pb-20 bg-[#f7f8fa] relative">
      {/* Header */}
      <View className="bg-white px-6 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <View className="text-2xl font-black text-gray-800"><Text>萌宠社区</Text></View>
      </View>

      {/* Feed */}
      <ScrollView scrollY className="p-4 h-full">
        <View className="flex flex-col gap-6">
          {posts.map((post) => (
            <View key={post.id} className="bg-white rounded-[2rem] overflow-hidden shadow-soft border border-gray-50">
              {/* User Info */}
              <View className="p-5 flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-4">
                  <Image src={post.authorAvatar} className="w-12 h-12 rounded-full border border-gray-100" />
                  <View>
                    <View className="font-extrabold text-base text-gray-800"><Text>{post.author}</Text></View>
                    <View className="text-xs text-gray-400 mt-0.5"><Text>{post.time}</Text></View>
                  </View>
                </View>
                <View className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <Text>•••</Text>
                </View>
              </View>
              
              {/* Content */}
              <View className="px-5 pb-4 text-[15px] text-gray-700 leading-relaxed font-medium">
                <Text>{post.content}</Text>
              </View>
              
              {/* Image */}
              <View className="w-full aspect-square bg-gray-50">
                <Image src={post.image} className="w-full h-full object-cover" mode="aspectFill" />
              </View>
              
              {/* Actions */}
              <View className="p-5 flex flex-row items-center gap-8 border-b border-gray-50">
                <View 
                  className={`flex flex-row items-center gap-2 transition-colors active:scale-90 ${post.isLiked ? 'text-rose-500' : 'text-gray-500'}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Text className="text-xl">{post.isLiked ? '❤️' : '🤍'}</Text>
                  <Text className="text-sm font-bold">{post.likes}</Text>
                </View>
                <View 
                  className="flex flex-row items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors active:scale-90"
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                >
                  <Text className="text-xl">💬</Text>
                  <Text className="text-sm font-bold">{post.comments.length}</Text>
                </View>
              </View>

              {/* Comments Section */}
              {post.comments.length > 0 && (
                <View className="px-5 py-4 bg-gray-50/50">
                  {post.comments.map(comment => (
                    <View key={comment.id} className="mb-2 last:mb-0 flex flex-row items-start gap-2">
                      <Text className="font-extrabold text-gray-800 text-[14px] shrink-0">{comment.user}: </Text>
                      <Text className="text-gray-600 text-[14px] leading-snug">{comment.content}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Comment Input */}
              {activeCommentPostId === post.id && (
                <View className="p-4 flex flex-row items-center gap-3 bg-white border-t border-gray-100">
                  <Input 
                    value={commentText}
                    onInput={(e) => setCommentText(e.detail.value)}
                    placeholder="说点什么吧..."
                    className="flex-1 bg-gray-50 px-5 py-3 rounded-full text-sm font-medium text-gray-700"
                    confirmType="send"
                    onConfirm={() => handleAddComment(post.id)}
                  />
                  <View 
                    onClick={() => handleAddComment(post.id)}
                    className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-cute active:scale-95 transition-transform"
                  >
                    发送
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* FAB */}
      <View className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-primary-400 to-primary-600 text-white rounded-full shadow-cute flex items-center justify-center active:scale-95 transition-transform z-50">
        <Text className="text-3xl font-light pb-1">+</Text>
      </View>
    </View>
  )
}