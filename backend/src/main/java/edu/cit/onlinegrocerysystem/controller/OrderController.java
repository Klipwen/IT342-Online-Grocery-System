package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.Order;
import edu.cit.onlinegrocerysystem.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
}