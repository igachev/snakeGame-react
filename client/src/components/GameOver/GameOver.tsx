
import { Position } from "../../App"
import "./GameOver.css"

interface GameOverProps {
    setPosition: React.Dispatch<React.SetStateAction<Position>>;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    setPreviousDirection: React.Dispatch<React.SetStateAction<string>>;
    setSnakeLength: React.Dispatch<React.SetStateAction<Position[]>>;
    setDifficulty: React.Dispatch<React.SetStateAction<number>>;
    timerRef: React.MutableRefObject<number | undefined>;
}

export default function GameOver({
    setPosition,
    setGameOver,
    setPoints,
    setPreviousDirection,
    setSnakeLength,
    setDifficulty,
    timerRef
}: GameOverProps) {

    function onReset(): void {
        setPosition((oldPosition) => ({...oldPosition,bottom:400,left:550}))
        setGameOver(false)
        setPoints(0)
        setPreviousDirection("")
        setSnakeLength([])
        setDifficulty(1)
        clearInterval(timerRef.current);
    }

    return (
        <div className="game-over">
            <h2>Game Over</h2>
            <button className="btn" onClick={onReset}>Try Again</button>
        </div>
    )

}