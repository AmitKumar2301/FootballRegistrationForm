package com.task.registrationForm.form;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.validation.Valid;
import java.util.List;

@Configuration
public class FormDataConfig {

    @Bean
    CommandLineRunner commandLineRunner(
            FormRepository formRepository
    )
    {
        return args -> {
            FormData amit1 = new FormData(
                    "amit1",
                    "Amit",
                    "Kumar",
                    "8946895471",
                    "amit@amit.com",
                    "14-20",
                    "Chelsia",
                    "offensive",
                    "102,ynr",
                    "135001"
            );

            formRepository.saveAll(
                    List.of(amit1)
            );
        };
    }
}
