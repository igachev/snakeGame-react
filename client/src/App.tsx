
import { useEffect, useRef, useState } from 'react'
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'
import { useMovement } from './hooks/useMovement'
import Apple from './components/Apple/Apple'
import GameOver from './components/GameOver/GameOver'


export interface Position {
  bottom: number;
  left: number;
}

function App() {
  
  let [position,setPosition] = useState<Position>({bottom:400,left:550})
  const [gameOver,setGameOver] = useState<boolean>(false)

  const [applePosition,setApplePosition] = useState<Position>(() => {
    // initial apple position
    let randomBottom = Math.floor((Math.random() * 700));
    let adjustBottom = Math.round(randomBottom / 50) * 50;
    let randomLeft = Math.floor((Math.random() * 1150));
    let adjustLeft = Math.round(randomLeft / 50) * 50;
    return {
      bottom:adjustBottom,
      left:adjustLeft
    }
  });

  const [snakeLength, setSnakeLength] = useState<Position[]>([]);
  const [previousDirection,setPreviousDirection] = useState<string>('')

  const timerRef = useRef<number | undefined>();
  let moveUp = useMovement('ArrowUp','up',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,setGameOver)
  let moveDown = useMovement('ArrowDown','down',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,setGameOver)
  let moveLeft = useMovement('ArrowLeft','left',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,setGameOver)
  let moveRight = useMovement('ArrowRight','right',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,setGameOver)
  
  // useEffect() for moving the snake up
  useEffect(() => {
    document.addEventListener("keydown", moveUp);
    return () => {
      document.removeEventListener("keydown", moveUp);
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
     {!gameOver ? (
      <Container>
      <AllSquares />
      <SnakeHead position={position} setGameOver={setGameOver} />
      {snakeLength.map((pos, index) => (
           <div
             key={index}
             className="snake-part"
             style={{ bottom: `${pos.bottom}px`, left: `${pos.left}px` }}
           />
         ))}
      <Apple 
      position={position} 
      applePosition={applePosition} 
      setApplePosition={setApplePosition} 
      setSnakeLength={setSnakeLength}
      />
      </Container>
     ) : <GameOver />}
    </div>
  )
}

export default App
