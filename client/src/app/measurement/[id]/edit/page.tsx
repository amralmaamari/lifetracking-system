"use client";
import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useParams } from "next/navigation";
import MeasurementForm from '@/components/measurement/MeasurementForm';

export default function Page() {
  const { id } = useParams();
  const { data, error, loading } = useFetch({ url: `/Measurement/${id}` });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">جاري تحميل البيانات...</p>
      </div>
    );
  }

  return (
    data && (
      <MeasurementForm
        initialTitle={data.title}
        initialIsCompleted={data.isCompleted}
        mode="update"
        measurementId={data.measurementId}
      />
    )
  );
}
