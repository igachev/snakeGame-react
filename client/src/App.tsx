
import { useEffect, useRef, useState } from 'react'
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'
import { useMovement } from './hooks/useMovement'
import Apple from './components/Apple/Apple'


export interface Position {
  bottom: number;
  left: number;
}

function App() {
  
  let [position,setPosition] = useState<Position>({bottom:400,left:550})

  const [applePosition,setApplePosition] = useState<Position>(() => {
    
    let randomBottom = Math.floor((Math.random() * 700));
    let adjustBottom = Math.round(randomBottom / 50) * 50;
    let randomLeft = Math.floor((Math.random() * 1150));
    let adjustLeft = Math.round(randomLeft / 50) * 50;
    return {
      bottom:adjustBottom,
      left:adjustLeft
    }
  });

  const timerRef = useRef<number | undefined>();
  let moveUp = useMovement('ArrowUp','up',setPosition,timerRef)
  let moveDown = useMovement('ArrowDown','down',setPosition,timerRef)
  let moveLeft = useMovement('ArrowLeft','left',setPosition,timerRef)
  let moveRight = useMovement('ArrowRight','right',setPosition,timerRef)
 
  
  // useEffect() for moving the snake up
  useEffect(() => {
    document.addEventListener("keydown", moveUp);
    return () => {
      document.removeEventListener("keydown", moveUp);
      //clearInterval(timerRef.current);
    };
  }, [position]);

   // useEffect() for moving the snake down
  useEffect(() => {
    document.addEventListener("keydown",moveDown)
    return () => {
      document.removeEventListener("keydown",moveDown)
    }
  },[position])

  // useEffect() for moving the snake left
  useEffect(() => {
    document.addEventListener("keydown",moveLeft)
    return () => {
      document.removeEventListener("keydown",moveLeft)
    }
  },[position])

  // useEffect() for moving the snake right
  useEffect(() => {
    document.addEventListener("keydown",moveRight)
    return () => {
      document.removeEventListener("keydown",moveRight)
    }
  },[position])

  // useEffect() to update snakeHead DOM element when the position changes
  useEffect(() => {
    let snakeHead = document.querySelector('.snake-head') as HTMLDivElement;
    snakeHead.style.bottom = `${position.bottom}px`;
    snakeHead.style.left = `${position.left}px`;
  }, [position]);

  return (
    <div>
      <h1>snake game</h1>
     <Container>
     <AllSquares />
     <SnakeHead />
     <Apple applePosition={applePosition} />
     </Container>
    </div>
  )
}

export default App
