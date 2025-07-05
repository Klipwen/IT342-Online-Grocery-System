package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
    List<DeliveryOrder> findByUserId(Long userId);
    List<DeliveryOrder> findByDeliveryPersonId(Long deliveryPersonId);
} 