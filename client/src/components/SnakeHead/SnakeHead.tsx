
import { useEffect } from "react";
import { Position } from "../../App"
import "./SnakeHead.css"

interface SnakeHeadProps {
    position: Position;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function SnakeHead({
    position,
    setGameOver
}: SnakeHeadProps) {

    // if the head of the snake touch any of the outside bounds the game will over
    function onCrossOutsideBounds() {
        if(position.bottom < 0 || position.bottom >= 750 ||
            position.left < 0 || position.left >= 1200
        ) {
            setGameOver(true)
        }
    }

    useEffect(() => {
        onCrossOutsideBounds()
    },[position]);

    return (
            <div className="snake-head">
               
            </div> 
    )
}