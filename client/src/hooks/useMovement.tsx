
import { Position } from "../App";

export function useMovement(
     keyValue: string,
     direction: string,
     setPosition: React.Dispatch<React.SetStateAction<Position>>,
     timerRef:  React.MutableRefObject<number | undefined>
    ) {
    
    function move(e: KeyboardEvent) {
      e.preventDefault()
      if (e.key === keyValue) {
        // if another interval is already started it will be cleared
        // to prevent unexpected behavior
        clearInterval(timerRef.current);
        
        // updates the position values
        function movement() {
          let updateBottom: number = 0;
          let updateLeft: number = 0;

          const snakeHead = document.querySelector('.snake-head') as HTMLDivElement;

          const bottom = getComputedStyle(snakeHead).getPropertyValue('bottom');
          let left = getComputedStyle(snakeHead).getPropertyValue('left');
          console.log(left)

          if(direction === 'up') {
             updateBottom = parseInt(bottom) + 50;
             setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
          }
          else if(direction === 'down') {
            updateBottom = parseInt(bottom) - 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
          }

          else if(direction === 'left') {
            
            updateLeft = parseInt(left) - 50;
            console.log(updateLeft)
            setPosition((oldPosition: Position) => ({...oldPosition, left: updateLeft}))
          }

          else if(direction === 'right') {
            updateLeft = parseInt(left) + 50;
            setPosition((oldPosition: Position) => ({...oldPosition, left: updateLeft}))
          }
          
        };
        
        // starts new interval so on each 0.5sec to move with 50px in the desired direction
        timerRef.current = setInterval(movement, 500);
      }
    };
  
   
    return move;
  }