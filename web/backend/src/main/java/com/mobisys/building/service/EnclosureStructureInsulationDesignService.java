package com.mobisys.building.service;

import com.mobisys.building.entity.EnclosureStructureInsulationDesignInfo;

import java.util.List;

public interface EnclosureStructureInsulationDesignService {
    /**
     * 按台站号查询围护结构保温设计表中数据
     */
    List<EnclosureStructureInsulationDesignInfo> getEnclosureStructureInsulationDesignById(int id);

    /**
     * 向围护结构保温设计表插入新数据
     */
    boolean addEnclosureStructureInsulationDesignService(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo);


    boolean update_enclosure_structure_insulation_design(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo);
}
