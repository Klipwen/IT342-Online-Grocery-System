package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.DeliveryPerson;
import edu.cit.onlinegrocerysystem.repository.DeliveryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = "*")
public class DeliveryLoginController {

    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public DeliveryPerson login(@RequestBody DeliveryPerson loginRequest) {
        DeliveryPerson existing = deliveryPersonRepository.findByEmail(loginRequest.getEmail());

        if (existing != null &&
                !Boolean.TRUE.equals(existing.getDeleted()) &&
                passwordEncoder.matches(loginRequest.getPassword(), existing.getPassword())) {
            return existing;
        }

        throw new RuntimeException("Invalid email or password");
    }
}
