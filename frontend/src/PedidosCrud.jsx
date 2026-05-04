import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_PEDIDOS = "http://localhost:8081/api/pedidos";
const API_CLIENTES = "http://localhost:8081/api/clientes";
const API_FUNCIONARIOS = "http://localhost:8081/api/funcionarios";
const API_PRODUCTOS = "http://localhost:8081/api/productos";

const ESTADOS = ["REGISTRADO", "EN_PROCESO", "DESPACHADO", "ENTREGADO", "CANCELADO"];

export default function PedidosCrud() {
    const navigate = useNavigate();

    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [funcionarios, setFuncionarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState(null);

    const [idpedido, setIdpedido] = useState("");
    const [cedulaCliente, setCedulaCliente] = useState("");
    const [cedulaFuncionario, setCedulaFuncionario] = useState("");
    const [idsProductos, setIdsProductos] = useState([]);

    useEffect(() => {
        cargarTodo();
    }, []);

    async function cargarTodo() {
        const [p, c, f, pr] = await Promise.all([
            fetch(API_PEDIDOS).then(r => r.json()),
            fetch(API_CLIENTES).then(r => r.json()),
            fetch(API_FUNCIONARIOS).then(r => r.json()),
            fetch(API_PRODUCTOS).then(r => r.json()),
        ]);
        setPedidos(p);
        setClientes(c);
        setFuncionarios(f);
        setProductos(pr);
    }

    function mostrarMensaje(texto, tipo = "success") {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 3000);
    }

    function toggleProducto(id) {
        setIdsProductos(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    }

    async function guardar() {
        if (!idpedido || !cedulaCliente || !cedulaFuncionario || idsProductos.length === 0) {
            mostrarMensaje("Completa todos los campos y selecciona al menos un producto.", "error");
            return;
        }
        const res = await fetch(API_PEDIDOS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idpedido, cedulaCliente, cedulaFuncionario, idsProductos }),
        });
        const texto = await res.text();
        mostrarMensaje(texto);
        setIdpedido("");
        setCedulaCliente("");
        setCedulaFuncionario("");
        setIdsProductos([]);
        cargarTodo();
    }

    async function eliminar(id) {
        if (!confirm("¿Eliminar este pedido?")) return;
        await fetch(`${API_PEDIDOS}/${id}`, { method: "DELETE" });
        mostrarMensaje("Pedido eliminado.");
        cargarTodo();
    }

    async function cambiarEstado(id, estado) {
        await fetch(`${API_PEDIDOS}/${id}/estado`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado }),
        });
        mostrarMensaje("Estado actualizado.");
        cargarTodo();
    }

    const estiloTh = { textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #ddd", fontSize: 13 };
    const estiloTd = { padding: "8px 12px", fontSize: 13 };
    const estiloInput = { padding: 8, borderRadius: 6, border: "1px solid #ccc", width: "100%" };
    const estiloSeccion = { marginBottom: "1.5rem" };
    const estiloLabel = { fontSize: 13, color: "#555", marginBottom: 4, display: "block" };

    return (
        <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>

            <button onClick={() => navigate("/")}
                style={{ marginBottom: "1rem", padding: "6px 16px", cursor: "pointer" }}>
                ← Volver
            </button>

            <h2>Gestión de Pedidos</h2>

            {mensaje && (
                <div style={{
                    background: mensaje.tipo === "success" ? "#d4edda" : "#f8d7da",
                    padding: "10px", borderRadius: 6, marginBottom: 16
                }}>
                    {mensaje.texto}
                </div>
            )}

            {/* ID del pedido */}
            <div style={estiloSeccion}>
                <label style={estiloLabel}>ID del pedido</label>
                <input placeholder="Ej: PED001" value={idpedido}
                    onChange={e => setIdpedido(e.target.value)}
                    style={{ ...estiloInput, maxWidth: 300 }} />
            </div>

            {/* Seleccionar Cliente */}
            <div style={estiloSeccion}>
                <label style={estiloLabel}>Selecciona un cliente</label>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd", borderRadius: 6 }}>
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th style={estiloTh}>Seleccionar</th>
                            <th style={estiloTh}>Nombre</th>
                            <th style={estiloTh}>Cédula</th>
                            <th style={estiloTh}>Dirección</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(c => (
                            <tr key={c.cedula}
                                onClick={() => setCedulaCliente(c.cedula)}
                                style={{ cursor: "pointer", background: cedulaCliente === c.cedula ? "#d4edda" : "white" }}>
                                <td style={estiloTd}>
                                    <input type="radio" readOnly checked={cedulaCliente === c.cedula} />
                                </td>
                                <td style={estiloTd}>{c.nombre}</td>
                                <td style={estiloTd}>{c.cedula}</td>
                                <td style={estiloTd}>{c.direccion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Seleccionar Funcionario */}
            <div style={estiloSeccion}>
                <label style={estiloLabel}>Selecciona un funcionario</label>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th style={estiloTh}>Seleccionar</th>
                            <th style={estiloTh}>Nombre</th>
                            <th style={estiloTh}>Cédula</th>
                            <th style={estiloTh}>Rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funcionarios.map(f => (
                            <tr key={f.cedula}
                                onClick={() => setCedulaFuncionario(f.cedula)}
                                style={{ cursor: "pointer", background: cedulaFuncionario === f.cedula ? "#d4edda" : "white" }}>
                                <td style={estiloTd}>
                                    <input type="radio" readOnly checked={cedulaFuncionario === f.cedula} />
                                </td>
                                <td style={estiloTd}>{f.nombre}</td>
                                <td style={estiloTd}>{f.cedula}</td>
                                <td style={estiloTd}>{f.rol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Seleccionar Productos (múltiple) */}
            <div style={estiloSeccion}>
                <label style={estiloLabel}>
                    Selecciona productos <span style={{ color: "#888" }}>(puedes elegir varios)</span>
                </label>
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th style={estiloTh}>Seleccionar</th>
                            <th style={estiloTh}>ID</th>
                            <th style={estiloTh}>Nombre</th>
                            <th style={estiloTh}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(p => (
                            <tr key={p.idproducto}
                                onClick={() => toggleProducto(p.idproducto)}
                                style={{ cursor: "pointer", background: idsProductos.includes(p.idproducto) ? "#d4edda" : "white" }}>
                                <td style={estiloTd}>
                                    <input type="checkbox" readOnly checked={idsProductos.includes(p.idproducto)} />
                                </td>
                                <td style={estiloTd}>{p.idproducto}</td>
                                <td style={estiloTd}>{p.nombre}</td>
                                <td style={estiloTd}>${p.precio.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {idsProductos.length > 0 && (
                    <p style={{ marginTop: 8, fontSize: 13, color: "#555" }}>
                        {idsProductos.length} producto(s) seleccionado(s)
                    </p>
                )}
            </div>

            <button onClick={guardar}
                style={{ padding: "10px 24px", cursor: "pointer", marginBottom: "2rem" }}>
                Registrar pedido
            </button>

            {/* Tabla de pedidos registrados */}
            <h3 style={{ marginBottom: 12 }}>Pedidos registrados</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {["ID", "Cliente", "Funcionario", "Productos", "Total", "Estado", "Acciones"].map(h => (
                            <th key={h} style={estiloTh}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(p => (
                        <tr key={p.idpedido}>
                            <td style={estiloTd}>{p.idpedido}</td>
                            <td style={estiloTd}>{p.cliente?.nombre}</td>
                            <td style={estiloTd}>{p.funcionario?.nombre}</td>
                            <td style={estiloTd}>{p.productos?.map(pr => pr.nombre).join(", ")}</td>
                            <td style={estiloTd}>${p.precioUnitario?.toLocaleString()}</td>
                            <td style={estiloTd}>
                                <select value={p.estado}
                                    onChange={e => cambiarEstado(p.idpedido, e.target.value)}
                                    style={{ padding: "4px 8px", borderRadius: 4 }}>
                                    {ESTADOS.map(e => (
                                        <option key={e} value={e}>{e}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={estiloTd}>
                                <button onClick={() => eliminar(p.idpedido)} style={{ cursor: "pointer" }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}