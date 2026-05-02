package co.edu.uniquindio.poo.Back;

import java.time.LocalDate;
import java.util.LinkedList;

public class Pedido {

    public String idpedido;
    public Cliente cliente;
    public Funcionario funcionario;
    public int cantidad;
    public double precioUnitario;
    public Estado estado;
    public LocalDate fecha;
    public LinkedList<Producto> Productos;

    public enum Estado {
        DESPACHADO, REGISTRADO, EN_PROCESO, ENTREGADO, CANCELADO
    }

    public Pedido(Cliente cliente, String idpedido, Funcionario funcionario, int cantidad, Estado estado, LinkedList productos, LocalDate fecha) {
        this.cliente = cliente;
        this.idpedido = idpedido;
        this.funcionario = funcionario;
        this.cantidad = 0;
        this.precioUnitario = 0.0;
        this.estado = estado;
        this.Productos = new LinkedList<>();
        this.fecha = fecha;
    }

    public String getIdpedido() {
        return idpedido;
    }

    public void setIdpedido(String idpedido) {
        this.idpedido = idpedido;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Estado getEstado() {
        return estado;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public LinkedList getProductos() {
        return Productos;
    }

    public void setProductos(LinkedList productos) {
        Productos = productos;
    }

    public double calcularPrecio() {
        double suma = 0.0;
        for (Producto p: Productos){
            suma += p.getPrecio();
        }
        this.precioUnitario = suma;
        return suma;
    }

    public int CalcularCantidad() {
        setCantidad(Productos.size());
        return cantidad;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idpedido='" + idpedido + '\'' +
                ", cliente=" + cliente +
                ", funcionario=" + funcionario +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                ", estado=" + estado +
                ", fecha=" + fecha +
                ", Productos=" + Productos +
                '}';
    }
}
