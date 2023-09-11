import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TCreateBoardDto } from "@/app/api/boards/dto";
import { Boards } from "@prisma/client";
import { boardsQueryKey } from "./use-boards";
import { api } from "@/lib/api";

const createBoardFn = async (board: TCreateBoardDto) => {
  const { data } = await api.post<Boards>("/api/boards", board);

  return data;
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBoardFn,
    onSettled: () => {
      queryClient.invalidateQueries(boardsQueryKey);
    },
  });

  return mutation;
};