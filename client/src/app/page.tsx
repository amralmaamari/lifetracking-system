"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell, CheckCircle } from "lucide-react";
import ChallengeStats from "@/components/ChallengeStats";
// import TaskSummaryCard from "@/components/TaskSummaryCard";


export default function Home() {
  const [challengesToday, setChallengesToday] = useState<number>(0);
  const [alertsToday, setAlertsToday] = useState<number>(0);
  const [focusSessionsToday, setFocusSessionsToday] = useState<number>(0); // if needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const userId = 1; // 👈 Replace with dynamic user ID if needed

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [challengeRes, alertRes] = await Promise.all([
          axios.get(`${apiUrl}/Challenge/user/${userId}/today-count`),
          axios.get(`${apiUrl}/Alert/user/${userId}/today-count`)
        ]);

        

        setChallengesToday(challengeRes.data.data);
        setAlertsToday(alertRes.data.data);

        // You can add a third one for focus sessions if you have it
        // setFocusSessionsToday(...);

      } catch (err) {
        setError("⚠️ فشل تحميل الإحصائيات. حاول مرة أخرى لاحقًا.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [apiUrl, userId]);


  const tempTasks: TaskCardProps[] = [
  {
    taskId: 101,
    challengeId: 12,
    isCompleted: true,
    createdAt: '2025-06-01T09:15:00Z',
    updatedAt: '2025-06-01T10:30:00Z',
  },
  {
    taskId: 102,
    challengeId: null,
    isCompleted: false,
    createdAt: '2025-06-02T12:00:00Z',
    updatedAt: null,
  },
  {
    taskId: 103,
    challengeId: 5,
    isCompleted: true,
    createdAt: '2025-06-03T08:45:00Z',
    updatedAt: '2025-06-03T09:00:00Z',
  },
];

  return (
    <>
   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <ChallengeStats
          title="كل التحديات "
          total={challengesToday}
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          description="عدد التحديات التي تم انشاءة"
        />

        <ChallengeStats
          title="تنبيهات اليوم" 
          total={alertsToday}
          icon={<Bell className="h-5 w-5 text-blue-500" />}
          description="عدد التنبيهات التي تم إنشاؤها اليوم"
        />
      
    
   


        {/* <ChallengeStats
          title="جلسات تركيز"
          total={focusSessionsToday}
          icon={<AlarmClock className="h-5 w-5 text-indigo-500" />}
          description="عدد الجلسات المركزة (غير مفعل بعد)"
        /> */}
      </div>
    </>
  );
}


