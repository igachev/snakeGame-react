
import { useEffect, useState } from 'react'
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
  let [timer,setTimer] = useState<number>()
  let [isMovingUp,setIsMovingUp] = useState<boolean>(false)
  
  // useEffect() for moving the snake up
  useEffect(() => {

    function moveUp(e: KeyboardEvent) {
      e.preventDefault()

      if(e.key === 'ArrowUp') {
       
       let repeatedMovement = () => {
        let snakeHead = document.querySelector('.snake-head') as HTMLDivElement
        let bottom = getComputedStyle(snakeHead).getPropertyValue('bottom')
        let updateBottom = parseInt(bottom) + 50
        setPosition((oldPosition) => ({...oldPosition, bottom: updateBottom}))
        }

        if(isMovingUp) {
          return;
        } 
        let timerAction = setInterval(repeatedMovement,500)
        setTimer(timerAction)
        setIsMovingUp(true)
    }
      else {
        clearInterval(timer)
      }
    
    }
      
      document.addEventListener("keyup",moveUp)
    
    return () => {
      document.removeEventListener("keyup",moveUp)
     // clearInterval(timer)
     
    }
  },[position])

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
