package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.Order;
import edu.cit.onlinegrocerysystem.model.OrderItem;
import edu.cit.onlinegrocerysystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {
        double calculatedTotal = 0.0;
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
                calculatedTotal += item.getPrice() * item.getQuantity();
            }
        }
        order.setTotalAmount(calculatedTotal);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}