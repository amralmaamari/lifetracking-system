'use client';

import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import ShowMeasurementCard from '@/components/measurement/ShowMeasurementCard';
import { Button } from '@/components/ui/button';

const MeasurementListPage = () => {
  const router = useRouter();
  const { data, error, loading } = useFetch({ url: `/Measurement` });

  const measurements = data || [];

  return (
    <div className="p-6 space-y-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">📊 All Measurements</h1>
        <Button variant="outline" onClick={() => router.push(`/measurement/new`)}>
          ➕ New Measurement
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <p className="text-gray-500 animate-pulse bg-gray-100 rounded p-4 col-span-full text-center">
            Loading measurements...
          </p>
        )}

        {measurements &&
          measurements.map((measurement: any) => (
            <ShowMeasurementCard
              key={measurement.measurementId}
              measurementId={measurement.measurementId}
              title={measurement.title}
              isCompleted={measurement.isCompleted}
              dateAndTime={measurement.dateAndTime}
            />
          ))}
      </div>
    </div>
  );
};

export default MeasurementListPage;
