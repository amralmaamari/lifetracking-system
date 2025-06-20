// ✅ صفحة تفاصيل التحدي ومهمة اليوم مع واجهة الكتابة والتقييم
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader } from "lucide-react";

interface AlertItem {
  AlertID: number;
  DateAndTime: string;
  IsActive: boolean;
  Completed?: boolean;
  Note?: string;
}

interface TaskDetailsProps {
  challengeId: number;
  title: string;
  description: string;
  alerts: AlertItem[];
  timesPerDay: number;
}

export default function TaskDetailPage() {
  const searchParams = useSearchParams();
  const challengeId = Number(searchParams.get("id"));

  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState<TaskDetailsProps | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTaskData({
        challengeId,
        title: "✨ كتابة 3 أسطر كل صباح",
        description:
          "كل صباح، اكتب:\n- شيء ممتن له\n- تركيز اليوم\n- خطوة صغيرة للتحسن",
        timesPerDay: 3,
        alerts: [
          { AlertID: 1, DateAndTime: "2025-04-18T06:30:00", IsActive: true },
          { AlertID: 2, DateAndTime: "2025-04-18T13:00:00", IsActive: true },
          { AlertID: 3, DateAndTime: "2025-04-18T20:30:00", IsActive: true }
        ]
      });
      setLoading(false);
    }, 2000);
  }, [challengeId]);

  const toggleCompletion = (index: number) => {
    if (!taskData) return;
    const updated = [...taskData.alerts];
    updated[index].Completed = !updated[index].Completed;
    setTaskData({ ...taskData, alerts: updated });
  };

  const updateNote = (index: number, note: string) => {
    if (!taskData) return;
    const updated = [...taskData.alerts];
    updated[index].Note = note;
    setTaskData({ ...taskData, alerts: updated });
  };

  if (loading || !taskData) {
    return (
      <div className="p-10 text-center text-gray-500">
        <Loader className="animate-spin mx-auto mb-2" /> جاري تحميل المهمة...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-xl rounded-xl">
        <CardContent className="space-y-6 p-6" dir="rtl">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {taskData.title}
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {taskData.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">✅ تتبع إنجاز تنبيهات اليوم:</h3>
            <div className="space-y-4">
              {taskData.alerts.map((alert, index) => (
                <div
                  key={alert.AlertID}
                  className="border p-4 rounded-lg bg-gray-50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-blue-700">
                      ⏰ {new Date(alert.DateAndTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={!!alert.Completed}
                        onCheckedChange={() => toggleCompletion(index)}
                      />
                      تم الإنجاز؟
                    </label>
                  </div>
                  <Textarea
                    placeholder="كيف شعرت بعد تنفيذ المهمة؟"
                    className="w-full min-h-[100px]"
                    value={alert.Note || ""}
                    onChange={(e) => updateNote(index, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button className="w-full mt-4">💾 حفظ التقييم اليومي</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
