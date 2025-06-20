// app/components/TaskSummaryCard.tsx
'use client';

import { useRouter } from 'next/navigation';

type TaskSummaryProps = {
  total: number; // total tasks of today
  completed: number;
};

export default function TaskSummaryCard({ total, completed }: TaskSummaryProps) {
  const router = useRouter();

  const incomplete = total - completed;

  const goTo = (filter: string) => {
    router.push(`/tasks?filter=${filter}`);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-full max-w-md" dir="rtl">
      <h2 className="text-xl font-bold mb-4">📋 ملخص مهام اليوم</h2>

      <div className="flex justify-between text-base mb-2">
        <span>عدد المهام اليوم:</span>
        <button onClick={() => goTo('today-total')} className="text-blue-600 underline cursor-pointer">
          {total}
        </button>
      </div>

      <div className="flex justify-between text-base mb-2">
        <span>المهام المنجزة اليوم:</span>
        <button onClick={() => goTo('today-completed')} className="text-green-600 underline cursor-pointer">
          {completed}
        </button>
      </div>

      <div className="flex justify-between text-base">
        <span>المهام المتبقية اليوم:</span>
        <button onClick={() => goTo('today-incomplete')} className="text-red-600 underline cursor-pointer">
          {incomplete}
        </button>
      </div>
    </div>
  );
}
