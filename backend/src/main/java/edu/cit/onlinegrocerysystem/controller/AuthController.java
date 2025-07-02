package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.User;
import edu.cit.onlinegrocerysystem.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(
                userRepository.findAll().stream().map(user -> {
                    java.util.Map<String, Object> map = new java.util.HashMap<>();
                    map.put("id", user.getId());
                    map.put("name", user.getName());
                    map.put("email", user.getEmail());
                    return map;
                }).toList());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("id", user.getId());
        map.put("name", user.getName());
        map.put("email", user.getEmail());
        map.put("role", "user"); // or user.getRole() if you add a role field
        return ResponseEntity.ok(map);
    }
}