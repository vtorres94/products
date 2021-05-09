package com.outdev.products.service;

import java.util.List;
import java.util.Optional;

import com.outdev.products.domain.Product;
import com.outdev.products.repository.IProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {

    @Autowired
    private IProductRepository productRepository;
    
    @Override
    public List<Product> findAll() {
        // TODO Auto-generated method stub
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        // TODO Auto-generated method stub
        return productRepository.findById(id);
    }

    @Override
    public Product create(Product product) {
        // TODO Auto-generated method stub
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        // TODO Auto-generated method stub
        return productRepository.save(product);
    }

    @Override
    public void delete(Long id) {
        // TODO Auto-generated method stub
        productRepository.deleteById(id);
        
    }
    
}
