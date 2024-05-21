
import { useEffect, useRef, useState } from 'react'
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'
import { useMovement } from './hooks/useMovement'
import Apple from './components/Apple/Apple'
import GameOver from './components/GameOver/GameOver'
import SnakeBody from './components/SnakeBody/SnakeBody'
import Loader from './components/Loader/Loader'
import Instructions from './components/Instructions/Instructions'


export interface Position {
  bottom: number;
  left: number;
}

function App() {
  
  const [position,setPosition] = useState<Position>({bottom:400,left:550})
  const [gameOver,setGameOver] = useState<boolean>(false)
  const [points,setPoints] = useState<number>(0)
  const [isLoading,setIsLoading] = useState<boolean>(true)
  const [applePosition,setApplePosition] = useState<Position>(() => {
    // initial apple position
    setIsLoading(false)
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
  const [difficulty,setDifficulty] = useState<number>(1)
  const timerRef = useRef<number | undefined>();

  let moveUp = useMovement('ArrowUp','up',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points,setDifficulty)
  let moveDown = useMovement('ArrowDown','down',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points,setDifficulty)
  let moveLeft = useMovement('ArrowLeft','left',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points,setDifficulty)
  let moveRight = useMovement('ArrowRight','right',setPosition,timerRef,setSnakeLength,setPreviousDirection,previousDirection,points,setDifficulty)
  
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
      <h2 style={ {textAlign: 'center', margin: '0px', padding: '0px',textTransform: 'uppercase' } }>snake game</h2>
      <h3 style={ {textAlign: 'center', margin: '0px', padding: '0px' } }>Points: {points}</h3>
      <h3 style={ {textAlign: 'center', margin: '0px', padding: '0px' } }>Level of Difficulty: {difficulty}</h3>

      {isLoading && <Loader />}

     {!gameOver && !isLoading ? (
      <>
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
      <Instructions />
      </>
     ) : null}

     {gameOver && <GameOver
     setPosition={setPosition}
     setGameOver={setGameOver}
     setPoints={setPoints}
     setPreviousDirection={setPreviousDirection}
     setSnakeLength={setSnakeLength}
     setDifficulty={setDifficulty}
     timerRef={timerRef}
     />}

    </div>
  )
}

export default App
