"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCreateBoard } from "@/hooks/use-create-board"

const createBoardSchema = z.object({
    title: z.string().min(3).max(30)
})

type CreateBoardValues = z.infer<typeof createBoardSchema>

export const CreateBoard = () => {
    const [isFormOpened, setIsFormOpened] = useState(false);
    
    const { mutateAsync } = useCreateBoard();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateBoardValues>({
        resolver: zodResolver(createBoardSchema)
    })

    const onSubmit = handleSubmit((values) => {
        mutateAsync(values);
        setIsFormOpened(false);
    });
    
    const openForm = () => setIsFormOpened(true);
    
    return (
        <div
        className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={openForm}
      >
        {isFormOpened ? (
          <form onSubmit={onSubmit}>
            <input
                {...register('title')}
                type="text"
                disabled={isSubmitting}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.title?.message && (
                <p className="mt-2 text-xs text-red-600 dark:text-red-500">
                <span className="font-medium">Oops!</span>{errors.title?.message}
                </p>
            )}
          </form>
        ) : (
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            + Create a new board
          </h5>
        )}
      </div>
    )
}
