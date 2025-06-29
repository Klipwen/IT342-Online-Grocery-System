package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.Product;
import edu.cit.onlinegrocerysystem.service.ProductService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

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
            String fileUrl = "http://localhost:8081/uploads/" + filename;
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("UPLOAD ERROR: " + e.getMessage());
            return ResponseEntity.badRequest().body("Image upload failed");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product result = productService.updateProductWithImage(id, updatedProduct);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        Product product = productService.getById(id);
        if (product != null) {
            // Delete the image file if it exists
            if (product.getImage() != null && !product.getImage().isEmpty()) {
                try {
                    String imageUrl = product.getImage();
                    String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                    String uploadsDir = System.getProperty("user.dir") + "/uploads/";
                    File imageFile = new File(uploadsDir + filename);
                    if (imageFile.exists()) {
                        imageFile.delete();
                    }
                } catch (Exception e) {
                    System.out.println("Error deleting image file: " + e.getMessage());
                }
            }
            productService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // ... other admin endpoints ...
}