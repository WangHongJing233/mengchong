## 1. 架构设计
```mermaid
graph TD
    subgraph "前端层 (Taro + React + Tailwind CSS)"
        A["UI组件库 (Taro UI)"]
        B["页面路由"]
        C["状态管理 (Zustand)"]
        D["Mock数据服务"]
    end
    subgraph "微信底层"
        E["微信登录/授权API"]
        F["本地存储"]
    end
    A --> B
    B --> C
    C --> D
    B --> E
    C --> F
```

## 2. 技术栈说明
- **前端框架**：Taro@3 + React@18 (跨端框架，编译到微信小程序)
- **UI 组件库**：Taro UI 
- **样式方案**：CSS Modules / Tailwind CSS (通过 weapp-tailwindcss)
- **图表库**：Echarts-for-weixin (用于体重折线图)
- **状态管理**：Zustand
- **数据来源**：全部使用前端 Mock 数据（Promise模拟异步请求）

## 3. 路由定义
| 路由路径 | 用途 |
|----------|------|
| `/pages/index/index` | 首页（包含PK功能、日常打卡互动） |
| `/pages/rank/index` | 排行榜页（全国/城市榜） |
| `/pages/community/index` | 社区交流页（动态列表） |
| `/pages/health/index` | 宠物健康追踪页（体重图表） |
| `/pages/user/index` | 我的主页（登录、宠物档案展示） |

## 4. API 定义 (Mock接口预留)
```typescript
// 统一响应格式
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

// 1. 获取宠物信息
interface GetPetsResponse {
  id: string;
  name: string;
  avatar: string;
  breed: string;
  cuteness: number; // 萌力值
}

// 2. 发起PK
interface PKRequest {
  myPetId: string;
}
interface PKResponse {
  winnerId: string;
  scoreDetails: {
    appearance: number; // AI颜值分数 (40%)
    cuteness: number;   // 萌力值 (40%)
    activity: number;   // 社区活跃度 (20%)
  };
  rewardCuteness: number;
}

// 3. 健康数据录入与查询
interface HealthRecord {
  date: string;
  weight: number;
}
```

## 5. 服务端架构图
*本项目目前为纯前端Mock开发，暂无实际服务端交互，预留标准RESTful请求封装层。*

## 6. 数据模型
### 6.1 数据模型定义
```mermaid
erDiagram
    USER {
        string id PK
        string openid "微信OpenID"
        string nickname "昵称"
        string avatar "头像"
    }
    PET {
        string id PK
        string userId FK
        string name "宠物名"
        string type "类型(猫/狗)"
        number cuteness "萌力值"
        number appearanceScore "AI颜值"
        number activityScore "活跃度"
    }
    HEALTH_RECORD {
        string id PK
        string petId FK
        date recordDate "记录日期"
        number weight "体重(kg)"
    }
    POST {
        string id PK
        string userId FK
        string content "内容"
        string imageUrl "图片链接"
        number likes "点赞数"
    }
    
    USER ||--o{ PET : "owns"
    USER ||--o{ POST : "publishes"
    PET ||--o{ HEALTH_RECORD : "has"
```