'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import { Button } from '@/components/ui/button';
import ShowAlertCard from '@/components/alert/ShowAlertCard';

export default function Page() {
  const router = useRouter();
  const { data, error, loading } = useFetch({ url: `/Alert` });

  const alerts = data || [];

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">🔔 All Alerts</h1>
        <Button variant="outline" onClick={() => router.push(`/alert/new`)}>
          ➕ New Alert
        </Button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center text-gray-500 py-10 animate-pulse">
          Loading alerts...
        </div>
      )}

      {/* Grid of Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alerts.map((alert: any) => (
          <ShowAlertCard
            key={alert.alertId}
            alertId={alert.alertId}
            taskId={alert.taskId}
            measurementId={alert.measurementId}
            scoreMeasurement={alert.scoreMeasurement?.slice(0, 13) + '...' || 'No scoremeasurement'}
              notice={alert.notice?.slice(0, 13) + '...' || 'No notice'}
            dateAndTime={alert.dateAndTime}
            isCompleted={alert.isCompleted}
          />
        ))}
      </div>
    </div>
  );
}
