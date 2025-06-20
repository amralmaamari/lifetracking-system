'use client';

import Loading from '@/components/Loading';
import TaskAlertCompletion from '@/components/TaskAlertCompletion';
import useFetch from '@/hooks/useFetch';
import { useParams } from 'next/navigation';
import React from 'react';

export interface IAlertDetails {
  alertId: number;
  taskId: number;
  measurementId: number;
  scoreMeasurement: string;
  notice: string;
  dateAndTime: string;
  isCompleted: boolean;
  title: string;
  description: string;
}

// دالة للتحقق من صحة البيانات
function isValidAlertDetails(obj: any): obj is IAlertDetails {
  return (
    obj &&
    typeof obj === 'object' &&
    'alertId' in obj &&
    'taskId' in obj &&
    'measurementId' in obj &&
    'scoreMeasurement' in obj &&
    'notice' in obj &&
    'dateAndTime' in obj &&
    'isCompleted' in obj &&
    'title' in obj &&
    'description' in obj
  );
}

export default function Page() {
  const { id } = useParams();
  const { data, loading } = useFetch({ url: `/Alert/${id}/details` });

  if (loading) {
    return <Loading message="جاري تحميل المنبّه..." />;
  }

  if (!data || !isValidAlertDetails(data)) {
    return <Loading message="لا توجد بيانات صحيحة للمنبّه" />;
  }

  const task = data as IAlertDetails;


  return (
    <div className="p-4">
      <TaskAlertCompletion
        taskID={task.taskId}
        alertID={task.alertId}
        isCompleted={task.isCompleted}
        title={task.title}
        description={task.description}
        note={task.notice}
        scoreMeasurement={task.scoreMeasurement}
        measurementId={task.measurementId}
      />
    </div>
  );
}
