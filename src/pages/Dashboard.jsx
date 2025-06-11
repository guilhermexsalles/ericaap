import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../App.css';

// Menu fixo e estilizado ocupando todo o topo
function Menu() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> |{" "}
      <Link to="/entradas">Entradas</Link> |{" "}
      <Link to="/saidas">Saídas</Link>
    </nav>
  );
}

export default function Dashboard() {
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const baseURL = import.meta.env.DEV
      ? 'http://localhost:3000'
      : import.meta.env.VITE_API_URL;

    axios.get(`${baseURL}/api/transacoes`)
      .then((res) => {
        const transacoes = res.data;

        const entradas = transacoes
          .filter((t) => t.tipo === 'entrada')
          .reduce((acc, cur) => acc + Number(cur.valor), 0);

        const saidas = transacoes
          .filter((t) => t.tipo === 'saida')
          .reduce((acc, cur) => acc + Number(cur.valor), 0);

        setSaldo(entradas - saidas);
      })
      .catch((err) => console.error("Erro ao buscar transações:", err));
  }, []);

  return (
    <>
      <Menu />
      <div>
        <h1>Bem Vindo</h1>
        <div className="card">
          <p>Saldo: R$ {saldo.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
}
