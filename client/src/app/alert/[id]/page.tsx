'use client';

import ShowAlertCard from '@/components/alert/ShowAlertCard';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';
import { useParams } from 'next/navigation';
import React from 'react';

export default function Page() {
  const { id } = useParams();
  const { data, loading } = useFetch({ url: `/Alert/${id}` });

  if (loading) {
    return <Loading message="جاري تحميل المنبّه..." />;
  }
  const alert = data || [];



  return (
    <div className="p-4">
        <ShowAlertCard
              key={alert.alertId}
              alertId={alert.alertId}
              taskId={alert.taskId}
              measurementId={alert.measurementId}
              scoreMeasurement={alert.scoreMeasurement }
              notice={alert.notice}
              dateAndTime={alert.dateAndTime}
              isCompleted={alert.isCompleted}
          />
    </div>
  );
}
