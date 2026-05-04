package co.edu.uniquindio.poo.Back;

import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.LinkedList;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    private final Despacho despacho = DespachoSingleton.getInstancia();

    @GetMapping
    public Collection<Pedido> listar() {
        return despacho.pedidos;
    }

    @PostMapping
    public String agregar(@RequestBody PedidoRequest request) {
        Cliente cliente = null;
        for (Cliente c : despacho.clientes) {
            if (c.getCedula().equals(request.cedulaCliente)) {
                cliente = c;
                break;
            }
        }

        Funcionario funcionario = null;
        for (Funcionario f : despacho.funcionarios) {
            if (f.getCedula().equals(request.cedulaFuncionario)) {
                funcionario = f;
                break;
            }
        }

        if (cliente == null || funcionario == null) {
            return "Cliente o funcionario no encontrado";
        }

        LinkedList<Producto> productos = new LinkedList<>();
        for (String idProducto : request.idsProductos) {
            for (Producto p : despacho.productos) {
                if (p.getIdproducto().equals(idProducto)) {
                    productos.add(p);
                    break;
                }
            }
        }

        Pedido pedido = new Pedido(cliente, request.idpedido, funcionario,
                0, Pedido.Estado.REGISTRADO, productos, LocalDate.now());
        pedido.setProductos(productos);
        pedido.CalcularCantidad();
        pedido.calcularPrecio();

        boolean ok = despacho.RegistrarPedido(pedido);
        return ok ? "Pedido registrado" : "El pedido ya existe";
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable String id) {
        for (Pedido p : despacho.pedidos) {
            if (p.getIdpedido().equals(id)) {
                despacho.pedidos.remove(p);
                return "Pedido eliminado";
            }
        }
        return "Pedido no encontrado";
    }

    @PutMapping("/{id}/estado")
    public String cambiarEstado(@PathVariable String id, @RequestBody EstadoRequest estadoRequest) {
        for (Pedido p : despacho.pedidos) {
            if (p.getIdpedido().equals(id)) {
                p.setEstado(Pedido.Estado.valueOf(estadoRequest.estado));
                despacho.cancelarPedido(); // <- se ejecuta automáticamente
                return "Estado actualizado";
            }
        }
        return "Pedido no encontrado";
    }
}
