

import "./Container.css"

export default function Container({children}:any) {

    return (
        <div className="container">
            
            {children}
        </div>
    )
}