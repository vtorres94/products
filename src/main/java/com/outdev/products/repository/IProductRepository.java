package com.outdev.products.repository;

import com.outdev.products.domain.Product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductRepository extends JpaRepository<Product, Long>{
    
}
