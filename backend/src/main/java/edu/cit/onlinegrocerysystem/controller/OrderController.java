package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.Order;
import edu.cit.onlinegrocerysystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.PUT, RequestMethod.DELETE})
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        System.out.println("Received order: " + order);
        return orderService.placeOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUserId(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    @GetMapping("/delivery-person/{deliveryPersonId}")
    public List<Order> getOrdersByDeliveryPersonId(@PathVariable Long deliveryPersonId) {
        return orderService.getOrdersByDeliveryPersonId(deliveryPersonId);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @PatchMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            order.setStatus(status.replaceAll("\"", "")); // Remove quotes if sent as JSON string
            return orderService.saveOrder(order);
        }
        return null;
    }

    @PatchMapping("/{id}/assign-delivery")
    public Order assignDelivery(@PathVariable Long id, @RequestBody Map<String, Object> request) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            Long deliveryPersonId = Long.valueOf(request.get("deliveryPersonId").toString());
            order.setDeliveryPersonId(deliveryPersonId);
            order.setDeliveryStatus("Assigned");
            return orderService.saveOrder(order);
        }
        return null;
    }

    @PostMapping("/{id}/accept-delivery")
    public Order acceptDelivery(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            order.setStatus("Out for Delivery");
            return orderService.saveOrder(order);
        }
        return null;
    }

    @PostMapping("/{id}/reject-delivery")
    public Order rejectDelivery(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            order.setStatus("Ready to Deliver");
            order.setDeliveryPersonId(null);
            order.setDeliveryStatus(null);
            return orderService.saveOrder(order);
        }
        return null;
    }

    @PostMapping("/{id}/complete-delivery")
    public ResponseEntity<?> completeDelivery(@PathVariable Long id) {
        try {
            System.out.println("Received request to complete delivery for order ID: " + id);
            Order order = orderService.getOrderById(id);
            if (order != null) {
                order.setStatus("Completed");
                order.setDeliveryStatus("Completed");
                Order saved = orderService.saveOrder(order);
                System.out.println("Order marked as completed: " + saved.getId());
                return ResponseEntity.ok(saved);
            } else {
                System.out.println("Order not found for ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/complete-delivery")
    public ResponseEntity<?> patchCompleteDelivery(@PathVariable Long id) {
        try {
            System.out.println("[PATCH] Received request to complete delivery for order ID: " + id);
            Order order = orderService.getOrderById(id);
            if (order != null) {
                order.setStatus("Completed");
                order.setDeliveryStatus("Completed");
                Order saved = orderService.saveOrder(order);
                System.out.println("Order marked as completed: " + saved.getId());
                return ResponseEntity.ok(saved);
            } else {
                System.out.println("Order not found for ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }
}