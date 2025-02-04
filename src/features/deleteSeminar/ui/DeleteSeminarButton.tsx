/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleteSeminar] = useDeleteSeminarsMutation();

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
    setErrorMessage(null);
  };

  const handleSubmit = async (seminarId: string) => {
    try {
      await deleteSeminar(seminarId).unwrap();
      toggleOpen();
    } catch (error) {
      const errMsg =
        (error as any)?.data?.message ||
        "Не удалось удалить семинар. Попробуйте ещё раз.";
      setErrorMessage(errMsg);
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
        error={errorMessage}
      />
    </>
  );
};

export default DeleteSeminarButton;
