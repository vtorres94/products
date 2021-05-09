package com.outdev.products.service;

import java.util.List;
import java.util.Optional;

import com.outdev.products.domain.Product;

public interface IProductService {
    List<Product> findAll();

    Optional<Product> findById(Long id);

    Product create(Product product);
    
    Product update(Product product);

    void delete(Long id);
}
