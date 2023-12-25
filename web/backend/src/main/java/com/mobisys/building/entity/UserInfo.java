package com.mobisys.building.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfo {
    private String phoneNum;
    private String userName;
    private String companyName;
    private String city;
    private String industry;
    private String information;
    private Integer type;
    private Integer role;
    private String pwd;
}
