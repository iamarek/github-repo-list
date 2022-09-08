import useSWR from "swr";
import { Repository } from "../types/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/** Use this custom hook to retrieve data from GitHub */
function useRepositories() {
  const { data, error } = useSWR<Repository[]>("/api/repositories", fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRepositories;
