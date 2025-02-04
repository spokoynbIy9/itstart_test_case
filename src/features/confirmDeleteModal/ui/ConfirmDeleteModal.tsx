import { Alert, Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import classes from "./Modal.module.scss";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (id: string) => void;
  seminarId: string;
  error: string | null;
};

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = (props) => {
  const { open, onClose, seminarId, onSubmit, error } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <Stack className={classes.modal}>
        <Stack
          component={Paper}
          className={classes.content}
          spacing={4}
          elevation={0}
        >
          {error && (
            <Alert
              severity="error"
              sx={{
                borderRadius: 4,
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              {error}
            </Alert>
          )}
          <Typography variant="h5" textAlign="center">
            Вы уверены?
          </Typography>
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
