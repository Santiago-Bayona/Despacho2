package co.edu.uniquindio.poo.Back;

public class Funcionario extends Persona{

    public String Rol;

    /**public Funcionario(String nombre, String cedula, int numero, String rol) {
        super(nombre, cedula, numero);
        Rol = rol;
    }*/

    public String getRol() {
        return Rol;
    }

    public void setRol(String rol) {
        Rol = rol;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "Rol='" + Rol + '\'' +
                '}';
    }
}
