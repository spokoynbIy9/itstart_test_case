/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSeminarsQuery } from "@/entities/seminar/api/seminarsApi";
import { SeminarCard } from "@/entities/seminar/ui/SeminarCard";
import DeleteSeminarButton from "@/features/deleteSeminar/ui/DeleteSeminarButton";
import { UpdateSeminarButton } from "@/features/updateSeminar/ui/UpdateSeminarButton";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

// DeleteSeminarButton и UpdateSeminarButton
// были переданы с помощью пропса, чтобы
// продолжить придерживаться методологии fsd.
// Ведь, мы не можем использовать features в entities напрямую,
// поэтому пришлось воспользоваться widgets и пропсами.

const SeminarsList = () => {
  const {
    data: seminars,
    isLoading,
    isFetching,
    isError,
    refetch,
    error,
  } = useGetSeminarsQuery();

  if (isLoading) {
    return (
      <Stack alignItems="center">
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Загрузка семинаров...
        </Typography>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert
        severity="error"
        sx={{
          borderRadius: 4,
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Typography>
          Ошибка:{" "}
          {(error as any)?.data?.message || "Не удалось загрузить семинары"}
        </Typography>
        <Button onClick={refetch} color="inherit">
          Повторить попытку
        </Button>
      </Alert>
    );
  }

  if (!isFetching && (!seminars || seminars.length === 0)) {
    return (
      <Typography variant="h6" align="center">
        Нет доступных семинаров
      </Typography>
    );
  }

  return (
    <Stack gap={2}>
      {isFetching && <CircularProgress />}
      {seminars?.map((seminar) => (
        <SeminarCard
          key={seminar.id}
          seminar={seminar}
          actions={[
            <DeleteSeminarButton key="delete" seminarId={seminar.id} />,
            <UpdateSeminarButton key="update" seminar={seminar} />,
          ]}
        />
      ))}
    </Stack>
  );
};

export default SeminarsList;
