"use client"

import { useBoards } from "@/hooks/use-boards"
import { BoardCard } from "@/components/board-card.component"

export const BoardsList = () => {
  const {data: boards} = useBoards()
  
  return (
    <>
        {boards?.map(el => (
          <div key={el.id} className="grid gap-4">
            <BoardCard board={el} />
          </div>
        ))}
    </>
  )
}
