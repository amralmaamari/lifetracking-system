'use client';

import { FC } from 'react';
import { CheckCircle, XCircle, Clock, RefreshCcw, Link2 } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { DeleteDialog } from '../dialog/DeleteDialog';
import axios from 'axios';
import toast from 'react-hot-toast';

export type TaskCardProps = {
  taskId: number;
  challengeId?: number;
  isCompleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const ShowTaskCard: FC<TaskCardProps> = ({
  taskId,
  challengeId,
  isCompleted,
  createdAt,
  updatedAt,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  
  const handleDelete  = async () => {
    // Handle delete action here
    try {
    const response = await axios.delete(`${apiUrl}/Task/${taskId}`);
    if (!response.data.success) {
      toast.error('❌ فشل حذف المهمة.');
      return;
    }
      toast.success('✅ تم حذف المهمة بنجاح');
      router.push('/task');
    router.refresh();
     
    } catch (error) {
      toast.error('❌ فشل إرسال البيانات إلى الخادم.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-6 space-y-6 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🧾 Task #{taskId}
        </h2>
        {isCompleted ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <XCircle className="text-red-500 w-5 h-5" />
        )}
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Challenge ID:</span>
          </div>
          <span className="text-gray-900 font-semibold">
            {challengeId ?? '—'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Status:</span>
          </div>
          <span className={`font-semibold ${isCompleted ? 'text-green-600' : 'text-red-500'}`}>
            {isCompleted ? 'Completed' : 'Not Completed'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Created At:</span>
          </div>
          <span className="text-gray-900">
            {createdAt ? new Date(createdAt).toLocaleString() : '—'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCcw className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Updated At:</span>
          </div>
          <span className="text-gray-900">
            {updatedAt ? new Date(updatedAt).toLocaleString() : '—'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t mt-2">
        <Button
          variant="outline"
          className="hover:bg-blue-50 text-blue-600 border-blue-200"
          onClick={() => router.push(`/task/${taskId}`)}
        >
          📄 Show
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-800 text-white"
          onClick={() => router.push(`/task/${taskId}/edit`)}
        >
          ✏️ Edit
        </Button>


       <DeleteDialog
          onHandleClick={handleDelete}
        />
         
      </div>
    </div>
  );
};

export default ShowTaskCard;
