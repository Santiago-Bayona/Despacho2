package co.edu.uniquindio.poo.Back;

import java.util.Collection;
import java.util.LinkedList;

public class Despacho {

    public String nombre;
    public Collection<Pedido> pedidos;
    public Collection<Funcionario> funcionarios;
    public Collection<Cliente> clientes;
    public Collection<Producto> productos;

    public Despacho(String nombre) {
        this.nombre = nombre;
        this.pedidos = new LinkedList<>();
        this.funcionarios = new LinkedList<>();
        this.clientes = new LinkedList<>();
        this.productos = new LinkedList<>();
    }



    public boolean verificarCliente(String id) {
        for (Cliente c : clientes) {
            if (id.equals(c.getCedula())) {
                return false;
            }
        }
        return true;
    }

    public boolean agregarCliente(Cliente cliente) {
        boolean centinela = false;
        boolean esUnico = verificarCliente(cliente.getCedula());
        if (esUnico) {
            clientes.add(cliente);
            centinela = true;
            System.out.println("Cliente agregado exitosamente");
        } else {
            System.out.println("El Cliente ya existe");
        }
        return centinela;
    }


    public boolean eliminarCliente(Cliente cliente) {
        boolean centinela = false;
        boolean esUnico = !verificarCliente(cliente.getCedula());
        if (esUnico) {
            clientes.remove(cliente);
            centinela = true;
            System.out.println("Cliente eliminado exitosamente");
        } else {
            System.out.println("El cliente ya existe");
        }
        return centinela;
    }

    public boolean actualizarCliente(String cedula, Cliente actualizado) {
        boolean centinela = false;

        for (Cliente c : clientes) {
            if (c.getCedula().equals(cedula)) {
                c.setCedula(actualizado.getCedula());
                c.setNombre(actualizado.getNombre());
                c.setDireccion(actualizado.getDireccion());
                c.setNumero(actualizado.getNumero());
                centinela = true;
                break;
            }
        }
        return centinela;
    }

    public boolean verificarFuncionario(String id) {
        for (Funcionario f : funcionarios) {
            if (id.equals(f.getCedula())) {
                return false;
            }
        }
        return true;
    }

    public boolean agregarFuncionario(Funcionario funcionario) {
        boolean centinela = false;
        boolean esUnico = verificarFuncionario(funcionario.getCedula());
        if (esUnico) {
            funcionarios.add(funcionario);
            centinela = true;
            System.out.println("Funcionario agregado exitosamente");
        } else {
            System.out.println("El Fuancionario ya existe");
        }
        return centinela;
    }


    public boolean eliminarFuncionario(Funcionario funcionario) {
        boolean centinela = false;
        boolean esUnico = !verificarFuncionario(funcionario.getCedula());
        if (esUnico) {
            funcionarios.remove(funcionario);
            centinela = true;
            System.out.println("Funcionario eliminado exitosamente");
        } else {
            System.out.println("El funcionario ya existe");
        }
        return centinela;
    }

    public boolean actualizarFuncionario(String cedula, Funcionario actualizado) {
        boolean centinela = false;

        for (Funcionario f : funcionarios) {
            if (f.getCedula().equals(cedula)) {
                f.setCedula(actualizado.getCedula());
                f.setNombre(actualizado.getNombre());
                f.setRol(actualizado.getRol());
                f.setNumero(actualizado.getNumero());
                centinela = true;
                break;
            }
        }
        return centinela;
    }

    public boolean verificarProducto(String id) {
        for (Producto p : productos) {
            if (id.equals(p.getIdproducto())) {
                return false;
            }
        }
        return true;
    }

    public boolean agregarProducto(Producto producto) {
        boolean centinela = false;
        boolean esUnico = verificarProducto(producto.getIdproducto());
        if (esUnico) {
            productos.add(producto);
            centinela = true;
            System.out.println("producto agregado exitosamente");
        } else {
            System.out.println("El producto ya existe");
        }
        return centinela;
    }


    public boolean eliminarproducto(Producto producto) {
        boolean centinela = false;
        boolean esUnico = !verificarProducto(producto.getIdproducto());
        if (esUnico) {
            productos.remove(producto);
            centinela = true;
            System.out.println("producto eliminado exitosamente");
        } else {
            System.out.println("El producto ya existe");
        }
        return centinela;
    }

    public boolean actualizarProducto(String id, Producto actualizado) {
        boolean centinela = false;

        for (Producto c : productos) {
            if (c.getIdproducto().equals(id)) {
                c.setIdproducto(actualizado.getIdproducto());
                c.setNombre(actualizado.getNombre());
                c.setPrecio(actualizado.getPrecio());
                centinela = true;
                break;
            }
        }
        return centinela;
    }

    public boolean verificarPedido(String id) {
        for (Pedido pe : pedidos) {
            if (id.equals(pe.getIdpedido())) {
                return false;
            }
        }
        return true;
    }

    public boolean RegistrarPedido(Pedido pedido) {
        boolean centinela = false;
        boolean esUnico = verificarPedido(pedido.getIdpedido());
        if (esUnico) {
            pedidos.add(pedido);
            centinela = true;
            System.out.println("pedido agregado exitosamente");
        } else {
            System.out.println("El pedido ya existe");
        }
        return centinela;
    }


    public boolean eliminarPedido(Pedido pedido) {
        boolean centinela = false;
        boolean esUnico = !verificarPedido(pedido.getIdpedido());
        if (esUnico) {
            pedidos.remove(pedido);
            centinela = true;
            System.out.println("pedido eliminado exitosamente");
        } else {
            System.out.println("El pedido ya existe");
        }
        return centinela;
    }

    //

}
