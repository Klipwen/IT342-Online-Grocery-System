package edu.cit.onlinegrocerysystem.controller;

import edu.cit.onlinegrocerysystem.model.CartItem;
import edu.cit.onlinegrocerysystem.model.Product;
import edu.cit.onlinegrocerysystem.repository.CartItemRepository;
import edu.cit.onlinegrocerysystem.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    private final CartItemRepository repo;
    private final ProductRepository productRepo;

    public CartController(CartItemRepository repo, ProductRepository productRepo) {
        this.repo = repo;
        this.productRepo = productRepo;
    }

    @GetMapping("/{userId}")
    public List<Map<String, Object>> getCart(@PathVariable Long userId) {
        List<CartItem> cartItems = repo.findByUserId(userId);
        return cartItems.stream().map(item -> {
            Product product = productRepo.findById(item.getProductId()).orElse(null);
            Map<String, Object> map = new HashMap<>();
            map.put("id", item.getProductId());
            map.put("quantity", item.getQuantity());
            if (product != null) {
                map.put("name", product.getName());
                map.put("price", product.getPrice());
                map.put("category", product.getCategory());
                map.put("image", product.getImage());
                map.put("salePrice", product.getSalePrice());
                map.put("originalPrice", product.getOriginalPrice());
                map.put("discount", product.getDiscount());
                map.put("bestSelling", product.isBestSelling());
                map.put("variants", product.getVariants());
                map.put("sizes", product.getSizes());
            }
            return map;
        }).collect(Collectors.toList());
    }

    @PostMapping("/{userId}")
    public CartItem addOrUpdateCartItem(@PathVariable Long userId, @RequestBody CartItem item) {
        // Check if item already exists for user+product, update quantity if so
        List<CartItem> existing = repo.findByUserId(userId);
        for (CartItem ci : existing) {
            if (ci.getProductId().equals(item.getProductId())) {
                ci.setQuantity(item.getQuantity());
                return repo.save(ci);
            }
        }
        item.setUserId(userId);
        return repo.save(item);
    }

    @DeleteMapping("/{userId}/{productId}")
    public void removeCartItem(@PathVariable Long userId, @PathVariable Long productId) {
        List<CartItem> items = repo.findByUserId(userId);
        for (CartItem ci : items) {
            if (ci.getProductId().equals(productId)) {
                repo.delete(ci);
                break;
            }
        }
    }

    @DeleteMapping("/{userId}")
    public void clearCart(@PathVariable Long userId) {
        repo.deleteByUserId(userId);
    }
}