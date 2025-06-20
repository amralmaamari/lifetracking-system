"use client";
import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useParams } from "next/navigation";
import ShowMeasurementCard from '@/components/measurement/ShowMeasurementCard';

export default function Page() {
  const { id } = useParams();
  const { data, error, loading } = useFetch({ url: `/Measurement/${id}` });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading measurement...</p>
      </div>
    );
  }

  return (
    data && (
      <ShowMeasurementCard
        measurementId={data.measurementId}
        title={data.title}
        isCompleted={data.isCompleted}
        dateAndTime={data.dateAndTime}
      />
    )
  );
}
