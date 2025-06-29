package edu.cit.onlinegrocerysystem.repository;

import edu.cit.onlinegrocerysystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}