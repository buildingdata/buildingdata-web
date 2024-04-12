package com.mobisys.building.service;

import com.mobisys.building.entity.TransparentEnclosureStructureInsulationDesignInfo;

import java.util.List;

public interface TransparentEnclosureStructureInsulationDesignService {
    /**
     * 按台站号查询透明围护结构保温设计表中数据
     */
    List<TransparentEnclosureStructureInsulationDesignInfo> getTransparentEnclosureStructureInsulationDesignById(int id);

    /**
     * 向透明围护结构保温设计表插入新数据
     */
    boolean addTransparentEnclosureStructureInsulationDesign(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo);


    boolean update_transparent_enclosure_structure_insulation_design(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo);
}
