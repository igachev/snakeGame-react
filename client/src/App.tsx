
import { useEffect, useRef, useState } from 'react'
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'
import { useMovement } from './hooks/useMovement'
import Apple from './components/Apple/Apple'
import GameOver from './components/GameOver/GameOver'
import SnakeBody from './components/SnakeBody/SnakeBody'


export interface Position {
  bottom: number;
  left: number;
}

function App() {
  
  let [position,setPosition] = useState<Position>({bottom:400,left:550})
  const [gameOver,setGameOver] = useState<boolean>(false)
  const [points,setPoints] = useState<number>(0)

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
  let moveUp = useMovement('ArrowUp','up',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points)
  let moveDown = useMovement('ArrowDown','down',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points)
  let moveLeft = useMovement('ArrowLeft','left',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points)
  let moveRight = useMovement('ArrowRight','right',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points)
  
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


  return (
    <div>
      <h1>snake game</h1>
      <h3>Points: {points}</h3>
     {!gameOver ? (
      <Container>
      <AllSquares />
      <SnakeHead position={position} setGameOver={setGameOver} snakeLength={snakeLength} />
      <SnakeBody snakeLength={snakeLength} />
      <Apple 
      position={position} 
      applePosition={applePosition} 
      setApplePosition={setApplePosition} 
      setSnakeLength={setSnakeLength}
      setPoints={setPoints}
      />
      </Container>
     ) : <GameOver />}
    </div>
  )
}

export default App
