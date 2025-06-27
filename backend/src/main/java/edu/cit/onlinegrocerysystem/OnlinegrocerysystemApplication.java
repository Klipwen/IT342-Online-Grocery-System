package edu.cit.onlinegrocerysystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import edu.cit.onlinegrocerysystem.model.Product;
import edu.cit.onlinegrocerysystem.repository.ProductRepository;

@SpringBootApplication
public class OnlinegrocerysystemApplication {
	public static void main(String[] args) {
		SpringApplication.run(OnlinegrocerysystemApplication.class, args);
	}

	// @Bean
	// CommandLineRunner runner(ProductRepository productRepository) {
	// return args -> {
	// if (productRepository.count() == 0) {
	// productRepository.save(new Product(
	// "Ligo Easy Open Can Sardines In Tomato Sauce 155g",
	// 150.00,
	// "Canned Goods",
	// 6,
	// "https://www.megaglobal.com.ph/wp-content/uploads/2021/09/MEGA-SARDINES-EZ-OPEN-155g.png",
	// 142.50,
	// 150.00,
	// "-5%"
	// ));
	// productRepository.save(new Product(
	// "Argentina Corned Beef 150g",
	// 90.00,
	// "Canned Goods",
	// 12,
	// "https://www.argentina.com.ph/wp-content/uploads/2020/07/Argentina-Corned-Beef-150g.png",
	// 85.00,
	// 90.00,
	// "-6%"
	// ));
	// productRepository.save(new Product(
	// "Century Tuna Flakes in Oil 180g",
	// 70.00,
	// "Canned Goods",
	// 8,
	// "https://www.centurytuna.ph/wp-content/uploads/2020/07/Century-Tuna-Flakes-in-Oil-180g.png",
	// 65.00,
	// 70.00,
	// "-7%"
	// ));
	// }
	// };
	// }
}
