package com.mobisys.building.service;

import com.mobisys.building.entity.TdocbInfo;

import java.util.List;


public interface TdocbService {
    List<TdocbInfo> getTdocbList();

    TdocbInfo getTdocbById(int id);

    boolean addTdocb(TdocbInfo tdocbInfo);
}
