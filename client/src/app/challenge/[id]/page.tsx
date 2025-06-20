"use client";
import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useParams } from "next/navigation";
import ShowChallengeCard from '@/components/challenge/ShowChallengeCard'; // تأكد أن الملف موجود بهذا المسار

export default function Page() {
  const { id } = useParams();
  const { data, error, loading } = useFetch({ url: `/Challenge/${id}` });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">جاري تحميل التحدي...</p>
      </div>
    );
  }

  return (
    data && (
      <ShowChallengeCard
        challengeId={data.challengeId}
        title={data.title}
        description={data.description}
        articleId={data.articleId}
        durationTimes={data.durationTimes}
        timesPerDay={data.timesPerDay}
        startDate={data.startDate}
        endDate={data.endDate}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
      />
    )
  );
}
