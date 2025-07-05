package edu.cit.onlinegrocerysystem.model;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "delivery_order")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeliveryOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long orderId;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long deliveryPersonId;

    @Column(nullable = false)
    private String deliveryAddress;

    private LocalDateTime deliveryDate;
    private LocalDateTime pickupTime;

    @Column(nullable = false)
    private String deliveryStatus; // Pending, In Transit, Delivered, Failed

    private LocalDateTime deliveryTime;
    private String remarks;
} 