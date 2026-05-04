package co.edu.uniquindio.poo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "co.edu.uniquindio.poo.Back")
public class DespachoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DespachoApplication.class, args);
	}
}
