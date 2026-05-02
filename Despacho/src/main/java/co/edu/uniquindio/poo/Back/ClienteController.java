package co.edu.uniquindio.poo.Back;

import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    private final Despacho despacho = DespachoSingleton.getInstancia();

    @GetMapping
    public Collection<co.edu.uniquindio.poo.Back.Cliente> listar() {
        return despacho.clientes;
    }

    @PostMapping
    public String agregar(@RequestBody co.edu.uniquindio.poo.Back.Cliente cliente) {
        boolean ok = despacho.agregarCliente(cliente);
        return ok ? "Cliente agregado" : "Cliente ya existe";
    }

    @PutMapping("/{cedula}")
    public String actualizar(@PathVariable String cedula, @RequestBody co.edu.uniquindio.poo.Back.Cliente actualizado) {
        boolean ok = despacho.actualizarCliente(cedula, actualizado);
        return ok ? "Cliente actualizado" : "Cliente no encontrado";
    }

    @DeleteMapping("/{cedula}")
    public String eliminar(@PathVariable String cedula) {
        for (co.edu.uniquindio.poo.Back.Cliente c : despacho.clientes) {
            if (c.getCedula().equals(cedula)) {
                despacho.clientes.remove(c);
                return "Cliente eliminado";
            }
        }
        return "Cliente no encontrado";
    }
}
