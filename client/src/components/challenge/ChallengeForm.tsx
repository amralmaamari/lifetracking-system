'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { Textarea } from '../ui/textarea';

export type ChallengeFormProps = {
  challengeId?: number;
  initialTitle?: string;
  initialDescription?: string;
  initialArticleId?: number;
  initialDurationTimes?: number;
  initialTimesPerDay?: number;
  initialStartDate?: string; // ISO string
  initialEndDate?: string;   // ISO string
  mode: 'create' | 'update';
};

const ChallengeForm: FC<ChallengeFormProps> = ({
  challengeId,
  initialTitle = '',
  initialDescription = '',
  initialArticleId = undefined,
  initialDurationTimes = 1,
  initialTimesPerDay = 1,
  initialStartDate = '',
  initialEndDate = '',
  mode,
}) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [articleId, setArticleId] = useState<number | undefined>(initialArticleId);
  const [durationTimes, setDurationTimes] = useState(initialDurationTimes);
  const [timesPerDay, setTimesPerDay] = useState(initialTimesPerDay);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim()) {
      toast.error('❗ الرجاء إدخال عنوان التحدي.');
      setLoading(false);
      return;
    }

    const payload = {
      title,
      description,
      articleId,
      durationTimes,
      timesPerDay,
      startDate,
      endDate,
      updatedAt: new Date(),
      userId:1
    };

    try {
      if (mode === 'create') {
        await axios.post(`${apiUrl}/Challenge`, payload);
      } else if (mode === 'update' && challengeId) {
        await axios.put(`${apiUrl}/Challenge/${challengeId}`, {
          challengeId,
          ...payload,
        });
      }

      toast.success(`✅ تم ${mode === 'create' ? 'إنشاء' : 'تحديث'} التحدي بنجاح`);
      router.push('/challenge');
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
          {mode === 'create' ? '➕ إنشاء تحدي جديد' : `✏️ تعديل التحدي #${challengeId}`}
        </h2>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">📌 العنوان</label>
        <Input
          type="text"
          placeholder="مثلاً: تحدي القراءة"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">📝 الوصف</label>
        <Textarea
        dir="rtl"
          placeholder="وصف مختصر للتحدي"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         

      </div>

      {/* Article ID */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">📚 رقم المقال (اجباري)</label>
        <Input
          type="number"
          placeholder="مثلاً: 3"
          value={articleId ?? ''}
          onChange={(e) => setArticleId(parseInt(e.target.value) )}
        />
      </div>

      {/* Duration & TimesPerDay */}
      <div className="flex gap-4">
        <div className="w-1/2 space-y-1">
          <label className="text-sm font-medium text-gray-700">⏳ عدد الأيام</label>
          <Input
            type="number"
            value={durationTimes}
            onChange={(e) => setDurationTimes(parseInt(e.target.value) || 1)}
          />
        </div>
        <div className="w-1/2 space-y-1">
          <label className="text-sm font-medium text-gray-700">🔁 مرات في اليوم</label>
          <Input
            type="number"
            value={timesPerDay}
            onChange={(e) => setTimesPerDay(parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      {/* Dates */}
      <div className="flex gap-4">
        <div className="w-1/2 space-y-1">
          <label className="text-sm font-medium text-gray-700">📅 تاريخ البدء</label>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="w-1/2 space-y-1">
          <label className="text-sm font-medium text-gray-700">📆 تاريخ الانتهاء</label>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white"
        disabled={loading}
      >
        {loading ? '⏳ جاري الإرسال...' : mode === 'create' ? '📝 إنشاء التحدي' : '💾 تحديث التحدي'}
      </Button>
    </form>
  );
};

export default ChallengeForm;
