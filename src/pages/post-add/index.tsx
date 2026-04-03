import { View, Text, Textarea, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function PostAdd() {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<string[]>([])

  const handleChooseImage = () => {
    if (images.length >= 9) {
      Taro.showToast({ title: '最多上传9张图片', icon: 'none' })
      return
    }
    
    // 模拟选择图片
    Taro.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setImages([...images, ...res.tempFilePaths])
      }
    }).catch(() => {
      // H5 或不支持环境下的降级模拟
      setImages([...images, 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400'])
    })
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handlePublish = () => {
    if (!content.trim() && images.length === 0) {
      Taro.showToast({ title: '请填写内容或上传图片', icon: 'none' })
      return
    }

    Taro.showLoading({ title: '正在发布...' })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({ title: '发布成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    }, 1200)
  }

  return (
    <View className="post-add-page">
      <View className="post-add-page__editor">
        <Textarea 
          className="post-add-page__textarea"
          placeholder="分享今天主子的萌态吧..."
          placeholderClass="post-add-page__placeholder"
          value={content}
          onInput={(e) => setContent(e.detail.value)}
          maxlength={500}
          autoFocus
        />
        <View className="post-add-page__word-count">
          {content.length}/500
        </View>
      </View>

      <View className="post-add-page__media">
        {images.map((img, index) => (
          <View key={index} className="post-add-page__image-wrapper">
            <Image src={img} className="post-add-page__image" mode="aspectFill" />
            <View 
              className="post-add-page__remove-btn"
              onClick={() => handleRemoveImage(index)}
            >
              <Text>×</Text>
            </View>
          </View>
        ))}
        
        {images.length < 9 && (
          <View className="post-add-page__upload-btn" onClick={handleChooseImage}>
            <Text className="post-add-page__upload-icon">📷</Text>
            <Text className="post-add-page__upload-text">添加图片</Text>
          </View>
        )}
      </View>

      <View className="post-add-page__footer">
        <View className="post-add-page__publish-btn" onClick={handlePublish}>
          <Text>发布</Text>
        </View>
      </View>
    </View>
  )
}