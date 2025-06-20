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

interface TaskDetailsProps {
  challengeId: number;
  title: string;
  description: string;
  alerts: { AlertID: number; DateAndTime: string; IsActive: boolean }[];
  timesPerDay: number;
}

export default function TaskDetailPage() {
  const searchParams = useSearchParams();
  const challengeId = Number(searchParams.get("id"));

  const [loading, setLoading] = useState(true);
  const [taskData, setTaskData] = useState<TaskDetailsProps | null>(null);
  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    // Simulate API load
    setTimeout(() => {
      // Mock data here or fetch by challengeId
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
    }, 500);
  }, [challengeId]);

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
            <h3 className="font-semibold mb-2">🕒 تنبيهات اليوم:</h3>
            <div className="flex flex-wrap gap-2">
              {taskData.alerts.map((alert) => (
                <Badge
                  key={alert.AlertID}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    alert.IsActive ? "bg-blue-100 text-blue-700" : "bg-gray-200"
                  }`}
                >
                  {new Date(alert.DateAndTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 font-semibold text-sm">
              <Checkbox
                checked={completed}
                onCheckedChange={(v) => setCompleted(!!v)}
              />
              هل أنهيت هذه المهمة؟
            </label>
            <Textarea
              placeholder="كيف كانت تجربتك؟ ما هي مشاعرك اليوم؟"
              className="w-full min-h-[120px]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button className="w-full">✅ حفظ التقييم</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
