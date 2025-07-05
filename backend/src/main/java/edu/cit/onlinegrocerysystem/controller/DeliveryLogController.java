package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.DeliveryLog;
import edu.cit.onlinegrocerysystem.service.DeliveryLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery-log")
public class DeliveryLogController {
    @Autowired
    private DeliveryLogService deliveryLogService;

    @PostMapping
    public ResponseEntity<DeliveryLog> addLog(@RequestBody DeliveryLog log) {
        return ResponseEntity.ok(deliveryLogService.addLog(log));
    }

    @GetMapping("/{deliveryOrderId}")
    public ResponseEntity<List<DeliveryLog>> getLogsForOrder(@PathVariable Long deliveryOrderId) {
        return ResponseEntity.ok(deliveryLogService.getLogsForOrder(deliveryOrderId));
    }
} 