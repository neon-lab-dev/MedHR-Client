import { NEXT_REVALIDATE_TIME } from "@/constants/time";

export const fetchData = async <T>(
  url: string,
  revalidate: number = NEXT_REVALIDATE_TIME
) => {
  const data = await fetch(url, {
    next: {
      revalidate: revalidate,
    },
  });
  if (!data.ok) return null;
  const json = await data.json();
  return json as T;
};
