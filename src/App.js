import { useEffect, useState } from 'react'

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false) // valor inicial "false" para a tela de loading
  const [year, setYear] = useState('')

  const getCars = () => {
    setCars([]) // limpa a lista setCars e carrega novamente
    setLoading(true) // quando iniciar a requisição, vai gerar tela de loading
    fetch(`https://api.b7web.com.br/carros/api/carros?ano=${year}`)
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

  const handleYearChange = e => {
    setYear(e.target.value) // pega o valor das opções em <option>
  }

  useEffect(() => {
    // ao atualizar a tela, faz a requisição
    getCars()
  }, [year])

  return (
    <div>
      <h1>Lista de Carros</h1>

      <select onChange={handleYearChange}>
        <option></option>
        <option>2022</option>
        <option>2021</option>
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
        <option>2017</option>
        <option>2016</option>
        <option>2015</option>
        <option>2014</option>
        <option>2013</option>
        <option>2012</option>
      </select>

      <button onClick={getCars}>Atualizar Lista!</button>
      <hr />

      {/* Tela de Loading e Tela de Nenhum Carro encontrado */}
      {loading === true && <h2>Carregando as informações...</h2>}
      {cars.length === 0 && loading === false && (
        <h2>Nenhum Carro Encontrado.</h2>
      )}

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
