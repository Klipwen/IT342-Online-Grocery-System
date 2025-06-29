package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.Product;
import edu.cit.onlinegrocerysystem.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Product save(Product product) {
        return repository.save(product);
    }

    public Product update(Long id, Product updated) {
        Product existing = repository.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updated.getName());
            existing.setCategory(updated.getCategory());
            existing.setQuantity(updated.getQuantity());
            existing.setPrice(updated.getPrice());
            return repository.save(existing);
        }
        return null;
    }

    public Product updateProductWithImage(Long id, Product updated) {
        Product existing = repository.findById(id).orElse(null);
        if (existing != null) {
            // If there's a new image and it's different from the current one, delete the
            // old image
            if (updated.getImage() != null && !updated.getImage().equals(existing.getImage())) {
                // Delete the old image file
                if (existing.getImage() != null && !existing.getImage().isEmpty()) {
                    try {
                        String imageUrl = existing.getImage();
                        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
                        String uploadsDir = System.getProperty("user.dir") + "/uploads/";
                        File imageFile = new File(uploadsDir + filename);
                        if (imageFile.exists()) {
                            imageFile.delete();
                            System.out.println("Deleted old image: " + filename);
                        }
                    } catch (Exception e) {
                        System.out.println("Error deleting old image file: " + e.getMessage());
                    }
                }
            }

            // Update all fields
            existing.setName(updated.getName());
            existing.setCategory(updated.getCategory());
            existing.setQuantity(updated.getQuantity());
            existing.setPrice(updated.getPrice());
            existing.setImage(updated.getImage());
            existing.setSalePrice(updated.getSalePrice());
            existing.setOriginalPrice(updated.getOriginalPrice());
            existing.setDiscount(updated.getDiscount());
            existing.setBestSelling(updated.isBestSelling());
            existing.setVariants(updated.getVariants());
            existing.setSizes(updated.getSizes());

            return repository.save(existing);
        }
        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
