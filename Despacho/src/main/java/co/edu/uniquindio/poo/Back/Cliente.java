package co.edu.uniquindio.poo.Back;

public class Cliente extends Persona{

    public String direccion;

    public Cliente(String nombre, String cedula, int numero, String direccion) {
        super(nombre, cedula, numero);
        this.direccion = direccion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @Override
    public String toString() {
        return "Cliente{" +
                "direccion='" + direccion + '\'' +
                '}';
    }
}
