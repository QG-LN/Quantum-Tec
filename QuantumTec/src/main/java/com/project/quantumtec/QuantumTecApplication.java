package com.project.quantumtec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QuantumTecApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuantumTecApplication.class, args);
    }

}
