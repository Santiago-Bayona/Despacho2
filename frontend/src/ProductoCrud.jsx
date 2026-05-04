import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/api/productos";
const vacio = { nombre: "", idproducto: "", precio: "" };

export default function ProductoCrud() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState(vacio);
    const [editandoId, setEditandoId] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => { cargar(); }, []);

    async function cargar() {
        const res = await fetch(API);
        setProductos(await res.json());
    }

    function mostrarMensaje(texto, tipo = "success") {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 3000);
    }

    async function guardar() {
        const producto = { ...form, precio: parseFloat(form.precio) };
        if (!producto.nombre || !producto.idproducto || !producto.precio) {
            mostrarMensaje("Por favor completa todos los campos.", "error");
            return;
        }
        if (editandoId) {
            await fetch(`${API}/${editandoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });
            mostrarMensaje("Producto actualizado.");
        } else {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto),
            });
            mostrarMensaje("Producto agregado.");
        }
        setForm(vacio);
        setEditandoId(null);
        cargar();
    }

    async function eliminar(id) {
        if (!confirm("¿Eliminar este producto?")) return;
        await fetch(`${API}/${id}`, { method: "DELETE" });
        mostrarMensaje("Producto eliminado.");
        cargar();
    }

    function editar(p) {
        setForm(p);
        setEditandoId(p.idproducto);
    }

    return (
        <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>

            <button onClick={() => navigate("/")}
                style={{ marginBottom: "1rem", padding: "6px 16px", cursor: "pointer" }}>
                ← Volver
            </button>

            <h2>Gestión de Productos</h2>

            {mensaje && (
                <div style={{
                    background: mensaje.tipo === "success" ? "#d4edda" : "#f8d7da",
                    padding: "10px", borderRadius: 6, marginBottom: 12
                }}>
                    {mensaje.texto}
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
                <input placeholder="Nombre"
                    value={form.nombre}
                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
                <input placeholder="ID Producto"
                    value={form.idproducto}
                    onChange={(e) => setForm({ ...form, idproducto: e.target.value })}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
                <input placeholder="Precio" type="number"
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                    style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
            </div>

            <button onClick={guardar}
                style={{ marginRight: 8, padding: "8px 20px", cursor: "pointer" }}>
                {editandoId ? "Guardar cambios" : "Agregar producto"}
            </button>

            {editandoId && (
                <button onClick={() => { setForm(vacio); setEditandoId(null); }}
                    style={{ padding: "8px 20px", cursor: "pointer" }}>
                    Cancelar
                </button>
            )}

            <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {["ID", "Nombre", "Precio", "Acciones"].map(h => (
                            <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #ddd" }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.idproducto}>
                            <td style={{ padding: "8px 12px" }}>{p.idproducto}</td>
                            <td style={{ padding: "8px 12px" }}>{p.nombre}</td>
                            <td style={{ padding: "8px 12px" }}>${p.precio}</td>
                            <td style={{ padding: "8px 12px" }}>
                                <button onClick={() => editar(p)} style={{ marginRight: 6, cursor: "pointer" }}>
                                    Editar
                                </button>
                                <button onClick={() => eliminar(p.idproducto)} style={{ cursor: "pointer" }}>
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