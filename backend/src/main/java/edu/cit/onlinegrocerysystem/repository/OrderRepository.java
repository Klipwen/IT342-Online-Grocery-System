package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
} 