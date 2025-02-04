import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import classes from "./Modal.module.scss";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string) => void;
  seminarId: string;
};

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = (props) => {
  const { open, onClose, seminarId, onSubmit } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Stack className={classes.modal}>
        <Stack
          component={Paper}
          className={classes.content}
          spacing={4}
          elevation={0}
        >
          <Typography variant="h5">Вы уверены?</Typography>
          <Stack flexDirection="row" justifyContent="space-between">
            <Button onClick={onClose}>Отмена</Button>
            <Button onClick={() => onSubmit(seminarId)}>Удалить</Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ConfirmDeleteModal;
