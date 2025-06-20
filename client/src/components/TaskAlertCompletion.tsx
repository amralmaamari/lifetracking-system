"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface TaskAlertCompletionProps {
  taskID: number;
  alertID: number;
  isCompleted: boolean;
  title: string;
  description: string;
  measurementId: number;
  note?: string;
  scoreMeasurement?: string;
}

const measurementOptions: Record<number, string> = {
  1: "Number",
  2: "Time (minutes)",
  3: "Text",
  4: "Yes / No",
  5: "Rating (1-10)",
  6: "Percentage"
};

const TaskAlertCompletion: React.FC<TaskAlertCompletionProps> = ({
  taskID,
  alertID,
  isCompleted,
  measurementId,
  scoreMeasurement: initialScore = "",
  note: initialNote = "",
  title,
  description,
}) => {
  const router = useRouter();
  const [note, setNote] = useState(initialNote);
  const [completed, setCompleted] = useState(isCompleted);
  const [score, setScore] = useState<string>(initialScore);
  const [isReadOnly, setIsReadOnly] = useState(isCompleted);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  
  const handleClose = () => {
    router.push(`/challenge`);
  };

  const handleSubmit = async () => {
    if (!alertID || !note.trim() || !score.trim()) {
      toast.error("❌ الرجاء تعبئة كل الحقول المطلوبة.");
      return;
    }
    try {
      const response = await axios.put(`${apiUrl}/Alert/${alertID}`, {
        AlertId: alertID,
        ScoreMeasurement: score,
        Notice: note,
        IsCompleted: completed
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (response.data.success) {
        toast.success("✅ تم اضافة التقييم!");
        setIsReadOnly(true);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("❌ Axios Error: " + (error.response?.data || error.message));
      } else {
        toast.error("❌ Unknown Error: " + (error as any).message);
      }
    }
  };

  const renderInputByMeasurement = () => {
    if (!measurementId || !measurementOptions[Number(measurementId)]) {
      return <p className="text-red-500">⚠️ نوع التقييم غير معروف أو غير مدعوم.</p>;
    }

    switch (Number(measurementId)) {
      case 1:
        return <Input type="number" placeholder="أدخل رقمًا" value={score} onChange={(e) => setScore(e.target.value)} disabled={isReadOnly} />;
      case 2:
        return <Input type="number" placeholder="أدخل عدد الدقائق" value={score} onChange={(e) => setScore(e.target.value)} min={0} disabled={isReadOnly} />;
      case 3:
        return <Textarea placeholder="أدخل نصًا" value={score} onChange={(e) => setScore(e.target.value)} disabled={isReadOnly} />;
      case 4:
        return (
          <Select onValueChange={setScore} value={score} disabled={isReadOnly}>
            <SelectTrigger><SelectValue placeholder="اختر" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">نعم</SelectItem>
              <SelectItem value="No">لا</SelectItem>
            </SelectContent>
          </Select>
        );
      case 5:
        return (
          <Select onValueChange={setScore} value={score} disabled={isReadOnly}>
            <SelectTrigger><SelectValue placeholder="اختر تقييم" /></SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, i) => {
                const val = (i + 1).toString();
                return <SelectItem key={val} value={val}>{val} ⭐</SelectItem>;
              })}
            </SelectContent>
          </Select>
        );
      case 6:
        return <Input type="number" placeholder="% نسبة مئوية (0-100)" value={score} onChange={(e) => setScore(e.target.value)} max={100} min={0} disabled={isReadOnly} />;
      default:
        return <p className="text-gray-500">لا يوجد نوع قياس محدد.</p>;
    }
  };

  return (
    <div className="flex items-center justify-center inset-0 bg-opacity-40 z-50 overflow-auto">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-xl overflow-hidden">
        <Card>
          <CardContent className="space-y-6 p-6" dir="rtl">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
              <p className="text-gray-600 whitespace-pre-line">{description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">✅ تتبع إنجاز هذا التنبيه:</h3>
              <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-blue-700">
                    🆔 تنبيه رقم {alertID} - مهمة رقم {taskID}
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={completed}
                      onCheckedChange={() => setCompleted(!completed)}
                      disabled={isReadOnly}
                    />
                    تم الإنجاز؟
                  </label>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">💬 ملاحظتك:</label>
                  <Textarea
                    placeholder="كيف شعرت بعد تنفيذ المهمة؟"
                    className="w-full min-h-[100px]"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">
                    📏 نوع التقييم: {measurementOptions[Number(measurementId)] ?? "غير محدد"}
                  </label>
                  {renderInputByMeasurement()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <Button variant="outline" onClick={handleClose}>إغلاق</Button>
                {!isReadOnly && <Button onClick={handleSubmit}>💾 حفظ التقييم</Button>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaskAlertCompletion;
