package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.Order;
import edu.cit.onlinegrocerysystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
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

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }
}