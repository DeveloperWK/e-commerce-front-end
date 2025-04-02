import { Pencil, Trash2 } from "lucide-react";
interface actionType {
  onEdit?: () => void;
  onDelete: () => void;
}
const ActionButtons = ({ onEdit, onDelete }: actionType) => {
  return (
    <div className="flex space-x-2">
      {/* Edit Button */}
      <button
        onClick={onEdit}
        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Pencil className="w-4 h-4 mr-2" /> {/* Lucide Edit Icon */}
        Edit
      </button>

      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <Trash2 className="w-4 h-4 mr-2" /> {/* Lucide Delete Icon */}
        Delete
      </button>
    </div>
  );
};

export default ActionButtons;
