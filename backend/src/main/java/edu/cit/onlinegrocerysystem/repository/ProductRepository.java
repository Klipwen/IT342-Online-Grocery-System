package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
