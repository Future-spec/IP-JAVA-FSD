package com.example.company;

import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.boot.SpringApplication;

class CompanyApplicationMainTests {

	@Test
	void mainDelegatesToSpringApplicationWithProvidedArguments() {
		String[] args = {CompanyApplication.class.getName()};

		try (MockedStatic<SpringApplication> springApplication = Mockito.mockStatic(SpringApplication.class)) {
			CompanyApplication.main(args);
			springApplication.verify(() -> SpringApplication.run(CompanyApplication.class, args));
		}
	}
}