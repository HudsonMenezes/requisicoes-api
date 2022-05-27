import { useEffect, useState } from 'react'

function App() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false) // valor inicial "false" para a tela de loading
  const [year, setYear] = useState('')

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const [nameField, setNameField] = useState('')

  const getCars = async () => {
    setCars([]) // limpa a lista setCars e carrega novamente
    setLoading(true) // quando iniciar a requisição, vai gerar tela de loading

    // aqui começa a requisição com Async e Await
    let result = await fetch(
      `https://api.b7web.com.br/carros/api/carros?ano=${year}`
    )
    let json = await result.json()
    // recebe o 'result' e transforma em json através de .json()
    // pega a result.json() e atribui a json

    setLoading(false) // acabou a requisição, para a tela de loading

    if (json.error === '') {
      setCars(json.cars)
      // se não tiver erro no json, armazena as infos em 'cars'
    } else {
      alert(json.error)
      // caso tenha erro, mostra na tela
    }
  }

  const handleYearChange = e => {
    setYear(e.target.value) // pega o valor das opções em <option>
  }
  // Formulário de Login
  const handleLoginSubmit = async e => {
    e.preventDefault()
    // aqui começa o método POST para login
    let url = 'https://api.b7web.com.br/carros/api/auth/login'
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, // o que será enviado
      body: JSON.stringify({
        email: emailField,
        password: passwordField
      })
    })
    let json = await result.json() // pega o resultado

    if (json.error != '') {
      //se o acesso for negado, é pego aqui e mostrado na tela.
      alert(json.error)
    }
  }

  // Formulário de Registro
  const handleRegisterSubmit = async e => {
    e.preventDefault()
    //aqui começa o metodo POST para registro
    let url = 'https://api.b7web.com.br/carros/api/auth/register'
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, // o que será enviado/registrado
      body: JSON.stringify({
        name: nameField,
        email: emailField,
        password: passwordField
      })
    })
    let json = await result.json() // pega o resultado

    if (json.error != '') {
      //se o acesso for negado, é pego aqui e mostrado na tela.
      alert(json.error)
    }
  }

  useEffect(() => {
    // ao atualizar o ano dos carros, faz a requisição de acordo com o ano
    getCars()
  }, [year])

  return (
    <div>
      {/* Formulário de Registro */}
      <h2>Faça seu Registro:</h2>
      <form onSubmit={handleRegisterSubmit}>
        Nome:
        <input
          type="text"
          value={nameField}
          onChange={e => setNameField(e.target.value)}
        />
        <br />
        Email:
        <input
          type="email"
          value={emailField}
          onChange={e => setEmailField(e.target.value)}
        />
        <br />
        Senha:
        <input
          type="password"
          value={passwordField}
          onChange={e => setPasswordField(e.target.value)}
        />
        <br />
        <input type="submit" value="Registrar" />
      </form>

      <hr />
      <br />
      {/* Formulário de Login */}
      <h2>Faça Login:</h2>
      <form onSubmit={handleLoginSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            value={emailField}
            onChange={e => setEmailField(e.target.value)}
          />
        </label>
        <br />

        <label>
          Senha:
          <input
            type="password"
            value={passwordField}
            onChange={e => setPasswordField(e.target.value)}
          />
        </label>
        <br />

        <input type="submit" value="Enviar" />
      </form>

      <h1>Lista de Carros</h1>
      {/* Seleção do Ano do Carro para Pequisa */}
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
