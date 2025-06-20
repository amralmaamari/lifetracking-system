import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function TaskItem({ label, completed, note }: { label: string; completed: boolean; note: string }) {
  return (
    <div className="flex flex-col gap-2 border p-3 rounded-md">
      <div className="flex items-center gap-2">
        <Checkbox checked={completed} />
        <span>{label}</span>
      </div>
      <Textarea defaultValue={note} placeholder="How was your day?" />
    </div>
  );
}
