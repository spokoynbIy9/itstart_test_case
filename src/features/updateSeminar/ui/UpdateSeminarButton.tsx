import { Button } from "@mui/material";
import { FC, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { SeminarUpdateModal } from "@/features/seminarUpdateModal/ui/SeminarUpdateModal";
import { Seminar } from "@/entities/seminar/model/types/seminar";

type UpdateSeminarButtonProps = {
  seminar: Seminar;
};

export const UpdateSeminarButton: FC<UpdateSeminarButtonProps> = (props) => {
  const { seminar } = props;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Button variant="outlined" startIcon={<EditIcon />} onClick={toggleOpen}>
        Редактировать
      </Button>
      <SeminarUpdateModal open={open} onClose={toggleOpen} seminar={seminar} />
    </>
  );
};
