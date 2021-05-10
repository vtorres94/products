package com.outdev.products.resource;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@ToString
public class RegistrationRequest {
    private String name;
    private String lastName;
    private String password;
    private String user;
}
