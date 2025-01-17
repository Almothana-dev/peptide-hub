import { ChevronDown } from "lucide-react";
import { Protocol } from "@/types/protocol";

interface ProtocolCardProps {
  protocol: Protocol;
}

const renderStars = (rating: number | null) => {
  const ratingValue = rating || 0;
  return Array(5).fill(0).map((_, index) => (
    <span key={index} className={`text-yellow-400 ${index >= ratingValue ? 'opacity-30' : ''}`}>★</span>
  ));
};

export const ProtocolCard = ({ protocol }: ProtocolCardProps) => {
  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-2xl font-bold mb-2">{protocol.title}</h3>
      <p className="text-gray-600 mb-2">Created by: {protocol.creator.username || 'Anonymous'}</p>
      <p className="text-gray-700 mb-4">{protocol.description}</p>
      
      <div className="flex items-center gap-2 mb-4">
        {renderStars(protocol.average_rating)}
        <span className="text-gray-600">({protocol.total_ratings || 0} reviews)</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {protocol.categories.map(({ category }, index) => (
          <span 
            key={index}
            className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        {protocol.steps
          .sort((a, b) => a.step_number - b.step_number)
          .map((step, index) => (
            <p key={index} className="text-gray-700">
              {step.supplement_name} ({index + 1}) - {step.dosage} {step.frequency}
            </p>
          ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-600">{protocol.total_ratings}</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </div>
        <div className="text-sm text-gray-600">
          References: {protocol.steps.map((_, i) => `[${i + 1}]`).join(' ')}
        </div>
      </div>
    </div>
  );
};