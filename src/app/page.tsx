import { BoardCard } from "@/components";
import prismadb from "./lib/prismadb";

export default async function Home() {
  const boards = await prismadb.boards.findMany()

  return (
    <>
      <main className="mt-4 px-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {boards?.map(el => (
          <div key={el.id} className="grid gap-4">
            <BoardCard board={el} />
          </div>
        ))}
      </main>
    </>
  )
}
