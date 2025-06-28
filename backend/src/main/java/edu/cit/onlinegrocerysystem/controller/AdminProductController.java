package edu.cit.onlinegrocerysystem.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadsDir = System.getProperty("user.dir") + "/uploads/";
            Path uploadPath = Paths.get(uploadsDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String originalFilename = file.getOriginalFilename();
            String filename = System.currentTimeMillis() + "_" + originalFilename;
            Path filePath = uploadPath.resolve(filename);
            file.transferTo(filePath.toFile());
            String fileUrl = "http://localhost:8080/uploads/" + filename;
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("UPLOAD ERROR: " + e.getMessage());
            return ResponseEntity.badRequest().body("Image upload failed");
        }
    }

    // ... other admin endpoints ...
}