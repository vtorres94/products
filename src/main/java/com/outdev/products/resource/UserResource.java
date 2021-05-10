package com.outdev.products.resource;

import com.outdev.products.service.RegistrationService;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping(path = "/api/users")
@AllArgsConstructor
public class UserResource {

    private RegistrationService registrationService;
    
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
}