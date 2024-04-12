package com.mobisys.building.dao;

import com.mobisys.building.entity.TransparentEnclosureStructureInsulationDesignInfo;

import java.util.List;

public interface TransparentEnclosureStructureInsulationDesignDao {
    /**
     * 按台站号查询透明围护结构保温设计表中的数据
     */
    List<TransparentEnclosureStructureInsulationDesignInfo> queryTransparentEnclosureStructureInsulationDesignById(int id);

    /**
     * 向透明围护结构保温设计表中插入新数据
     */
    boolean insertTransparentEnclosureStructureInsulationDesign(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo);


    boolean update_transparent_enclosure_structure_insulation_design(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo);
}
