package com.task.registrationForm.form;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping(path= "api/v1/formdata")
public class FormDataController {

    private final FormDataService formDataService;

    @Autowired
    public FormDataController(FormDataService formDataService) {
        this.formDataService = formDataService;
    }

    @GetMapping(path = "/{uname}")
    public ResponseEntity<Object> getFormData(@PathVariable("uname") String uname){
        return formDataService.getFormData(uname);
    }

    @PostMapping
    public ResponseEntity<Object> registerNewForm(@RequestBody FormData formData){
       return formDataService.addNewFormData(formData);
    }

    @PutMapping(path="/update/{uname}")
    public ResponseEntity<Object> updateFormData(
            @PathVariable("uname") String uname,
            @Valid @RequestBody FormData formData)
    {
       return formDataService.updateForm(uname, formData);
    }
}
