import { useEffect, useState } from 'react'

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false) // valor inicial "false" para a tela de loading

  const getCars = () => {
    setCars([]) // limpa a lista setCars e carrega novamente
    setLoading(true) // quando iniciar a requisição, vai gerar tela de loading
    fetch('https://api.b7web.com.br/carros/api/carros')
      .then(function (result) {
        // recebe o 'result' e transforma em json através de .json()
        return result.json()
      })
      .then(function (json) {
        // pega as infos armazenadas em json
        setLoading(false) // quando tiver carregado, some a tela de loading
        if (json.error === '') {
          // se não tiver erro no json, armazena as infos em 'cars'
          setCars(json.cars)
        } else {
          alert(json.error) // caso tenha erro, mostra na tela
        }
      })
  }

  useEffect(() => {
    // ao atualizar a tela, faz a requisição
    getCars()
  }, [])

  return (
    <div>
      <h1>Lista de Carros</h1>
      <button onClick={getCars}>Atualizar Lista!</button>
      <hr />

      {loading === true && <h2>Carregando as informações...</h2>}

      {cars.map((item, index) => (
        <div key={index}>
          <img src={item.photo} width="300px" />
          <h3>
            {item.brand} - {item.name}
          </h3>
          <p>
            {item.year} - R${item.price}
          </p>
        </div>
      ))}
    </div>
  )
}

export default App

// API: https://api.b7web.com.br/carros/api/carros
