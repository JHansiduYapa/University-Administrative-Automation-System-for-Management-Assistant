package com.example.ARManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ArManagementApplication {
	public static void main(String[] args) {
		SpringApplication.run(ArManagementApplication.class, args);
	}

}
