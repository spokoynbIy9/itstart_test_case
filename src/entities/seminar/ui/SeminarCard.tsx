import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { SeminarDto } from "../model/types/seminar";
import { FC, ReactNode } from "react";

type SeminarCardProps = {
  seminar: SeminarDto;
  actions: ReactNode;
};

export const SeminarCard: FC<SeminarCardProps> = (props) => {
  const { seminar, actions } = props;
  return (
    <Card>
      <CardMedia component="img" image={seminar.photo} height={200} />
      <CardContent>
        <Typography variant="h5">{seminar.title}</Typography>
        <Typography variant="body2">{seminar.description}</Typography>
        <Stack flexDirection="row" gap={2} justifyContent="right">
          <Typography>{seminar.date}</Typography>
          <Typography>{seminar.time}</Typography>
        </Stack>
      </CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  );
};
