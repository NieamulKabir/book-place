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
        <div className="relative bg-gray-700 w-96 rounded-lg shadow-lg">
          <div className="p-4">
            <h3 className="text-xl font-semibold text-green-400">Delete Confirmation</h3>
            <p className=" text-white">
              Are you sure you want to delete this Book?
            </p>
          </div>
          <div className="flex justify-end px-4 py-3 bg-gray-600 rounded-b-lg">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white border border-green-400 rounded-xl font-semibold mr-2"
            >
             <i className="fa-solid fa-xmark mr-1 font-bold"></i> Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-gray-900 text-white font-semibold rounded"
            >
                <i className="fa-solid fa-trash-can mr-1 font-bold"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
