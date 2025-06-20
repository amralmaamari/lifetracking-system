'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';

export type TaskFormProps = {
  taskId?: number;
  initialChallengeId?: number;
  initialIsCompleted?: boolean;
  mode: 'create' | 'update';
};

const TaskForm: FC<TaskFormProps> = ({
  initialChallengeId = 0,
  initialIsCompleted = false,
  mode,
  taskId,
}) => {
   const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [challengeId, setChallengeId] = useState<number>(initialChallengeId);
  const [isCompleted, setIsCompleted] = useState<boolean>(initialIsCompleted);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!challengeId || challengeId <= 0) {
      toast.error('❗ يرجى إدخال رقم التحدي.');
      setLoading(false);
      return;
    }

  
    
    try {
      if (mode === 'create') {
        await axios.post(`${apiUrl}/Task`, {challengeId});
      } else if (mode === 'update' && taskId) {
        await axios.put(`${apiUrl}/Task/${taskId}`, {taskId,challengeId, isCompleted,createdAt: new Date(),updatedAt: new Date()});
      }

      toast.success(`✅ تم ${mode === 'create' ? 'إنشاء' : 'تحديث'} المهمة بنجاح`);
      router.push('/task');
    } catch (error) {
      toast.error('❌ فشل إرسال البيانات إلى الخادم.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 max-w-lg mx-auto space-y-6 transition-all"
      dir="rtl"
    >
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          {mode === 'create' ? '➕ إنشاء مهمة جديدة' : `✏️ تعديل المهمة #${taskId}`}
        </h2>
      </div>

      {/* Challenge ID Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          🔗 رقم التحدي <span className="text-red-500">(مطلوب)</span>
        </label>
        <Input
          type="number"
          placeholder="مثلاً: 2"
          value={challengeId}
          min={1}
          onChange={(e) => setChallengeId(parseInt(e.target.value) || 0)}
          className="focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Completed Switch */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">✅ مكتملة؟</label>
        <Switch
          checked={isCompleted}
          onCheckedChange={setIsCompleted}
          className="data-[state=checked]:bg-green-500"
          dir="ltr"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium tracking-wide py-2"
        disabled={loading}
      >
        {loading ? '⏳ جاري الإرسال...' : mode === 'create' ? '📝 إنشاء المهمة' : '💾 تحديث المهمة'}
      </Button>
    </form>
  );
};

export default TaskForm;
