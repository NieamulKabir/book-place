import { useState } from "react";

type DeleteModalProps = {
    onCancel: () => void;
    onDelete: () => void;
  };
const DeleteModal:React.FC<DeleteModalProps> = ({ onDelete, onCancel })=> {
  const [isModalOpen, setModalOpen] = useState(true);
  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    setModalOpen(false);
  };
  return (
    <div className={`fixed z-10 inset-0 ${isModalOpen ? "" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="relative bg-white w-96 rounded-lg shadow-lg">
          <div className="p-4">
            <h3 className="text-xl font-semibold">Delete Confirmation</h3>
            <p className="mt-2 text-gray-700">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex justify-end px-4 py-3 bg-gray-100 rounded-b-lg">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 font-semibold mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
