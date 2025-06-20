"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ChallengeStatsProps {
  title: string;
  total: number;
  icon?: React.ReactNode;  // Accept any icon
  description?: string;
}

export default function ChallengeStats({
  title,
  total,
  icon,
  description = "Statistics"
}: ChallengeStatsProps) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div>{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{total}</div>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
