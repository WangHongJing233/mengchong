import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.scss'

export default function Messages() {
  // 模拟消息数据
  const mockMessages = [
    {
      id: 1,
      type: 'like',
      user: '喵星人观测站',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100',
      content: '赞了你的帖子',
      time: '10分钟前',
      postImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100',
      isRead: false
    },
    {
      id: 2,
      type: 'comment',
      user: '柯基俱乐部',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      content: '评论了你: 这也太可爱了吧，求链接！',
      time: '1小时前',
      postImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100',
      isRead: false
    },
    {
      id: 3,
      type: 'system',
      user: '系统通知',
      avatar: '',
      content: '恭喜！你的宠物“布丁”成功登上了本周萌力榜 Top 3！快去看看吧。',
      time: '昨天',
      postImage: '',
      isRead: true
    }
  ]

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="messages-page">
      {/* Header */}
      <View className="messages-page__header">
        <View onClick={handleBack} className="messages-page__back-btn">
          <Text>⬅️</Text>
        </View>
        <View className="messages-page__title">
          <Text>消息通知</Text>
        </View>
      </View>

      <ScrollView scrollY className="messages-page__scroll">
        <View className="messages-page__list">
          {mockMessages.map(msg => (
            <View key={msg.id} className={`message-item ${!msg.isRead ? 'message-item--unread' : ''}`}>
              <View className="message-item__avatar-wrapper">
                {msg.type === 'system' ? (
                  <View className="message-item__avatar-system">
                    <Text>🔔</Text>
                  </View>
                ) : (
                  <Image src={msg.avatar} className="message-item__avatar" mode="aspectFill" />
                )}
              </View>
              
              <View className="message-item__content">
                <View className="message-item__user-info">
                  <Text className="message-item__name">{msg.user}</Text>
                  <Text className="message-item__time">{msg.time}</Text>
                </View>
                <View className="message-item__text">
                  <Text>{msg.content}</Text>
                </View>
              </View>

              {msg.postImage && (
                <Image src={msg.postImage} className="message-item__post-cover" mode="aspectFill" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}