import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8081/api/funcionarios";
const vacio = { nombre: "", cedula: "", numero: "", rol: "" };

export default function FuncionariosCrud() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);
    const [form, setForm] = useState(vacio);
    const [editandoCedula, setEditandoCedula] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => { cargar(); }, []);

    async function cargar() {
        const res = await fetch(API);
        setFuncionarios(await res.json());
    }

    function mostrarMensaje(texto, tipo = "success") {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 3000);
    }

    async function guardar() {
        const funcionario = { ...form, numero: parseInt(form.numero) };
        if (!funcionario.nombre || !funcionario.cedula || !funcionario.rol) {
            mostrarMensaje("Por favor completa todos los campos.", "error");
            return;
        }
        if (editandoCedula) {
            await fetch(`${API}/${editandoCedula}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funcionario),
            });
            mostrarMensaje("Funcionario actualizado.");
        } else {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(funcionario),
            });
            mostrarMensaje("Funcionario agregado.");
        }
        setForm(vacio);
        setEditandoCedula(null);
        cargar();
    }

    async function eliminar(cedula) {
        if (!confirm("¿Eliminar este funcionario?")) return;
        await fetch(`${API}/${cedula}`, { method: "DELETE" });
        mostrarMensaje("Funcionario eliminado.");
        cargar();
    }

    function editar(f) {
        setForm(f);
        setEditandoCedula(f.cedula);
    }

    return (
        <div style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>

            <button onClick={() => navigate("/")}
                style={{ marginBottom: "1rem", padding: "6px 16px", cursor: "pointer" }}>
                ← Volver
            </button>

            <h2>Gestión de Funcionarios</h2>

            {mensaje && (
                <div style={{
                    background: mensaje.tipo === "success" ? "#d4edda" : "#f8d7da",
                    padding: "10px", borderRadius: 6, marginBottom: 12
                }}>
                    {mensaje.texto}
                </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {["nombre", "cedula", "numero", "rol"].map((campo) => (
                    <input key={campo}
                        placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                        value={form[campo]}
                        onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
                        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }} />
                ))}
            </div>

            <button onClick={guardar}
                style={{ marginRight: 8, padding: "8px 20px", cursor: "pointer" }}>
                {editandoCedula ? "Guardar cambios" : "Agregar funcionario"}
            </button>

            {editandoCedula && (
                <button onClick={() => { setForm(vacio); setEditandoCedula(null); }}
                    style={{ padding: "8px 20px", cursor: "pointer" }}>
                    Cancelar
                </button>
            )}

            <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {["Nombre", "Cédula", "Teléfono", "Rol", "Acciones"].map(h => (
                            <th key={h} style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid #ddd" }}>
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {funcionarios.map((f) => (
                        <tr key={f.cedula}>
                            <td style={{ padding: "8px 12px" }}>{f.nombre}</td>
                            <td style={{ padding: "8px 12px" }}>{f.cedula}</td>
                            <td style={{ padding: "8px 12px" }}>{f.numero}</td>
                            <td style={{ padding: "8px 12px" }}>{f.rol}</td>
                            <td style={{ padding: "8px 12px" }}>
                                <button onClick={() => editar(f)} style={{ marginRight: 6, cursor: "pointer" }}>
                                    Editar
                                </button>
                                <button onClick={() => eliminar(f.cedula)} style={{ cursor: "pointer" }}>
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