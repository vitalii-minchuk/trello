
interface ISingleBoardPageProps {
    params: {
        boardId: string
    }
}
export default async function SingleBoardPage({params}: ISingleBoardPageProps) {
    return (
        <p style={{color: 'white'}}>{params.boardId}</p>
    )
}