import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { Boards } from "@prisma/client";

const getBoardsFn = async () => {
    const { data } = await api.get<Boards[]>("/api/boards");
  
    return data;
};

export const boardsQueryKey = ["boards"];
  
export const useBoards = () => {
    const query = useQuery({
      queryKey: boardsQueryKey,
      queryFn: getBoardsFn
    });
  
    return query;
};