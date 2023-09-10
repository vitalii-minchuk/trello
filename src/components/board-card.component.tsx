"use client"

import Link from "next/link";
import { FC } from "react"

interface IBoardCardProps {
    board: any
}

export const BoardCard: FC<IBoardCardProps> = ({board}) => {
  return (
    <Link href={`boards/${board.id}`} className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{board.title}</h5>
    </Link>
  )
}
