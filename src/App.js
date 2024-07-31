import './App.css'
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import api from './services/api';

function App() {

  const [input, setInput] = useState("");
  const [cep, setCep] = useState("")


  async function handleSearch(e){
    e.preventDefault()
    if (input.length < 8){
      alert('Digite um CEP válido')
      return
    }

    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput('')
      
    }
    catch{
      alert('CEP não encontrado')
      setInput('')
    }
  }


  return (
    <div className="container">
      <h1 className="titulo">Buscador CEP</h1>

        <div className="input-container">
          <input
            type="text"
            placeholder="Digite o CEP..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
      
      <form>
        <button 
          className="busca-btn" 
          onClick={handleSearch}
          >
          <CiSearch size={25} color='#fff'/>
        </button>
      </form>
        </div>
        {Object.keys(cep).length > 0 && (
          <main>
          <h2>CEP: {cep.cep}</h2>

          <ul>
            <li>Rua: {cep.logradouro}</li>
            <li>Bairro: {cep.bairro}</li>
            <li>Complemento: {cep.complemento}</li>
            <li>Cidade: {cep.localidade}</li>
            <li>Estado: {cep.uf}</li>
          </ul>

        </main> 
        )}
        {Object.keys(cep).length === 0 &&(
         <h4 className='alerta'>(Utilize apenas números)</h4>
        )}

    </div>
  );
}

export default App;
