"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import useFetch from "@/hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

// interface Article {
//   id: number
//   title: string
//   description: string
//   userID: number
//   createdAt: string
//   updatedAt: string
// }

interface Measurement {
  measurementId: number;
  title: string;
}

// here will use for create only and if u want to update use different thing lateron i will thing about it 
export default function ChallengeTaskAlertForm() {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");

  const [selectedArticle, setSelectedArticle] = useState<string>("");
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [reminderTimes, setReminderTimes] = useState<string[]>([""]);

  const {
    data: articles, // مختصر وواضح
    error: articlesError, // لتحديد نوع الخطأ
    loading: isLoadingArticles, // أفضل توصيف للبوول
  } = useFetch({ url: `/Article` });

  const {
    data: measurements, // مختصر وواضح
    error: measurementsError, // لتحديد نوع الخطأ
    loading: isLoadingMeasurements, // أفضل توصيف للبوول
  } = useFetch({ url: `/Measurement` });

  useEffect(() => {
    setReminderTimes((prev) => {
      const newReminders = [...prev];
      while (newReminders.length < timesPerDay) newReminders.push("");
      return newReminders.slice(0, timesPerDay);
    });
  }, [timesPerDay]);



  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !startDate ||
      !endDate ||
      !selectedArticle ||
      !selectedMeasurement ||
      reminderTimes.some((t) => !t)
    ) {
      toast.error(
        "❌ الرجاء تعبئة جميع الحقول المطلوبة والتأكد من أوقات التنبيهات."
      );
      return;
    }

    const payload = {
      UserId: 1, // ثابت حالياً
      ArticleId: parseInt(selectedArticle),
      Title: title,
      Description: description,
      StartDate: startDate,
      EndDate: endDate,
      DurationTimes: hours * 60 + minutes,
      MeasurementId: parseInt(selectedMeasurement),
      TimesPerDay: timesPerDay,
      Alerts: reminderTimes,
    };
    

    try {

      
     
       const response = await axios.post(`${apiUrl}/Challenge/create-challenge-tasks-alerts`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(!response.data || !response.data.success) {
          toast.error("❌ فشل إنشاء التحدي. الرجاء المحاولة لاحقاً.");
          return;
        }
        toast.success("✅ تم إنشاء التحدي!");
        
        router.push(`/challenge`);
      

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "❌ Axios Error: " + (error.response?.data || error.message)
        );
      } else {
        toast.error("❌ Unknown Error: " + (error as any).message);
      }
    }
  };

  const getTomorrow = (date: string) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-2">
      <h1 className="text-xl font-bold" dir="rtl">
            إنشاء تحدي      
      </h1>

      <Select
        value={selectedArticle}
        onValueChange={setSelectedArticle}
        dir="rtl"
      >
        {isLoadingArticles && (
          <p className="text-sm text-gray-500">📦 جاري تحميل المقالات...</p>
        )}
        {articlesError && (
          <p className="text-sm text-red-600">
            ❌ فشل تحميل المقالات: {articlesError.toString()}
          </p>
        )}

        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر مقالة..." />
        </SelectTrigger>
        <SelectContent>
          {/* ✅ خيار لإلغاء التحديد */}
          <SelectItem value=" " className="text-gray-500 font-extrabold ">
            بدون اختيار
          </SelectItem>

          {Array.isArray(articles) &&
            articles.map((article) => (
              <SelectItem
                key={article.articleId}
                value={article.articleId.toString()}
              >
                {article.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Input
        dir="rtl"
        placeholder="عنوان التحدي"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Textarea
        dir="rtl"
        placeholder="وصف التحدي"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>تاريخ البداية :</Label>
          <Input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>تاريخ النهاية: :</Label>
          <Input
            type="date"
            value={endDate}
            min={getTomorrow(startDate)}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="space-y-2">
          <Label>ساعة :</Label>
          <Input
            type="number"
            min={0}
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value))}
            placeholder="Hours"
          />
        </div>
        <div className="space-y-2">
          <Label>دقائق :</Label>

          <Input
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            placeholder="Minutes"
          />
        </div>
      </div>

      <Select
        value={selectedMeasurement}
        onValueChange={setSelectedMeasurement}
        dir="rtl"
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="اختر المقياس..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" " className="text-gray-500 font-extrabold ">
            بدون اختيار
          </SelectItem>
          {isLoadingMeasurements && <h2>Loading...</h2>}
          {!isLoadingMeasurements && measurementsError && (
            <h2>{measurementsError}</h2>
          )}
          {!measurementsError &&
            measurements &&
            Array.isArray(measurements) &&
            measurements.map((measure: Measurement) => (
              <SelectItem
                key={measure.measurementId}
                value={measure.measurementId.toString()}
              >
                {measure.title}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Label>عدد مرات التنفيذ باليوم :</Label>

      <Input
        type="number"
        min={1}
        max={10}
        value={timesPerDay}
        onChange={(e) => setTimesPerDay(parseInt(e.target.value))}
        placeholder="عدد التكرارات في اليوم"
      />

      <div className="space-y-2">
        <Label>التنبيهات (أوقات المنبه):</Label>
        {reminderTimes.map((time, index) => (
          <Input
            key={index}
            type="time"
            value={time}
            onChange={(e) => {
              const newTimes = [...reminderTimes];
              newTimes[index] = e.target.value;
              setReminderTimes(newTimes);
            }}
          />
        ))}
      </div>

      <Button type="submit">{"إنشاء"}</Button>
    </form>
  );
}
