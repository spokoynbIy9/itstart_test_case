/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Button,
  CardMedia,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { FC, useState } from "react";
import classes from "./Modal.module.scss";
import {
  UpdateSeminarFormSchema,
  updateSeminarFormSchema,
} from "../model/types/UpdateSeminarFormSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Seminar } from "@/entities/seminar/model/types/seminar";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useUpdateSeminarMutation } from "@/entities/seminar/api/seminarsApi";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type SeminarUpdateModalProps = {
  open: boolean;
  onClose: () => void;
  seminar: Seminar;
};

export const SeminarUpdateModal: FC<SeminarUpdateModalProps> = (props) => {
  const { open, onClose, seminar } = props;

  const [preview, setPreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [updateSeminar, { isLoading }] = useUpdateSeminarMutation();

  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = useForm<UpdateSeminarFormSchema>({
    resolver: zodResolver(updateSeminarFormSchema),
    defaultValues: {
      title: seminar.title,
      description: seminar.description,
      date: seminar.date,
      time: seminar.time,
      photo: seminar.photo,
    },
  });

  const onSubmitHandler = async (data: UpdateSeminarFormSchema) => {
    setErrorMessage(null);
    try {
      const newSeminar = {
        id: seminar.id,
        ...data,
      };
      await updateSeminar(newSeminar).unwrap();
      onClose();
    } catch (error) {
      const errMsg =
        (error as any)?.data?.message ||
        "Не удалось обновить семинар. Попробуйте ещё раз.";
      setErrorMessage(errMsg);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Stack className={classes.modal}>
        <Stack
          component={Paper}
          className={classes.content}
          spacing={4}
          elevation={0}
        >
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            spacing={3}
          >
            <Typography variant="h5" textAlign="center">
              Изменить данные семинара
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Название семинара"
                {...register("title")}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
              <TextField
                label="Описание семинара"
                {...register("description")}
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Дата"
                    value={
                      field.value ? dayjs(field.value, "DD.MM.YYYY") : null
                    }
                    onChange={(date) =>
                      field.onChange(date?.format("DD.MM.YYYY"))
                    }
                    slotProps={{
                      textField: {
                        error: Boolean(errors.date),
                        helperText: errors.date?.message,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="Время"
                    value={field.value ? dayjs(field.value, "HH:mm") : null}
                    onChange={(time) => field.onChange(time?.format("HH:mm"))}
                    slotProps={{
                      textField: {
                        error: Boolean(errors.time),
                        helperText: errors.time?.message,
                      },
                    }}
                  />
                )}
              />
              <Stack
                flex={1}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap={5}
              >
                <Controller
                  name="photo"
                  control={control}
                  render={({ field }) => (
                    <label htmlFor="upload-photo">
                      <input
                        id="upload-photo"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const fileURL = URL.createObjectURL(file);
                            field.onChange(fileURL);
                            setPreview(fileURL);
                          }
                        }}
                      />
                      <Button
                        component="span"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{ textAlign: "center" }}
                      >
                        Загрузить фото
                      </Button>
                    </label>
                  )}
                />
                <CardMedia component="img" image={preview || ""} height={200} />
              </Stack>
            </Stack>
            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  borderRadius: 4,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                {errorMessage}
              </Alert>
            )}
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              sx={{ width: "50%", alignSelf: "center" }}
            >
              Изменить
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};
