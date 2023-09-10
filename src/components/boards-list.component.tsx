"use client"

import { FC } from "react"

import { useBoards } from "@/hooks/use-boards"
import { BoardCard } from "@/components/board-card.component"
import { Boards } from "@prisma/client"
import { CreateBoard } from "@/components/create-board.component"

interface IBoardsListProps {
  initialData: Boards[]
}

export const BoardsList: FC<IBoardsListProps> = ({initialData}) => {
  const {data: boards} = useBoards({initialData})
  
  return (
    <>
        {boards?.map(el => (
          <div key={el.id} className="grid gap-4">
            <BoardCard board={el} />
          </div>
        ))}
        <CreateBoard />
    </>
  )
}
