package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.DeliveryOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface DeliveryOrderRepository extends JpaRepository<DeliveryOrder, Long> {
    List<DeliveryOrder> findByUserId(Long userId);

    List<DeliveryOrder> findByDeliveryPersonId(Long deliveryPersonId);

    @Modifying
    @Transactional
    @Query("DELETE FROM DeliveryOrder d WHERE d.userId = :userId")
    void deleteByUserId(Long userId);
}