// ✅ React + Tailwind + ShadCN component (TypeScript version)
// This receives the challenge JSON and renders it beautifully
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BellIcon, PencilIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface AlertDTO {
  alertID: number;
  dateAndTime: string;
  isCompleted: boolean;
}

interface ChallengeData {
  challengeID: number;
  articleID: number;
  title: string;
  description: string;
  durationTimes: number;
  timesPerDay: number;
  taskID: number;
  measurementID: number;
  alerts: AlertDTO[];
}

interface Props {
  data: ChallengeData;
}

const ChallengeCard: React.FC<Props> = ({ data }) => {
  const {
    challengeID,
    articleID,
    title,
    description,
    durationTimes,
    timesPerDay,
    taskID,
    measurementID,
    alerts,
  } = data;

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="w-full h-full flex">
      <Card className="flex flex-col justify-between w-full h-full bg-white shadow-xl rounded-2xl">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2" dir="rtl">
              {title}
            </h2>
            <p
              className="text-gray-600 text-sm mb-4 whitespace-pre-line line-clamp-4"
              dir="rtl"
            >
              {description}
            </p>

            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>🗓️ المدة: {durationTimes}دقيقة </span>
              <span>🧭 المهام يوميًا: {timesPerDay}</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-md font-semibold mb-2">
              📌 تنبيهات المهمة #{taskID}
            </h3>
            <div className="flex flex-wrap gap-2">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <>
                  <Badge
                    key={alert.alertID}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700"
                  >
                    <BellIcon className="w-4 h-4" />
                    {new Date(alert.dateAndTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {alert.isCompleted ? (
                      <div className="flex items-center text-green-600">
                        <span className="text-lg">✔️</span>
                        <span className="ml-2">تم الإنجاز</span>
                      </div>
                    ) : (
                     
                    <div className="flex items-center text-orange-600">
                      <span className="text-lg animate-pulse">⏳</span>
                      <span className="ml-2">بانتظار الإنجاز</span>
                    </div>

                   
                   
                    
                    )}

                    <Button
                      onClick={() => router.push(`/alert/${alert.alertID}/task-alert`)}
                      variant="ghost"
                      size="icon"
                      className="ml-1 w-4 h-4 text-gray-500 hover:text-gray-800"
                    >
                      <PencilIcon className="w-3 h-3" />
                    </Button>
                  
                    
                    
                  </Badge>
                   
                    <div className="block text-blue-500 text-xs mt-1 cursor-pointer hover:underline">
                      <button type="button" onClick={()=>router.push(`/alert/${alert.alertID}/edit`)}>تعديل التنبية</button>
                    </div>
                  </>
                ))
              ) : (
                <span className="text-gray-400 text-sm">
                  لا توجد تنبيهات اليوم.
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeCard;
