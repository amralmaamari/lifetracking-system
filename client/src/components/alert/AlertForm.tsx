'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export type AlertFormProps = {
  alertId?: number;
  initialTaskId?: number;
  initialMeasurementId?: number;
  initialScoreMeasurement?: string;
  initialNotice?: string;
  initialDateAndTime?: string;
  initialIsCompleted?: boolean;
  mode: 'create' | 'update';
};

const AlertForm: FC<AlertFormProps> = ({
  alertId,
  initialTaskId = 0,
  initialMeasurementId = 0,
  initialScoreMeasurement = '',
  initialNotice = '',
  initialDateAndTime = '',
  initialIsCompleted = false,
  mode,
}) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [taskId, setTaskId] = useState<number>(initialTaskId);
  const [measurementId, setMeasurementId] = useState<number>(initialMeasurementId || 4);
  const [scoreMeasurement, setScoreMeasurement] = useState<string>(initialScoreMeasurement);
  const [notice, setNotice] = useState<string>(initialNotice);
  const [dateAndTime, setDateAndTime] = useState<string>(initialDateAndTime);
  const [isCompleted, setIsCompleted] = useState<boolean>(initialIsCompleted);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      taskId,
      measurementId,
      scoreMeasurement,
      notice,
      dateAndTime,
      isCompleted,
    };

    try {
      if (mode === 'create') {
        await axios.post(`${apiUrl}/Alert`, payload);
      } else if (mode === 'update' && alertId) {
        await axios.put(`${apiUrl}/Alert/${alertId}`, {
          alertId,
          ...payload,
          updatedAt: new Date(),
        });
      }

      toast.success(`✅ Alert ${mode === 'create' ? 'created' : 'updated'} successfully`);
      router.push('/alert');
    } catch (error) {
      toast.error('❌ Failed to send data to the server.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  const renderInputByMeasurement = () => {
    switch (Number(measurementId)) {
      case 1:
        return (
          <InputField
            label="Score (Number)"
            value={scoreMeasurement}
            onChange={setScoreMeasurement}
            type="number"
          />
        );
      case 2:
        return (
          <InputField
            label="Score (Minutes)"
            value={scoreMeasurement}
            onChange={setScoreMeasurement}
            type="number"
          />
        );
      case 3:
        return (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Score (Text)</label>
            <Textarea
            dir='rtl'
              value={scoreMeasurement}
              onChange={(e) => setScoreMeasurement(e.target.value)}
              className="text-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Enter text"
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Score (Yes / No)</label>
            <Select value={scoreMeasurement} onValueChange={setScoreMeasurement}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case 5:
        return (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Score (1-10)</label>
            <Select value={scoreMeasurement} onValueChange={setScoreMeasurement}>
              <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>{`${i + 1} ⭐`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case 6:
        return (
          <InputField
            label="Score (Percentage)"
            value={scoreMeasurement}
            onChange={setScoreMeasurement}
            type="number"
          />
        );
      default:
        return <p className="text-red-500">⚠️ Unknown or unsupported measurement type.</p>;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 shadow-xl rounded-2xl p-8 max-w-lg mx-auto space-y-6 transition-all"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
        {mode === 'create' ? '➕ Create New Alert' : `✏️ Update Alert #${alertId}`}
      </h2>

      <InputField label="Task ID" value={taskId} onChange={setTaskId} type="number" />
      <InputField label="Measurement ID" value={measurementId} onChange={setMeasurementId} type="number"  />
      {renderInputByMeasurement()}
       <Textarea
       dir='rtl'
                  placeholder="اكتب ملاحظاتك"
                  className="w-full min-h-[100px]"
                  value={notice}
                  onChange={(e) => setNotice(e.target.value)}
        />
      <InputField label="Date & Time" value={dateAndTime} onChange={setDateAndTime} type="datetime-local" />

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">✅ Completed?</label>
        <Switch
          checked={isCompleted}
          onCheckedChange={setIsCompleted}
          className="data-[state=checked]:bg-green-500"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium tracking-wide py-2"
        disabled={loading}
      >
        {loading ? '⏳ Submitting...' : mode === 'create' ? '📝 Create Alert' : '💾 Update Alert'}
      </Button>
    </form>
  );
};

export default AlertForm;

type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (val: any) => void;
  type?: string;
};

const InputField = ({ label, value, onChange, type = 'text' }: InputFieldProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
      className="text-sm focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
