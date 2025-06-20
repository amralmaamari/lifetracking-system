'use client';

import { FC } from 'react';
import { Clock, RefreshCcw, FileText, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { DeleteDialog } from '../dialog/DeleteDialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Textarea } from '../ui/textarea';

export type ChallengeCardProps = {
  challengeId: number;
  articleId?: number;
  title?: string;
  description?: string;
  durationTimes?: number;
  timesPerDay?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: number;
};

const ShowChallengeCard: FC<ChallengeCardProps> = ({
  challengeId,
  articleId,
  title,
  description,
  durationTimes,
  timesPerDay,
  startDate,
  endDate,
  createdAt,
  updatedAt,
  userId,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/Challenge/${challengeId}`);
      if (!response.data.success) {
        toast.error('❌ Failed to delete challenge.');
        return;
      }
      toast.success('✅ Challenge deleted successfully');
      router.push('/challenge');
    } catch (error) {
      toast.error('❌ Failed to communicate with server.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-white border border-gray-100 shadow-xl rounded-3xl p-6 space-y-6 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl  font-bold text-gray-800 flex items-center gap-2">
          📘 Challenge #{challengeId}
        </h2>
        <FileText className="text-blue-500 w-5 h-5" />
      </div>

      {/* Details Grid */}
      <div className="grid gap-4 text-sm text-gray-700">
        <button className='cursor-pointer hover:bg-amber-100' onClick={() => router.push(`/article/${articleId}`)}><strong>📖 ArticleId:</strong> {articleId || '—'}</button>
        <p dir='rtl'><strong>📖 Title:</strong> {title || '—'}</p>
         <div dir='rtl'>
          <p ><strong>📖 Description:</strong> </p>

         <Textarea
          placeholder="وصف مختصر للتحدي"
          value={description}
        />
        
        </div>


        <p><strong>⏱️ Duration Times:</strong> {durationTimes ?? '—'} times</p>
        <p><strong>🔄 Times Per Day:</strong> {timesPerDay ?? '—'} per day</p>
        <p><strong>📅 Start Date:</strong> {startDate || '—'}</p>
        <p><strong>🏁 End Date:</strong> {endDate || '—'}</p>
        <p><strong>👤 User ID:</strong> {userId ?? '—'}</p>
        <p><strong><Clock className="inline w-4 h-4 mr-1" /> Created At:</strong> {createdAt ? new Date(createdAt).toLocaleString() : '—'}</p>
        <p><strong><RefreshCcw className="inline w-4 h-4 mr-1" /> Updated At:</strong> {updatedAt ? new Date(updatedAt).toLocaleString() : '—'}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-3 border-t mt-2">
        <Button
          variant="outline"
          className="hover:bg-blue-50 text-blue-600 border-blue-200"
          onClick={() => router.push(`/challenge/${challengeId}`)}
        >
          📄 Show
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-800 text-white"
          onClick={() => router.push(`/challenge/${challengeId}/edit`)}
        >
          ✏️ Edit
        </Button>
        <DeleteDialog onHandleClick={handleDelete} />
      </div>
    </div>
  );
};

export default ShowChallengeCard;
