package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.DeliveryPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryPersonRepository extends JpaRepository<DeliveryPerson, Long> {

    // For login
    DeliveryPerson findByEmail(String email);

    // For listing active accounts (not soft-deleted)
    List<DeliveryPerson> findByDeletedFalse();
}
