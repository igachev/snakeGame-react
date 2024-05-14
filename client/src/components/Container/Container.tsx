
import AllSquares from "../AllSquares/AllSquares"
import "./Container.css"

export default function Container({children}:any) {

    return (
        <div className="container">
            <AllSquares />
            {children}
        </div>
    )
}