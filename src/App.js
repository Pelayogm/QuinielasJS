import logo from './logo.svg';
import './App.css';
import QuinielaLista from './Componentes/QuinielasLista';
import  { QuinielaProvider } from './Providers/QuinielaProvider'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <QuinielaLista/>
      </header>
    </div>
  );
}

export default App;
