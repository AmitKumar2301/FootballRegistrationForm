package com.task.registrationForm.form;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.validation.annotation.Validated;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;

@Entity
@Table
@Validated
@DynamicUpdate
public class FormData {


    @Id
//    @Column(nullable = false)
//    @Type(type = "org.hibernate.type.TextType")
    @NotBlank(message = "User name is require")
    @Column(updatable = false)
    private String uname;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z]+$", message = "Use alphabets only")
    private String fname;

    @Pattern(regexp = "^[A-Za-z]+$", message = "Use alphabets only")
    private String lname;

    @NotBlank(message = "Phone number is require")
    @Pattern(regexp = "^[1-9][0-9]{9}$", message = "Phone number should be 10 digit long")
    private String phone;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String ageGroup;

    @NotBlank
    private String desiredTeam;

    @NotBlank
    private String desiredPosition;

    private String address;

    @Pattern(regexp = "^[1-9][0-9]{5}$")
    private String pincode;

    public FormData() {
    }

    public FormData(String uname) {
        this.uname = uname;
    }

    public FormData(String uname,
                    String fname,
                    String lname,
                    String phone,
                    String email,
                    String ageGroup,
                    String desiredTeam,
                    String desiredPosition,
                    String address,
                    String pincode) {
        this.uname = uname;
        this.fname = fname;
        this.lname = lname;
        this.phone = phone;
        this.email = email;
        this.ageGroup = ageGroup;
        this.desiredTeam = desiredTeam;
        this.desiredPosition = desiredPosition;
        this.address = address;
        this.pincode = pincode;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAgeGroup() {
        return ageGroup;
    }

    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }

    public String getDesiredTeam() {
        return desiredTeam;
    }

    public void setDesiredTeam(String desiredTeam) {
        this.desiredTeam = desiredTeam;
    }

    public String getDesiredPosition() {
        return desiredPosition;
    }

    public void setDesiredPosition(String desiredPosition) {
        this.desiredPosition = desiredPosition;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    @Override
    public String toString() {
        return "FormData{" +
                "uname='" + uname + '\'' +
                ", fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", phone=" + phone +
                ", email='" + email + '\'' +
                ", ageGroup='" + ageGroup + '\'' +
                ", desiredTeam='" + desiredTeam + '\'' +
                ", desiredPosition='" + desiredPosition + '\'' +
                ", address='" + address + '\'' +
                ", pincode=" + pincode +
                '}';
    }
}
