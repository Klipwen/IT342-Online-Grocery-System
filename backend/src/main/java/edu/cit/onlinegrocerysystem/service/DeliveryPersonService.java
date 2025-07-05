package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.DeliveryPerson;
import edu.cit.onlinegrocerysystem.repository.DeliveryPersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryPersonService {
    @Autowired
    private DeliveryPersonRepository deliveryPersonRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public DeliveryPerson addDeliveryPerson(DeliveryPerson deliveryPerson) {
        deliveryPerson.setStatus("Active");
        deliveryPerson.setDeleted(false);
        return deliveryPersonRepository.save(deliveryPerson);
    }

    public List<DeliveryPerson> getAllDeliveryPersons() {
        return deliveryPersonRepository.findByDeletedFalse();
    }

    public Optional<DeliveryPerson> getDeliveryPerson(Long id) {
        return deliveryPersonRepository.findById(id)
                .filter(dp -> !dp.getDeleted());
    }

    public DeliveryPerson updateDeliveryPerson(Long id, DeliveryPerson updated) {
        return deliveryPersonRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setEmail(updated.getEmail());
            existing.setStatus(updated.getStatus());
            return deliveryPersonRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Delivery person not found"));
    }

    public void softDeleteDeliveryPerson(Long id) {
        deliveryPersonRepository.findById(id).ifPresent(dp -> {
            dp.setDeleted(true);
            dp.setStatus("Inactive");
            deliveryPersonRepository.save(dp);
        });
    }

    public DeliveryPerson registerDeliveryPerson(DeliveryPerson deliveryPerson) {
        deliveryPerson.setStatus("Active");
        deliveryPerson.setDeleted(false);
        deliveryPerson.setPassword(passwordEncoder.encode(deliveryPerson.getPassword()));
        return deliveryPersonRepository.save(deliveryPerson);
    }

    public DeliveryPerson loginDeliveryPerson(String email, String rawPassword) {
        DeliveryPerson dp = deliveryPersonRepository.findByEmail(email);
        if (dp != null && !dp.getDeleted() && passwordEncoder.matches(rawPassword, dp.getPassword())) {
            return dp;
        }
        return null;
    }

    public DeliveryPerson loginDeliveryPersonByPassword(String rawPassword) {
        // Create a default delivery person if none exists
        createDefaultDeliveryPersonIfNeeded();
        
        List<DeliveryPerson> allDeliveryPersons = deliveryPersonRepository.findByDeletedFalse();
        for (DeliveryPerson dp : allDeliveryPersons) {
            if (passwordEncoder.matches(rawPassword, dp.getPassword())) {
                return dp;
            }
        }
        return null;
    }

    private void createDefaultDeliveryPersonIfNeeded() {
        String defaultEmail = "delivery@test.com";
        String defaultPassword = "delivery123";
        DeliveryPerson existing = deliveryPersonRepository.findByEmail(defaultEmail);
        if (existing == null) {
            DeliveryPerson defaultDeliveryPerson = DeliveryPerson.builder()
                .name("Test Delivery Person")
                .email(defaultEmail)
                .contactNumber("09123456789")
                .status("Active")
                .deleted(false)
                .password(passwordEncoder.encode(defaultPassword))
                .build();
            deliveryPersonRepository.save(defaultDeliveryPerson);
        } else {
            // Always update the password to the default
            existing.setPassword(passwordEncoder.encode(defaultPassword));
            existing.setStatus("Active");
            existing.setDeleted(false);
            deliveryPersonRepository.save(existing);
        }
    }
} 