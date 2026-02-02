import { MessageCircle } from "lucide-react";

export default function CourseCommunity({ course }) {
  return (
    <div className="text-center py-12">
      <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
      <p className="text-gray-600">Community discussions coming soon</p>
    </div>
  );
}
