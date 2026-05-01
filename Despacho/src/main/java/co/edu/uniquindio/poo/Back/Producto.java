package co.edu.uniquindio.poo.Back;

public class Producto {

    public double precio;
    public String nombre, idproducto;

    public Producto(double precio, String nombre, String idproducto) {
        this.precio = precio;
        this.nombre = nombre;
        this.idproducto = idproducto;
    }

    public String getIdproducto() {
        return idproducto;
    }

    public void setIdproducto(String idproducto) {
        this.idproducto = idproducto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Producto{" +
                "precio=" + precio +
                ", nombre='" + nombre + '\'' +
                ", idproducto='" + idproducto + '\'' +
                '}';
    }
}
