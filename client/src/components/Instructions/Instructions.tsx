
import "./Instructions.css"

export default function Instructions() {

    return (
        <>
        <h3>Instructions</h3>
        <div className="instructions">
            
            <div>  
                <div className="how-to-move">
                    <h4>How To Move</h4>
                    <p>Move Up <span>&#8593;</span> </p>
                    <p>Move Down <span>&#8595;</span> </p>
                    <p>Move Left <span>&#8592;</span> </p>
                    <p>Move Right <span>&#8594;</span> </p>
                </div>
            </div>

            <div>
                <div className="levels">
                    <h4>Difficulty Levels</h4>
                    <h5>After each level the snake will move faster</h5>
                    <p><strong>1</strong> - starts at the beginning of the game</p>
                    <p><strong>2</strong> - starts when player passes 300 points</p>
                    <p><strong>3</strong> - starts when player passes 600 points</p>
                    <p><strong>4</strong> - starts when player passes 900 points</p>
                    <p><strong>5</strong> - starts when player passes 1200 points</p>
                    <p><strong>6</strong> - starts when player passes 1500 points</p>
                </div>
            </div>

            <div>
            <h3>fruit list and their points</h3>
                <div className="fruit-points">
                    <table>
                        <thead>
                            <tr>
                                <th>Fruit</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>🍎</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>🍏</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>🍉</td>
                                <td>30</td>
                            </tr>
                            <tr>
                                <td>🍐</td>
                                <td>40</td>
                            </tr>
                            <tr>
                                <td>🍌</td>
                                <td>50</td>
                            </tr>
                            <tr>
                                <td>🍓</td>
                                <td>60</td>
                            </tr>
                            <tr>
                                <td>🥝</td>
                                <td>70</td>
                            </tr>
                            <tr>
                                <td>🍒</td>
                                <td>80</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        </>
    )
}