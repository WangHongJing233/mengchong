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
    <View className="community-page">
      {/* Header */}
      <View className="community-page__header">
        <View className="community-page__title"><Text>萌宠社区</Text></View>
        <View 
          className="community-page__messages-btn"
          onClick={() => Taro.navigateTo({ url: '/pages/messages/index' })}
        >
          <Text>🔔</Text>
          <View className="community-page__messages-badge"></View>
        </View>
      </View>

      {/* Feed */}
      <ScrollView scrollY className="community-page__feed">
        <View className="community-page__post-list">
          {posts.map((post) => (
            <View key={post.id} className="post-card">
              {/* User Info */}
              <View className="post-card__header">
                <View className="post-card__author">
                  <Image src={post.authorAvatar} className="post-card__avatar" />
                  <View className="post-card__author-info">
                    <View className="post-card__author-name"><Text>{post.author}</Text></View>
                    <View className="post-card__time"><Text>{post.time}</Text></View>
                  </View>
                </View>
                <View className="post-card__more-btn">
                  <Text>•••</Text>
                </View>
              </View>
              
              {/* Content */}
              <View className="post-card__content">
                <Text>{post.content}</Text>
              </View>
              
              {/* Image */}
              <View className="post-card__media">
                <Image src={post.image} className="post-card__image" mode="aspectFill" />
              </View>
              
              {/* Comments Section */}
              {post.comments.length > 0 && (
                <View className="post-card__comments">
                  {post.comments.map(comment => (
                    <View key={comment.id} className="post-card__comment-item">
                      <Text className="post-card__comment-user">{comment.user}: </Text>
                      <Text className="post-card__comment-text">{comment.content}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* Comment Input */}
              {activeCommentPostId === post.id && (
                <View className="post-card__comment-input-wrapper">
                  <Input 
                    value={commentText}
                    onInput={(e) => setCommentText(e.detail.value)}
                    placeholder="说点什么吧..."
                    className="post-card__comment-input"
                    confirmType="send"
                    onConfirm={() => handleAddComment(post.id)}
                  />
                  <View 
                    onClick={() => handleAddComment(post.id)}
                    className="post-card__comment-submit"
                  >
                    发送
                  </View>
                </View>
              )}

              {/* Actions */}
              <View className="post-card__actions">
                <View 
                  className={`post-card__action-btn post-card__action-btn--like ${post.isLiked ? 'is-liked' : ''}`}
                  onClick={() => handleLike(post.id)}
                >
                  <Text className="post-card__action-icon">{post.isLiked ? '❤️' : '🤍'}</Text>
                  <Text className="post-card__action-count">{post.likes}</Text>
                </View>
                <View 
                  className="post-card__action-btn post-card__action-btn--comment"
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                >
                  <Text className="post-card__action-icon">💬</Text>
                  <Text className="post-card__action-count">{post.comments.length}</Text>
                </View>
              </View>

            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* FAB */}
      <View className="community-page__fab">
        <Text className="community-page__fab-icon">+</Text>
      </View>
    </View>
  )
}