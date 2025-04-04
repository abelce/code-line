import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full w-full flex justify-center items-center p-8">
      <Loader className="animate-spin"/>
    </div>
  );
}
