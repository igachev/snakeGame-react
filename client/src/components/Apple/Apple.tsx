
import { useEffect } from "react";
import "./Apple.css"
import { Position } from "../../App";

interface AppleProps {
    position: Position;
    applePosition: {bottom: number; left: number;};
    setApplePosition: React.Dispatch<React.SetStateAction<Position>>;
    setSnakeLength: React.Dispatch<React.SetStateAction<Position[]>>;
}

export default function Apple({
    position,
    applePosition,
    setApplePosition,
    setSnakeLength
}: AppleProps) {

    // updates the apple DOM element when apple position changes
    useEffect(() => {
        const apple = document.querySelector('.apple') as HTMLDivElement;
        apple.style.bottom = `${applePosition.bottom}px`;
        apple.style.left = `${applePosition.left}px`;
  },[applePosition])

    // checks if apple is eaten.If the apple has been eaten it will appear at a new position
    useEffect(() => {
        onEatenApple()
    },[position])

    function onEatenApple(): void {
    const snakeHead = document.querySelector('.snake-head') as HTMLDivElement;
    const snakeHeadBottom = parseInt(getComputedStyle(snakeHead).getPropertyValue('bottom'));
    const snakeHeadLeft = parseInt(getComputedStyle(snakeHead).getPropertyValue('left'));

    const apple = document.querySelector('.apple') as HTMLDivElement;
    const appleBottom = parseInt(getComputedStyle(apple).getPropertyValue('bottom'))
    const appleLeft = parseInt(getComputedStyle(apple).getPropertyValue('left'))

    if(snakeHeadBottom === appleBottom && snakeHeadLeft === appleLeft) {
        console.log('eaten')
    let randomBottom = Math.floor((Math.random() * 700));
    let adjustBottom = Math.round(randomBottom / 50) * 50;
    let randomLeft = Math.floor((Math.random() * 1150));
    let adjustLeft = Math.round(randomLeft / 50) * 50;

    setApplePosition((oldPosition) => ({...oldPosition, bottom: adjustBottom, left: adjustLeft}))
    setSnakeLength((oldLength) => [...oldLength,{bottom: snakeHeadBottom,left: snakeHeadLeft}])
    }
    }


    return (
        <div className="apple">
        
        </div>
    )
}