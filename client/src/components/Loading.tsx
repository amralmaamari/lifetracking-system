import { Loader } from "lucide-react";

export default function Loading({message}:{message:string}) {
  return (
    <div className="p-10 text-center text-gray-500">
    <Loader className="animate-spin mx-auto mb-2" /> {message}
  </div>
  )
}
