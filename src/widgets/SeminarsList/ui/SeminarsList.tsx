import { useGetSeminarsQuery } from "@/entities/seminar/api/seminarsApi";
import { SeminarCard } from "@/entities/seminar/ui/SeminarCard";
import DeleteSeminarButton from "@/features/deleteSeminar/ui/DeleteSeminarButton";
import { Stack } from "@mui/material";

const SeminarsList = () => {
  const { data: seminars, isLoading } = useGetSeminarsQuery();
  return (
    <Stack gap={2}>
      {isLoading
        ? "Loading..."
        : seminars!.map((seminar) => (
            <SeminarCard
              key={seminar.id}
              seminar={seminar}
              actions={<DeleteSeminarButton seminarId={seminar.id} />}
            />
          ))}
    </Stack>
  );
};

export default SeminarsList;
