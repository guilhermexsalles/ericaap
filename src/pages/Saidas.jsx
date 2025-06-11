import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

// Menu reutilizável com estilo fixo
function Menu() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/entradas">Entradas</Link> |{" "}
      <Link to="/saidas">Saídas</Link>
    </nav>
  );
}

export default function Saidas() {
  const [saidas, setSaidas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const carregarSaidas = () => {
    axios.get("http://localhost:3000/api/transacoes")
      .then((res) => {
        const saidasFiltradas = res.data.filter((t) => t.tipo === 'saida');
        setSaidas(saidasFiltradas);
      })
      .catch((err) => console.error("Erro ao carregar saídas:", err));
  };

  useEffect(() => {
    carregarSaidas();
  }, []);

  const adicionarSaida = () => {
    if (!descricao || !valor) return;

    const nova = { descricao, valor: parseFloat(valor), tipo: "saida", data: new Date().toISOString().slice(0, 10) };
    axios.post("http://localhost:3000/api/transacoes", nova)
      .then(() => {
        carregarSaidas();
        setDescricao("");
        setValor("");
      })
      .catch((err) => console.error("Erro ao adicionar saída:", err));
  };

  const removerSaida = (id) => {
    axios.delete(`http://localhost:3000/api/transacoes/${id}`)
      .then(() => carregarSaidas())
      .catch((err) => console.error("Erro ao remover saída:", err));
  };

  return (
    <div>
      <Menu />

      <h1>Saídas</h1>

      <div className="card">
        <input
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button onClick={adicionarSaida}>Adicionar</button>
      </div>

      <div className="card">
        <ul>
          {saidas.map((s) => (
            <li key={s.id}>
              {s.descricao} - R$ {(parseFloat(s.valor) || 0).toFixed(2)}
              <button onClick={() => removerSaida(s.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
