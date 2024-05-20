
import { Position } from "../App";

export function useMovement(
  keyValue: string,
  direction: string,
  setPosition: React.Dispatch<React.SetStateAction<Position>>,
  timerRef: React.MutableRefObject<number | undefined>,
  setSnakeLength: React.Dispatch<React.SetStateAction<Position[]>>,
  setPreviousDirection: React.Dispatch<React.SetStateAction<string>>,
  previousDirection: string,
  points: number,
  setDifficulty: React.Dispatch<React.SetStateAction<number>>
) {

  function move(e: KeyboardEvent) {
    e.preventDefault();
    if (e.key === keyValue) {
      clearInterval(timerRef.current);

      function movement() {
        let updateBottom: number = 0;
        let updateLeft: number = 0;

        const snakeHead = document.querySelector('.snake-head') as HTMLDivElement;
        if (!snakeHead) return;

        let bottom = parseInt(getComputedStyle(snakeHead).getPropertyValue('bottom'));
        let left = parseInt(getComputedStyle(snakeHead).getPropertyValue('left'));

        if (direction === 'up') {
          // the previousDirection "if" prevents going back in opposite direction
          if(previousDirection == 'down') {
            updateBottom = bottom - 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
            snakeHead.style.transform = 'rotate(180deg)';
          }
          else {
          updateBottom = bottom + 50;
          setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
          snakeHead.style.transform = 'rotate(0deg)';
          setPreviousDirection((oldDirection) => oldDirection !== 'up' ? 'up' : oldDirection)
          } 
        } else if (direction === 'down') {
          // the previousDirection "if" prevents going back in opposite direction
          if(previousDirection === 'up') {
            updateBottom = bottom + 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
            snakeHead.style.transform = 'rotate(0deg)';
          }
          else {
            updateBottom = bottom - 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, bottom: updateBottom }));
            snakeHead.style.transform = 'rotate(180deg)';
            setPreviousDirection((oldDirection) => oldDirection !== 'down' ? 'down' : oldDirection)
          } 
        } else if (direction === 'left') {
          // the previousDirection "if" prevents going back in opposite direction
          if(previousDirection === 'right') {
            updateLeft = left + 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, left: updateLeft }));
          }
          else {
            updateLeft = left - 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, left: updateLeft }));
            snakeHead.style.transform = 'rotate(270deg)';
            setPreviousDirection((oldDirection) => oldDirection !== 'left' ? 'left' : oldDirection)
          } 
        } else if (direction === 'right' ) {
          // the previousDirection "if" prevents going back in opposite direction
          if(previousDirection === 'left') {
            updateLeft = left - 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, left: updateLeft }));
          }
          else {
            updateLeft = left + 50;
            setPosition((oldPosition: Position) => ({ ...oldPosition, left: updateLeft }));
            snakeHead.style.transform = 'rotate(90deg)';
            setPreviousDirection((oldDirection) => oldDirection !== 'right' ? 'right' : oldDirection)
          }
          
        }

        // Update the snake parts
        setSnakeLength((oldPositions) => {
          const newPositions = [...oldPositions];
          if (newPositions.length > 0) {
            // the last item will move to the previous item
            for (let i = newPositions.length - 1; i > 0; i--) {
              newPositions[i] = { ...newPositions[i - 1] };
            }
            // first element of snake body will become equal to the position of the head
            newPositions[0] = { bottom, left };
            
          }
          return newPositions;
        });

      }

      // the snake's speed will increase based on current points
      if(points >= 0 && points <= 300) {
        timerRef.current = setInterval(movement, 400);
        setDifficulty((previousDifficulty) => previousDifficulty !== 1 ? 1 : previousDifficulty)
      }
      else if(points > 300 && points <= 600) {
        timerRef.current = setInterval(movement, 350);
        setDifficulty((previousDifficulty) => previousDifficulty !== 2 ? 2 : previousDifficulty)
      }
      else if(points > 600 && points <= 900) {
        timerRef.current = setInterval(movement, 250);
        setDifficulty((previousDifficulty) => previousDifficulty !== 3 ? 3 : previousDifficulty)
      }
      else if(points > 900 && points <= 1200) {
        timerRef.current = setInterval(movement, 200);
        setDifficulty((previousDifficulty) => previousDifficulty !== 4 ? 4 : previousDifficulty)
      }
      else if(points > 1200 && points <= 1500) {
        timerRef.current = setInterval(movement, 150);
        setDifficulty((previousDifficulty) => previousDifficulty !== 5 ? 5 : previousDifficulty)
      }
      else if(points > 1500) {
        timerRef.current = setInterval(movement, 100);
        setDifficulty((previousDifficulty) => previousDifficulty !== 6 ? 6 : previousDifficulty)
      }
      
    }
  }

  return move;
}