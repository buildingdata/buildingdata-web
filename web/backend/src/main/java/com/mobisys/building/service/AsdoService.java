package com.mobisys.building.service;

import com.mobisys.building.entity.AsdoInfo;
import com.mobisys.building.entity.OcpedidInfo;

import java.util.List;

public interface AsdoService {

    List<AsdoInfo> getAsdoList();

    List<AsdoInfo> getAsdoById(int id);
    List<AsdoInfo> getAsdoByIT(int id,int time,int type);

    boolean addAsdoFromTable_1(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_1(AsdoInfo asdoInfo);

    boolean addAsdoFromTable_2(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_2(AsdoInfo asdoInfo);


    boolean addAsdoFromTable_3(AsdoInfo asdoInfo);
    boolean updateAsdoFromTable_3(AsdoInfo asdoInfo);
}
