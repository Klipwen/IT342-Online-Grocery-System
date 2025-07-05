package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.DeliveryOrder;
import edu.cit.onlinegrocerysystem.repository.DeliveryOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryOrderService {
    @Autowired
    private DeliveryOrderRepository deliveryOrderRepository;

    public DeliveryOrder assignDelivery(DeliveryOrder deliveryOrder) {
        deliveryOrder.setDeliveryStatus("Pending");
        return deliveryOrderRepository.save(deliveryOrder);
    }

    public Optional<DeliveryOrder> getDeliveryOrder(Long id) {
        return deliveryOrderRepository.findById(id);
    }

    public DeliveryOrder updateDeliveryOrder(Long id, DeliveryOrder updated) {
        return deliveryOrderRepository.findById(id).map(existing -> {
            existing.setDeliveryPersonId(updated.getDeliveryPersonId());
            existing.setDeliveryAddress(updated.getDeliveryAddress());
            existing.setDeliveryDate(updated.getDeliveryDate());
            existing.setPickupTime(updated.getPickupTime());
            existing.setDeliveryStatus(updated.getDeliveryStatus());
            existing.setDeliveryTime(updated.getDeliveryTime());
            existing.setRemarks(updated.getRemarks());
            return deliveryOrderRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Delivery order not found"));
    }

    public List<DeliveryOrder> getOrdersByUser(Long userId) {
        return deliveryOrderRepository.findByUserId(userId);
    }

    public List<DeliveryOrder> getOrdersByDeliveryPerson(Long deliveryPersonId) {
        return deliveryOrderRepository.findByDeliveryPersonId(deliveryPersonId);
    }
} 