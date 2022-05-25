import { useEffect, useState } from 'react'

function App() {
  const [cars, setCars] = useState([])

  const getCars = () => {
    fetch('https://api.b7web.com.br/carros/api/carros')
      .then(function (result) {
        return result.json()
      })
      .then(function (json) {
        if (json.error === '') {
          setCars(json.cars)
        } else {
          alert(json.error)
        }
      })
  }

  useEffect(() => {
    getCars()
  }, [])

  return (
    <>
      <h1>Lista de Carros</h1>
      <button onClick={getCars}>Atualizar Lista!</button>
      <hr />
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
    </>
  )
}

export default App

// API: https://api.b7web.com.br/carros/api/carros

// {cars.map((item, index) => (
//   <div key={index}>
//     <img src={item.photo} width="200px" />
//     <h3>
//       {item.brand} - {item.name}
//     </h3>
//     <p>
//       {item.year} - R$ {item.price}
//     </p>
//   </div>
// ))}
