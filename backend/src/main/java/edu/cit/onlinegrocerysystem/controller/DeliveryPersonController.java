package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.DeliveryPerson;
import edu.cit.onlinegrocerysystem.service.DeliveryPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = "*")
public class DeliveryPersonController {
    @Autowired
    private DeliveryPersonService deliveryPersonService;

    @PostMapping
    public ResponseEntity<DeliveryPerson> addDeliveryPerson(@RequestBody DeliveryPerson deliveryPerson) {
        return ResponseEntity.ok(deliveryPersonService.addDeliveryPerson(deliveryPerson));
    }

    @GetMapping
    public ResponseEntity<List<DeliveryPerson>> getAllDeliveryPersons() {
        return ResponseEntity.ok(deliveryPersonService.getAllDeliveryPersons());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryPerson> updateDeliveryPerson(@PathVariable Long id, @RequestBody DeliveryPerson updated) {
        return ResponseEntity.ok(deliveryPersonService.updateDeliveryPerson(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteDeliveryPerson(@PathVariable Long id) {
        deliveryPersonService.softDeleteDeliveryPerson(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/register")
    public ResponseEntity<DeliveryPerson> register(@RequestBody DeliveryPerson deliveryPerson) {
        DeliveryPerson created = deliveryPersonService.registerDeliveryPerson(deliveryPerson);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/login-password")
    public ResponseEntity<DeliveryPerson> loginByPassword(@RequestBody DeliveryPerson loginRequest) {
        DeliveryPerson dp = deliveryPersonService.loginDeliveryPersonByPassword(loginRequest.getPassword());
        if (dp != null) {
            return ResponseEntity.ok(dp);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
} 