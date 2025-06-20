'use client';

import { FC } from 'react';
import { Type } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { DeleteDialog } from '../dialog/DeleteDialog';
import axios from 'axios';
import toast from 'react-hot-toast';

export type MeasurementCardProps = {
  measurementId: number;
  title?: string;
};

const ShowMeasurementCard: FC<MeasurementCardProps> = ({
  measurementId,
  title,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/Measurement/${measurementId}`);
      if (!response.data.success) {
        toast.error('❌ Failed to delete measurement.');
        return;
      }
      toast.success('✅ Measurement deleted successfully.');
      router.push('/measurement');
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
          📏 Measurement #{measurementId}
        </h2>
      </div>

      {/* Details */}
      <div className="grid gap-4 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Title:</span>
          </div>
          <span className="text-gray-900 font-semibold">{title ?? '—'}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t mt-2">
        <Button
          variant="outline"
          className="hover:bg-blue-50 text-blue-600 border-blue-200"
          onClick={() => router.push(`/measurement/${measurementId}`)}
        >
          📄 Show
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-800 text-white"
          onClick={() => router.push(`/measurement/${measurementId}/edit`)}
        >
          ✏️ Edit
        </Button>
        <DeleteDialog onHandleClick={handleDelete} />
      </div>
    </div>
  );
};

export default ShowMeasurementCard;
