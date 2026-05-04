package co.edu.uniquindio.poo.Back;

public class DespachoSingleton {
    private static Despacho instancia;

    public static Despacho getInstancia() {
        if (instancia == null) {
            instancia = new Despacho("Central");
            inicializarDatos(instancia);
        }
        return instancia;
    }

    private static void inicializarDatos(Despacho d) {

        Cliente c1 = new Cliente();
        c1.setNombre("Juan Pérez");
        c1.setCedula("123456");
        c1.setNumero(300111222);
        c1.setDireccion("Calle 1 #2-3");
        d.agregarCliente(c1);

        Cliente c2 = new Cliente();
        c2.setNombre("María López");
        c2.setCedula("654321");
        c2.setNumero(311222333);
        c2.setDireccion("Carrera 5 #10-20");
        d.agregarCliente(c2);

        // Funcionarios
        Funcionario f1 = new Funcionario();
        f1.setNombre("Carlos Ruiz");
        f1.setCedula("111222");
        f1.setNumero(320333444);
        f1.setRol("Despachador");
        d.agregarFuncionario(f1);

        Funcionario f2 = new Funcionario();
        f2.setNombre("Ana Torres");
        f2.setCedula("333444");
        f2.setNumero(315444555);
        f2.setRol("Coordinador");
        d.agregarFuncionario(f2);

        // Productos
        Producto p1 = new Producto();
        p1.setIdproducto("P001");
        p1.setNombre("Camiseta");
        p1.setPrecio(35000);
        d.agregarProducto(p1);

        Producto p2 = new Producto();
        p2.setIdproducto("P002");
        p2.setNombre("Pantalón");
        p2.setPrecio(75000);
        d.agregarProducto(p2);
    }
}
