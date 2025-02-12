import { Clock } from "lucide-react";

const ResponseTime = () => {
  return (
    <div className="flex items-center justify-center text-gray-700">
      <Clock className="h-5 w-5 mr-2" />
      <p>Average response time: Within 24 hours</p>
    </div>
  );
};

export default ResponseTime;