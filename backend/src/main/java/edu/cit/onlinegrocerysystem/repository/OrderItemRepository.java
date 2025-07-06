package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
} 