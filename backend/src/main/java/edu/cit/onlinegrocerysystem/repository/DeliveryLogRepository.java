package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.DeliveryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryLogRepository extends JpaRepository<DeliveryLog, Long> {
    List<DeliveryLog> findByDeliveryOrderIdOrderByTimestampAsc(Long deliveryOrderId);
} 