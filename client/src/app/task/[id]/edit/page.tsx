"use client";
import useFetch from '@/hooks/useFetch';
import React from 'react'
import { useParams } from "next/navigation";
import TaskForm from '@/components/task/TaskForm';


export default function Page() {
    const { id } = useParams();
    const { data, error, loading } = useFetch({ url: `/Task/${id}` });

    if(loading ) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">جاري تحميل المهمة...</p>
            </div>
        );
    }


  return (
    data &&  (
      <TaskForm 
      initialChallengeId = {data.challengeId }
      initialIsCompleted = {data.isCompleted}
      mode="update"
      taskId={data.taskId}  
      />
    
  )
  );
}