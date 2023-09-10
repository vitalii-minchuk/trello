import { BoardsList } from "@/components/boards-list.component";

export default async function Home() {
  return (
    <>
      <main className="mt-4 px-2 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <BoardsList />
      </main>
    </>
  )
}
