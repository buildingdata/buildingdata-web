package com.mobisys.building.service;

import com.mobisys.building.entity.EnclosureStructureEnvelopeDesignInfo;

import java.util.List;

public interface EnclosureStructureEnvelopeDesignService {
    /**
     * 按台站号查询围护结构隔热设计表中数据
     */
    List<EnclosureStructureEnvelopeDesignInfo> getEnclosureStructureEnvelopeDesignById(int id);

    /**
     * 向围护结构隔热设计表插入新数据
     */
    boolean addEnclosureStructureEnvelopeDesignService(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo);

    boolean update_enclosure_structure_envelope_design(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo);
}
