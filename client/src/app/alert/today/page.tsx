"use client";

import ChallengeCard from "@/components/ChallengeCard";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ChallengeCardDTO {
  ChallengeID: number;
  ArticleID: number;
  Title: string;
  Description: string;
  DurationTimes: number;
  TimesPerDay: number;
  TaskID: number;
  MeasurementID: number;
  AlertsJson: string;
}

export default function Page() {
 

  const {
    data: challenges,        // مختصر وواضح
    error: challengesError,  // لتحديد نوع الخطأ
    loading: isLoadingChallenges // أفضل توصيف للبوول
  } = useFetch({ url: `/Challenge/today-article-tasks-alerts` });


  
  if (isLoadingChallenges || !challenges) {
    return (
     <Loading message="جاري تحميل المهمة..." />
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-right rtl">قائمة تنبيهات اليوم</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.isArray(challenges) &&
        challenges.map((challenge: ChallengeCardDTO,index) => (
          <ChallengeCard key={index} data={challenge} />
        
          
        ))}

      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <Link href="challenge/new">
          <Button
            variant="default"
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg text-white"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
