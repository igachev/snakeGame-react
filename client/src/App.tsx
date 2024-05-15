
import { useEffect, useRef, useState } from 'react'
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'

interface Position {
  bottom: number;
  left: number;
}

function App() {
  
  let [position,setPosition] = useState<Position>({bottom:400,left:550})
 // let [timer,setTimer] = useState<number>(0)
 const timerRef = useRef<number | undefined>();
  
  // useEffect() for moving the snake up
  useEffect(() => {

    function moveUp(e: KeyboardEvent) {
      e.preventDefault();
  
      if (e.key === 'ArrowUp') {
        clearInterval(timerRef.current);
  
        const movement = () => {
          const snakeHead = document.querySelector('.snake-head') as HTMLDivElement;
          const bottom = getComputedStyle(snakeHead).getPropertyValue('bottom');
          const updateBottom = parseInt(bottom) + 50;
          console.log('rep');
          setPosition((oldPosition) => ({ ...oldPosition, bottom: updateBottom }));
        };
  
        timerRef.current = setInterval(movement, 500);
      } else {
        console.log('clear');
        clearInterval(timerRef.current);
      }
    };

      document.addEventListener("keyup",moveUp)
    return () => {
      document.removeEventListener("keyup",moveUp)
    }
  },[position])

   // useEffect() for moving the snake down
  

  // useEffect() to update snakeHead DOM element when the position changes
  useEffect(() => {
    let snakeHead = document.querySelector('.snake-head') as HTMLDivElement;
    snakeHead.style.bottom = `${position.bottom}px`;
  }, [position]);

  return (
    <div>
      <h1>snake game</h1>
     <Container>
     <AllSquares />
     <SnakeHead />
     </Container>
    </div>
  )
}

export default App
