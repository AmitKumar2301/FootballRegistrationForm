package com.task.registrationForm.form;

import com.task.registrationForm.response.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.constraints.Null;
import java.util.Objects;
import java.util.Optional;

@Service
public class FormDataService {
    private final FormRepository formRepository;

    @Autowired
    public FormDataService(FormRepository formRepository) {
        this.formRepository = formRepository;
    }


    public ResponseEntity<Object> getFormData(String uname) {
       Optional<FormData> optionalFormData = formRepository.findFormDataByUname(uname);
        return ResponseHandler.generateResponse("userdata", HttpStatus.OK, optionalFormData.get());
    }

    public ResponseEntity<Object> addNewFormData(FormData formData) {
        Optional<FormData> formDataOptional = formRepository
                .findFormDataByUname(formData.getUname());
        if(formDataOptional.isPresent()){
            throw new IllegalStateException("Uname taken");
        }
        formRepository.save(formData);
        return ResponseHandler.generateResponse("Successful",HttpStatus.CREATED, formData);
    }

    public ResponseEntity<Object> updateForm(String uname, FormData formData) {
        try {
            Optional<FormData> formDataOptional = formRepository.findFormDataByUname(uname);

            if(formDataOptional.isPresent() && Objects.equals(formData.getUname(), uname)){
                formData.setFname(formData.getFname());
                formData.setLname(formData.getLname());
                formData.setDialCode(formData.getDialCode());
                formData.setPhone(formData.getPhone());
                formData.setEmail(formData.getEmail());
                formData.setAddress(formData.getAddress());
                formData.setAgeGroup(formData.getAgeGroup());
                formData.setDesiredTeam(formData.getDesiredTeam());
                formData.setDesiredTeam(formData.getDesiredTeam());
                formData.setPincode(formData.getPincode());
                final FormData updateFormData = formRepository.save(formData);
                return ResponseHandler.generateResponse("Update", HttpStatus.OK,updateFormData);
            }else throw new IllegalStateException("Not Found user");
        } catch (Exception e) {
            return ResponseHandler.generateResponse(e.getMessage(),HttpStatus.NOT_FOUND, null);
        }
    }
}
