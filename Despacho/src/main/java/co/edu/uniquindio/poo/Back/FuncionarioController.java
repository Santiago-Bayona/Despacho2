package co.edu.uniquindio.poo.Back;

import org.springframework.web.bind.annotation.*;
import java.util.Collection;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "http://localhost:5173")
public class FuncionarioController {

    private final Despacho despacho = DespachoSingleton.getInstancia();

    @GetMapping
    public Collection<Funcionario> listar() {
        return despacho.funcionarios;
    }

    @PostMapping
    public String agregar(@RequestBody Funcionario funcionario) {
        boolean ok = despacho.agregarFuncionario(funcionario);
        return ok ? "Funcionario agregado" : "Funcionario ya existe";
    }

    @PutMapping("/{cedula}")
    public String actualizar(@PathVariable String cedula, @RequestBody Funcionario actualizado) {
        boolean ok = despacho.actualizarFuncionario(cedula, actualizado);
        return ok ? "Funcionario actualizado" : "Funcionario no encontrado";
    }

    @DeleteMapping("/{cedula}")
    public String eliminar(@PathVariable String cedula) {
        for (Funcionario f : despacho.funcionarios) {
            if (f.getCedula().equals(cedula)) {
                despacho.funcionarios.remove(f);
                return "Funcionario eliminado";
            }
        }
        return "Funcionario no encontrado";
    }
}