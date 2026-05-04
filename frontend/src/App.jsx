import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ClientesCrud from "./ClientesCrud";
import FuncionariosCrud from "./FuncionariosCrud";
import ProductosCrud from "./ProductoCrud";
import PedidosCrud from "./PedidosCrud";

function Menu() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100vh", gap: "16px" }}>
      <h1>Despachador</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "200px" }}>
        <button onClick={() => navigate("/clientes")}>Cliente</button>
        <button onClick={() => navigate("/funcionarios")}>Funcionario</button>
        <button onClick={() => navigate("/productos")}>Producto</button>
        <button onClick={() => navigate("/pedidos")}>Pedido</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/clientes" element={<ClientesCrud />} />
        <Route path="/funcionarios" element={<FuncionariosCrud />} />
        <Route path="/productos" element={<ProductosCrud />} />
        <Route path="/pedidos" element={<PedidosCrud />} />
      </Routes>
    </BrowserRouter>
  );
}
