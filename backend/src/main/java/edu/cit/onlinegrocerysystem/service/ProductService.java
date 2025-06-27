package edu.cit.onlinegrocerysystem.service;

import edu.cit.onlinegrocerysystem.model.Product;
import edu.cit.onlinegrocerysystem.repository.ProductRepository;
import org.springframework.stereotype.Service;

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

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
