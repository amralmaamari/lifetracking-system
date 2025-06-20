'use client';

import AlertForm from '@/components/alert/AlertForm';
import Loading from '@/components/Loading';
import useFetch from '@/hooks/useFetch';
import { useParams } from 'next/navigation';
import React from 'react'

export default function Page() {
     const { id } = useParams();
  const { data, loading } = useFetch({ url: `/Alert/${id}` });

  if (loading) {
    return <Loading message="جاري تحميل المنبّه..." />;
  }
  const alert = data || [];

//     alertId,
//   initialTaskId = 0,
//   initialMeasurementId = 0,
//   initialScoreMeasurement = '',
//   initialNotice = '',
//   initialDateAndTime = '',
//   initialIsCompleted = false,


  return (
       alert && (
      <AlertForm
        mode="update"
        alertId={alert.alertId}
        initialTaskId={alert.taskId}
        initialMeasurementId={alert.measurementId}
        initialScoreMeasurement={alert.scoreMeasurement}
        initialIsCompleted={alert.isCompleted}
        initialNotice={alert.notice}
        initialDateAndTime={alert.dateAndTime}
      />
    )

  )
}
