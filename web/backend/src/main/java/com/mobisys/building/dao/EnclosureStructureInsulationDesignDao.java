package com.mobisys.building.dao;

import com.mobisys.building.entity.EnclosureStructureInsulationDesignInfo;

import java.util.List;

public interface EnclosureStructureInsulationDesignDao {
    /**
     * 按台站号查询围护结构保温设计表中的数据
     */
    List<EnclosureStructureInsulationDesignInfo> queryEnclosureStructureInsulationDesignById(int id);

    /**
     * 向围护结构保温设计表中插入新数据
     */
    boolean insertEnclosureStructureInsulationDesign(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo);


    boolean update_enclosure_structure_insulation_design(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo);
}
