'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export type MeasurementFormProps = {
  measurementId?: number;
  initialTitle?: string;
  mode: 'create' | 'update';
};

const MeasurementForm: FC<MeasurementFormProps> = ({
  measurementId,
  initialTitle = '',
  mode,
}) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [title, setTitle] = useState<string>(initialTitle);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!title.trim()) {
      toast.error('❗ يرجى إدخال عنوان القياس.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'create') {
        await axios.post(`${apiUrl}/Measurement`, { title });
      } else if (mode === 'update' && measurementId) {
        await axios.put(`${apiUrl}/Measurement/${measurementId}`, {
          measurementId,
          title,
          updatedAt: new Date(),
        });
      }

      toast.success(`✅ تم ${mode === 'create' ? 'إنشاء' : 'تحديث'} القياس بنجاح`);
      router.push('/measurement');
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
          {mode === 'create' ? '➕ إنشاء قياس جديد' : `✏️ تعديل القياس #${measurementId}`}
        </h2>
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          🏷️ العنوان <span className="text-red-500">(مطلوب)</span>
        </label>
        <Input
          type="text"
          placeholder="أدخل اسم القياس مثلاً: نسبة مئوية"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium tracking-wide py-2"
        disabled={loading}
      >
        {loading ? '⏳ جاري الإرسال...' : mode === 'create' ? '📝 إنشاء القياس' : '💾 تحديث القياس'}
      </Button>
    </form>
  );
};

export default MeasurementForm;
