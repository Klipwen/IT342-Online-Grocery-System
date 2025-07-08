package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.DeliveryOrder;
import edu.cit.onlinegrocerysystem.service.DeliveryOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery-order")
@CrossOrigin(origins = "*")
public class DeliveryOrderController {
    @Autowired
    private DeliveryOrderService deliveryOrderService;

    @PostMapping
    public ResponseEntity<DeliveryOrder> assignDelivery(@RequestBody DeliveryOrder deliveryOrder) {
        return ResponseEntity.ok(deliveryOrderService.assignDelivery(deliveryOrder));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryOrder> getDeliveryOrder(@PathVariable Long id) {
        return deliveryOrderService.getDeliveryOrder(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryOrder> updateDeliveryOrder(@PathVariable Long id, @RequestBody DeliveryOrder updated) {
        return ResponseEntity.ok(deliveryOrderService.updateDeliveryOrder(id, updated));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<DeliveryOrder>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(deliveryOrderService.getOrdersByUser(userId));
    }

    @GetMapping("/rider/{deliveryPersonId}")
    public ResponseEntity<List<DeliveryOrder>> getOrdersByDeliveryPerson(@PathVariable Long deliveryPersonId) {
        return ResponseEntity.ok(deliveryOrderService.getOrdersByDeliveryPerson(deliveryPersonId));
    }
} 