import { useGetSeminarsQuery } from "@/entities/seminars/api/seminarsApi";
import { useEffect } from "react";

const SeminarsPage = () => {
  const { data } = useGetSeminarsQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  });

  return <div>SeminarsPage</div>;
};

export default SeminarsPage;
