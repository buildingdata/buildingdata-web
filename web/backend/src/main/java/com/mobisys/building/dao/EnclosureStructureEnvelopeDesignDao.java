package com.mobisys.building.dao;

import com.mobisys.building.entity.EnclosureStructureEnvelopeDesignInfo;

import java.util.List;

public interface EnclosureStructureEnvelopeDesignDao {
    /**
     * 按台站号查询围护结构隔热设计表中的数据
     */
    List<EnclosureStructureEnvelopeDesignInfo> queryEnclosureStructureEnvelopeDesignById(int id);

    /**
     * 向围护结构隔热设计表中插入新数据
     */
    boolean insertEnclosureStructureEnvelopeDesign(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo);


    boolean update_enclosure_structure_envelope_design(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo);


}
