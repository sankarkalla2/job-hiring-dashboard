import {
  QueryFunction,
  QueryKey,
  useQuery,
  Enabled,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isFetched, refetch, isFetching, isPending } = useQuery({
    queryKey,
    queryFn,
  });
  return { data, isPending, isFetched, refetch, isFetching };
};
