import { useStore } from '@/store';
import { Settings, ChevronRight, Activity, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user, pets, activePetId, login, logout } = useStore();
  const activePet = pets.find(p => p.id === activePetId);

  if (!user) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center bg-[#fffaf0] p-6">
        <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mb-6 text-4xl">
          🐾
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">欢迎来到萌宠PK</h2>
        <p className="text-gray-500 mb-8 text-center">记录爱宠点滴，与全城铲屎官一起PK互动</p>
        <button 
          onClick={login}
          className="w-full max-w-xs bg-emerald-500 text-white rounded-full py-3.5 font-bold text-lg shadow-cute-green flex items-center justify-center gap-2"
        >
          微信一键登录
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-20 bg-gray-50">
      {/* User Header */}
      <div className="bg-white pt-16 pb-8 px-6 rounded-b-4xl shadow-soft relative">
        <button className="absolute top-12 right-6 text-gray-400">
          <Settings size={24} />
        </button>
        
        <div className="flex items-center gap-4">
          <img src={user.avatar} alt="user" className="w-16 h-16 rounded-full border-2 border-primary-100" />
          <div>
            <h1 className="text-xl font-black text-gray-800">{user.nickname}</h1>
            <p className="text-sm text-gray-500 mt-1">已在社区活跃 128 天</p>
          </div>
        </div>
      </div>

      {/* Pet Profiles */}
      <div className="mt-6 px-4">
        <div className="flex justify-between items-center mb-3 px-2">
          <h2 className="font-bold text-gray-800">我的宠物</h2>
          <button className="text-sm text-primary-500 font-bold flex items-center gap-1">
            <Plus size={16} /> 添加
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
          {pets.map(pet => (
            <div 
              key={pet.id} 
              className={`min-w-[140px] rounded-3xl p-4 transition-all ${
                pet.id === activePetId 
                  ? 'bg-primary-500 text-white shadow-cute scale-105' 
                  : 'bg-white text-gray-800 shadow-soft'
              }`}
            >
              <img src={pet.avatar} alt={pet.name} className="w-12 h-12 rounded-full mb-3 object-cover border-2 border-white/20" />
              <div className="font-bold">{pet.name}</div>
              <div className={`text-xs mt-1 ${pet.id === activePetId ? 'text-primary-100' : 'text-gray-500'}`}>
                萌力 {pet.cuteness}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Menus */}
      <div className="mt-4 px-4 flex flex-col gap-3">
        <Link 
          to="/health" 
          className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-soft active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <Activity size={20} />
            </div>
            <div className="font-bold text-gray-800">健康体重追踪</div>
          </div>
          <ChevronRight className="text-gray-300" />
        </Link>
        
        <button 
          onClick={logout}
          className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-soft active:scale-95 transition-transform mt-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <div className="font-bold text-gray-800">退出登录</div>
          </div>
        </button>
      </div>
    </div>
  );
}