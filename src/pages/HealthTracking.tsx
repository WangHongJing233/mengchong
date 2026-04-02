import { useState } from 'react';
import { useStore } from '@/store';
import { ChevronLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HealthTracking() {
  const navigate = useNavigate();
  const { pets, activePetId, addWeightRecord } = useStore();
  const activePet = pets.find(p => p.id === activePetId);
  const [showForm, setShowForm] = useState(false);
  const [weight, setWeight] = useState('');

  if (!activePet) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;
    
    const today = new Date();
    const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    addWeightRecord(activePet.id, {
      date: dateStr,
      weight: parseFloat(weight)
    });
    
    setWeight('');
    setShowForm(false);
  };

  return (
    <div className="min-h-full bg-[#fffaf0] pb-10">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-800">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 flex-1 text-center pr-8">
          体重追踪
        </h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-3xl p-6 shadow-soft mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <img src={activePet.avatar} className="w-12 h-12 rounded-full" alt="avatar" />
              <div>
                <h2 className="font-bold text-gray-800">{activePet.name} 的体重曲线</h2>
                <p className="text-xs text-gray-500">单位：kg</p>
              </div>
            </div>
            <div className="text-2xl font-black text-primary-500">
              {activePet.weightRecords[activePet.weightRecords.length - 1]?.weight || '--'}
            </div>
          </div>
          
          <div className="h-[250px] w-full mt-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activePet.weightRecords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  domain={['dataMin - 0.5', 'dataMax + 0.5']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#ff8f0a', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#ff8f0a" 
                  strokeWidth={4}
                  dot={{ r: 6, fill: '#fff', stroke: '#ff8f0a', strokeWidth: 3 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full bg-primary-50 text-primary-600 rounded-2xl py-4 font-bold flex items-center justify-center gap-2"
          >
            <Plus size={20} /> 记录今日体重
          </button>
        ) : (
          <form onSubmit={handleAdd} className="bg-white rounded-3xl p-6 shadow-soft animate-fade-in">
            <h3 className="font-bold text-gray-800 mb-4">记录体重 (kg)</h3>
            <input 
              type="number" 
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="请输入体重，如：4.5"
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary-300 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-100 text-gray-600 rounded-xl py-3 font-bold"
              >
                取消
              </button>
              <button 
                type="submit"
                className="flex-1 bg-primary-500 text-white rounded-xl py-3 font-bold"
              >
                保存
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}