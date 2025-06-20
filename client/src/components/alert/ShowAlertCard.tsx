'use client';

import { FC } from 'react';
import { Clock, FileText, BellRing, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { DeleteDialog } from '../dialog/DeleteDialog';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Textarea } from '../ui/textarea';

export type AlertCardProps = {
  alertId: number;
  taskId?: number;
  measurementId?: number;
  scoreMeasurement?: string;
  notice?: string;
  dateAndTime?: string;
  isCompleted?: boolean;
};

const ShowAlertCard: FC<AlertCardProps> = ({
  alertId,
  taskId,
  measurementId,
  scoreMeasurement,
  notice,
  dateAndTime,
  isCompleted,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/Alert/${alertId}`);
      if (!response.data.success) {
        toast.error('❌ Failed to delete alert.');
        return;
      }
      toast.success('✅ Alert deleted successfully.');
      router.push('/alert');
    } catch (error) {
      toast.error('❌ Server error.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-6 space-y-6 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🔔 Alert #{alertId}
        </h2>
        {isCompleted ? (
          <CheckCircle className="text-green-500 w-5 h-5" />
        ) : (
          <XCircle className="text-red-500 w-5 h-5" />
        )}
      </div>

      {/* Alert Info */}
      <div className="grid gap-4 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Task ID:</span>
          </div>
          <span className="text-gray-900">{taskId ?? '—'}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Measurement ID:</span>
          </div>
          <span className="text-gray-900">{measurementId ?? '—'}</span>
        </div>

        <div >
          <div className="flex items-center gap-2 ">
            <BellRing className="w-4 h-4 text-gray-500" />
            <span className="font-medium ">Score:</span>
          </div>
          <Textarea
              dir='rtl'
                  placeholder="كيف شعرت بعد تنفيذ المهمة؟"
                  className="w-full min-h-[100px] "
                  value={scoreMeasurement?? '—'}
          />
        </div>

        <div className="flex items-start gap-2">
          <BellRing className="w-4 h-4 text-gray-500 mt-1" />
          <div className='w-full'>
            <span className="font-medium block">Notice:</span>
             <Textarea
              dir='rtl'
                  placeholder="كيف شعرت بعد تنفيذ المهمة؟"
                  className="w-full min-h-[100px]"
                  value={notice?? '—'}
        />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Date & Time:</span>
          </div>
          <span className="text-gray-900">
            {dateAndTime ? new Date(dateAndTime).toLocaleString() : '—'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t mt-2">
        <Button
          variant="outline"
          onClick={() => router.push(`/alert/${alertId}`)}
          className="hover:bg-blue-50 text-blue-600 border-blue-200"
        >
          📄 View
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-800 text-white"
          onClick={() => router.push(`/alert/${alertId}/edit`)}
        >
          ✏️ Edit
        </Button>
        <DeleteDialog onHandleClick={handleDelete} />
      </div>
    </div>
  );
};

export default ShowAlertCard;
