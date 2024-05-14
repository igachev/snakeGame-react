
import './App.css'
import AllSquares from './components/AllSquares/AllSquares'
import Container from './components/Container/Container'
import SnakeHead from './components/SnakeHead/SnakeHead'


function App() {
  

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
