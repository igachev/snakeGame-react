import Square from "../Square/Square";
import "./AllSquares.css"

export default function AllSquares() {

    return (
        <div className="all-squares">
            {Array.from({length: 360}, (k,i) => (
                <Square key={i} />
            ))}
        </div>
    )
}