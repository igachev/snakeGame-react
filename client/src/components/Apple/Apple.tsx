
import { useEffect } from "react";
import "./Apple.css"
import { Position } from "../../App";

interface AppleProps {
    position: Position;
    applePosition: {bottom: number; left: number;};
    setApplePosition: React.Dispatch<React.SetStateAction<Position>>;
    setSnakeLength: React.Dispatch<React.SetStateAction<Position[]>>;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
}

export default function Apple({
    position,
    applePosition,
    setApplePosition,
    setSnakeLength,
    setPoints
}: AppleProps) {

   

    // checks if apple is eaten.If the apple has been eaten it will appear at a new position
    useEffect(() => {
        onEatenApple()
    },[position])

    function onEatenApple(): void {
   // current snake coordinates
    const snakeHeadBottom = position.bottom;
    const snakeHeadLeft = position.left;

    const apple = document.querySelector('.apple') as HTMLDivElement;
    // current apple coordinates
    const appleBottom = applePosition.bottom
    const appleLeft = applePosition.left

    if(snakeHeadBottom === appleBottom && snakeHeadLeft === appleLeft) {
     
    // new apple coordinates
    let randomBottom = Math.floor((Math.random() * 700));
    let adjustBottom = Math.round(randomBottom / 50) * 50;
    let randomLeft = Math.floor((Math.random() * 1150));
    let adjustLeft = Math.round(randomLeft / 50) * 50;

    // place the apple at new position
    setApplePosition((oldPosition) => ({...oldPosition, bottom: adjustBottom, left: adjustLeft}))
    // increase snake length
    setSnakeLength((oldLength) => [...oldLength,{bottom: snakeHeadBottom,left: snakeHeadLeft}])
    // earned points depends from the type of fruit
    switch(apple.textContent) {
        case '🍎':
        setPoints((currentPoints) => currentPoints = currentPoints + 10)
        break;

        case '🍏':
        setPoints((currentPoints) => currentPoints = currentPoints + 20)
        break;

        case '🍉':
        setPoints((currentPoints) => currentPoints = currentPoints + 30)
        break;

        case '🍐':
        setPoints((currentPoints) => currentPoints = currentPoints + 40)
        break;

        case '🍌':
        setPoints((currentPoints) => currentPoints = currentPoints + 50)
        break;

        case '🍓':
        setPoints((currentPoints) => currentPoints = currentPoints + 60)
        break;

        case '🥝':
        setPoints((currentPoints) => currentPoints = currentPoints + 70)
        break;

        case '🍒':
        setPoints((currentPoints) => currentPoints = currentPoints + 80)
        break;  
    }

    }
    };

    // generate random fruit
    function randomFruit(): string {
        const fruits = ['&#127822;','&#127823;','&#127824;','&#127817;','&#127820;','&#127826;','&#127827;','&#129373;']
        let randomIndex = Math.floor(Math.random() * fruits.length)
        return fruits[randomIndex]
    }


    return (
        <div className="apple"
        style={ {bottom: applePosition.bottom, left: applePosition.left} } 
        dangerouslySetInnerHTML={{ __html: randomFruit() }}>
       
        </div>
    )
}