package co.edu.uniquindio.poo.Back;

public class Persona {

    public String nombre, cedula;
    public int numero;

    /**public Persona(String nombre, String cedula, int numero) {
        this.nombre = nombre;
        this.cedula = cedula;
        this.numero = numero;
    }**/

    public Persona() {}

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public int getNumero() {
        return numero;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    @Override
    public String toString() {
        return "Persona{" +
                "nombre='" + nombre + '\'' +
                ", cedula='" + cedula + '\'' +
                ", numero=" + numero +
                '}';
    }
}
