
import { useEffect } from "react";
import { Position } from "../../App"
import "./SnakeHead.css"

interface SnakeHeadProps {
    position: Position;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    snakeLength: Position[];
  }

export default function SnakeHead({
    position,
    setGameOver,
    snakeLength
}: SnakeHeadProps) {

    // if the head of the snake touch any of the outside bounds the game will over
    function onCrossOutsideBounds() {
        if(position.bottom < 0 || position.bottom >= 750 ||
            position.left < 0 || position.left >= 1200
        ) {
            setGameOver(true)
        }
    }

    // check for collision between head and body and if any the game will end
    function onCollide() {
        snakeLength.forEach((snakePart) => {
            if(snakePart.bottom === position.bottom && snakePart.left === position.left) {
                console.log('collide')
                setGameOver(true)
            }
        })
    }

    useEffect(() => {
        onCrossOutsideBounds() 
    },[position]);

    useEffect(() => {
        onCollide()
    },[position])

    return (
            <div className="snake-head" style={ {bottom: position.bottom, left: position.left} }>
               
            </div> 
    )
}