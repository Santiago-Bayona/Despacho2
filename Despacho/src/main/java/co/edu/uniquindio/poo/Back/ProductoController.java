package co.edu.uniquindio.poo.Back;

import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductoController {

    private final Despacho despacho = DespachoSingleton.getInstancia();

    @GetMapping
    public Collection<Producto> listar() {
        return despacho.productos;
    }

    @PostMapping
    public String agregar(@RequestBody Producto producto) {
        boolean ok = despacho.agregarProducto(producto);
        return ok ? "Producto agregado" : "Producto ya existe";
    }

    @PutMapping("/{id}")
    public String actualizar(@PathVariable String id, @RequestBody Producto actualizado) {
        boolean ok = despacho.actualizarProducto(id, actualizado);
        return ok ? "Producto actualizado" : "Producto no encontrado";
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable String id) {
        for (Producto p : despacho.productos) {
            if (p.getIdproducto().equals(id)) {
                despacho.productos.remove(p);
                return "Producto eliminado";
            }
        }
        return "Producto no encontrado";
    }
}