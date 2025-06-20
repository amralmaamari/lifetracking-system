"use client";

import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useParams } from "next/navigation";
import ChallengeForm from '@/components/challenge/ChallengeForm'; // تأكد أن لديك هذا المكون

export default function Page() {
  const { id } = useParams();
  const { data, error, loading } = useFetch({ url: `/Challenge/${id}` });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">جاري تحميل بيانات التحدي...</p>
      </div>
    );
  }

  return (
    data && (
      <ChallengeForm
        mode="update"
        challengeId={data.challengeId}
        initialTitle={data.title}
        initialDescription={data.description} // عرض أول 100 حرف فقط
        initialArticleId={data.articleId}
        initialDurationTimes={data.durationTimes}
        initialTimesPerDay={data.timesPerDay}
        initialStartDate={data.startDate}
        initialEndDate={data.endDate}
        initialUserId={data.userId}
      />
    )
  );
}
