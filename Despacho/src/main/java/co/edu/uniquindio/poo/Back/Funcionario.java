package co.edu.uniquindio.poo.Back;

public class Funcionario extends Persona{

    public String rol;

    /**public Funcionario(String nombre, String cedula, int numero, String rol) {
        super(nombre, cedula, numero);
        Rol = rol;
    }*/

    public Funcionario(){}

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        rol = rol;
    }

    @Override
    public String toString() {
        return "Funcionario{" +
                "Rol='" + rol + '\'' +
                '}';
    }
}
