import { useEffect, useRef, useState } from 'react'
import api from './api'

function App() {
  //pegando informacoes para login e armazenando no localstorage
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userName, setUserName] = useState(localStorage.getItem('username'))

  //adicionar novos carros
  const [newCarBrand, setNewCarBrand] = useState('')
  const [newCarName, setNewCarName] = useState('')
  const [newCarYear, setNewCarYear] = useState('')
  const [newCarPrice, setNewCarPrice] = useState('')
  //para pegar o arquivo do upload
  const photoField = useRef()

  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false) // valor inicial "false" para a tela de loading
  const [year, setYear] = useState('')

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [rEmailField, setREmailField] = useState('')
  const [rPasswordField, setRPasswordField] = useState('')

  const [rNameField, setRNameField] = useState('')

  const getCars = async () => {
    setCars([]) // limpa a lista setCars e carrega novamente
    setLoading(true) // quando iniciar a requisição, vai gerar tela de loading

    // ***** REQUISIÇÃO COM AXIOS ******
    let { data: json } = await api.get(`/carros?ano=${year}`)

    /* // ******REQUISIÇÃO COM FETCH*******
    let result = await fetch(
      `https://api.b7web.com.br/carros/api/carros?ano=${year}`
    )
    let json = await result.json()
    // recebe o 'result' e transforma em json através de .json()
    // pega a result.json() e atribui a json */

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

    // ***** REQUISIÇÃO COM AXIOS ******
    let { data: json } = await api.post('/auth/login', {
      email: emailField,
      password: passwordField
    })

    /* ***** REQUISIÇÃO COM FETCH ******
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
    */

    if (json.error != '') {
      //se o acesso for negado, é pego aqui e mostrado na tela.
      alert(json.error)
    } else {
      //salva as informacoes para a proxima requisição.
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', json.user.name)
      setToken(json.token)
      setUserName(json.user.name)
    }
  }

  // Formulário de Registro
  const handleRegisterSubmit = async e => {
    e.preventDefault()
    //aqui começa o metodo POST para registro

    // ***** REQUISIÇÃO COM AXIOS ******
    let { data: json } = await api.post('/auth/register', {
      name: rNameField,
      email: rEmailField,
      password: rPasswordField
    })

    /* ***** REQUISIÇÃO COM FETCH ******
    let url = 'https://api.b7web.com.br/carros/api/auth/register'
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, // o que será enviado/registrado
      body: JSON.stringify({
        name: rNameField,
        email: rEmailField,
        password: rPasswordField
      })
    })
    let json = await result.json() // pega o resultado
    */

    if (json.error != '') {
      //se o acesso for negado, é pego aqui e mostrado na tela.
      alert(json.error)
    } else {
      //salva as informacoes para a proxima requisição.
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', json.user.name)
      setToken(json.token)
      setUserName(json.user.name)
    }
  }

  // faz logout do usuário
  const handleLogout = () => {
    setToken('')
    setUserName('')
    localStorage.setItem('token', '')
    localStorage.setItem('username', '')
  }

  //faz o envio das informacoes no registro do carro
  const handleAddCarSubmit = async e => {
    e.preventDefault()

    // adiciona as informações que serão enviadas
    let body = new FormData()
    body.append('brand', newCarBrand)
    body.append('name', newCarName)
    body.append('year', newCarYear)
    body.append('price', newCarPrice)

    //vai ver se o usuario enviou algum arquivo, e se enviou mais de um, pega o primeiro
    if (photoField.current.files.length > 0) {
      body.append('photo', photoField.current.files[0])
    }

    //aqui começa chamada para enviar o registro de novos carros

    // ***** REQUISIÇÃO COM AXIOS ******
    api.defaults.headers.Authorization = `Bearer ${token}` // autorização para ser enviada com a requisição
    let { data: json } = await api.post('/carro', body)

    /* ***** REQUISIÇÃO COM FETCH ******
    let result = await fetch('https://api.b7web.com.br/carros/api/carro', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body //como não dá pra enviar arquivos dentro de json, é usado o new FormData()
    })

    let json = await result.json()
    */

    if (json.error !== '') {
      alert('Ocorreu um erro!')
      console.log(json.error)
    } else {
      alert('Carro adicionado com Sucesso!')
      getCars()
      setNewCarBrand('')
      setNewCarName('')
      setNewCarYear('')
      setNewCarPrice('')
    }
  }

  useEffect(() => {
    // ao atualizar o ano dos carros, faz a requisição de acordo com o ano
    getCars()
  }, [year])

  return (
    <div>
      {!token && (
        <div>
          {/* Formulário de Registro */}
          <h2>Faça seu Registro:</h2>
          <form onSubmit={handleRegisterSubmit}>
            Nome:
            <input
              type="text"
              value={rNameField}
              onChange={e => setRNameField(e.target.value)}
            />
            <br />
            Email:
            <input
              type="email"
              value={rEmailField}
              onChange={e => setREmailField(e.target.value)}
            />
            <br />
            Senha:
            <input
              type="password"
              value={rPasswordField}
              onChange={e => setRPasswordField(e.target.value)}
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
        </div>
      )}
      {token && (
        <section>
          <div>
            <h3>Olá, {userName}, seja bem-vindo!</h3>
            <button onClick={handleLogout}>Sair</button>
          </div>

          <form onSubmit={handleAddCarSubmit}>
            <h4>Adicionar Carro</h4>
            <label>
              Marca do Carro:
              <input
                type="text"
                value={newCarBrand}
                onChange={e => setNewCarBrand(e.target.value)}
              />
            </label>
            <br />
            <label>
              Nome do Carro:
              <input
                type="text"
                value={newCarName}
                onChange={e => setNewCarName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Ano do Carro:
              <input
                type="number"
                value={newCarYear}
                onChange={e => setNewCarYear(e.target.value)}
              />
            </label>
            <br />
            <label>
              Preço do Carro:
              <input
                type="number"
                value={newCarPrice}
                onChange={e => setNewCarPrice(e.target.value)}
              />
            </label>
            <br />
            <label>
              Foto do Carro:
              <input ref={photoField} type="file" />
            </label>
            <br />
            <input type="submit" value="Adicionar Carro" />
          </form>
        </section>
      )}

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
