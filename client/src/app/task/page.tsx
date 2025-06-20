"use client";

import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import ShowTaskCard from "@/components/task/ShowTaskCard";
import { Button } from "@/components/ui/button";

const TaskListPage =  () => {
    const router = useRouter();
    const { data, error, loading } = useFetch({ url: `/Task` });

    const tasks = data || [];

  return (
    <div className="p-6 space-y-4 max-w-1xl mx-auto">
        <div className="flex justify-between">
      <h1 className="text-2xl font-bold text-blue-700 ">📋 All Tasks</h1>
    <Button variant={"outline"} onClick={() => router.push(`/task/new`)}>New Task</Button>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {loading && <p className="text-gray-500">Loading tasks...</p>}
      {tasks&& tasks.map((task: any) => (
        <ShowTaskCard
          key={task.taskId}
          taskId={task.taskId}
          challengeId={task.challengeId}
          isCompleted={task.isCompleted}
          createdAt={task.createdAt}
          updatedAt={task.updatedAt}
        />
      ))}
      </div>
    </div>
  );
};

export default TaskListPage;
