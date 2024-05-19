import { Position } from "../../App"

interface SnakeBodyProps {
    snakeLength: Position[];
}

export default function SnakeBody({
    snakeLength
}: SnakeBodyProps) {

    return (
        <>
        {snakeLength.map((pos, index) => (
            <div
              key={index}
              className="snake-part"
              style={{ bottom: `${pos.bottom}px`, left: `${pos.left}px`,backgroundColor:`rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,transition: 'background-color 1.5s linear' }}
            />
          ))}
        </>
    )
}