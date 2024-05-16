
import { useEffect } from "react";
import "./Apple.css"

interface apple {
    applePosition: {bottom: number; left: number;}
}

export default function Apple({
    applePosition
}:apple) {

    useEffect(() => {
          const apple = document.querySelector('.apple') as HTMLDivElement;
          apple.style.bottom = `${applePosition.bottom}px`;
          apple.style.left = `${applePosition.left}px`;
    },[applePosition])

    return (
        <div className="apple">
        
        </div>
    )
}