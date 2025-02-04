import { useDeleteSeminarsMutation } from "@/entities/seminar/api/seminarsApi";
import ConfirmDeleteModal from "@/features/confirmDeleteModal/ui/ConfirmDeleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { FC, useState } from "react";

type DeleteSeminarButtonProps = {
  seminarId: string;
};

const DeleteSeminarButton: FC<DeleteSeminarButtonProps> = (props) => {
  const { seminarId } = props;

  const [open, setOpen] = useState(false);
  const [deleteSeminar] = useDeleteSeminarsMutation();

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const handleSubmit = async (seminarId: string) => {
    try {
      await deleteSeminar(seminarId);
      toggleOpen();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={toggleOpen}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Удалить
      </Button>
      <ConfirmDeleteModal
        open={open}
        onClose={toggleOpen}
        onSubmit={handleSubmit}
        seminarId={seminarId}
      />
    </>
  );
};

export default DeleteSeminarButton;
