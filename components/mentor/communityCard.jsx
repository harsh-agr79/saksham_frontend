import { useState } from "react";
import EditCommunityDialog from "@/components/mentor/editCommunityDialog";
import { Button } from "@/components/ui/button";

const CommunityCard = ({ community, onSave, onView }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditOpen = () => setIsEditOpen(true);
  const handleEditClose = () => setIsEditOpen(false);

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-purple-100">
      <img
        src={community.cover_photo}
        alt={community.name}
        className="w-full h-32 object-cover rounded-lg bg-purple-100"
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{community.name}</h3>
        <p className="text-sm text-gray-600">{community.description}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <Button variant="secondary" onClick={handleEditOpen}>
          Edit
        </Button>
        <Button variant="primary" onClick={onView}>
          View
        </Button>
      </div>
      {/* Edit Dialog */}
      {isEditOpen && (
        <EditCommunityDialog
          community={community}
          onSave={(updatedCommunity) => {
            onSave(updatedCommunity);
            handleEditClose();
          }}
          onClose={handleEditClose}
        />
      )}
    </div>
  );
};

export default CommunityCard;
