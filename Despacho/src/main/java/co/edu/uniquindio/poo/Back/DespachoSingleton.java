package co.edu.uniquindio.poo.Back;

public class DespachoSingleton {
    private static Despacho instancia;

    public static Despacho getInstancia() {
        if (instancia == null) {
            instancia = new Despacho("Central");
        }
        return instancia;
    }
}
