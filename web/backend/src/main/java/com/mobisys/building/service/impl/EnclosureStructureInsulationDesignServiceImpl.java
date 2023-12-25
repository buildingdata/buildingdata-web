package com.mobisys.building.service.impl;

import com.mobisys.building.dao.EnclosureStructureInsulationDesignDao;
import com.mobisys.building.entity.EnclosureStructureInsulationDesignInfo;
import com.mobisys.building.service.EnclosureStructureInsulationDesignService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EnclosureStructureInsulationDesignServiceImpl implements EnclosureStructureInsulationDesignService {
    @Resource
    EnclosureStructureInsulationDesignDao enclosureStructureInsulationDesignDao;

    @Override
    public List<EnclosureStructureInsulationDesignInfo> getEnclosureStructureInsulationDesignById(int id) {
        return enclosureStructureInsulationDesignDao.queryEnclosureStructureInsulationDesignById(id);
    }

    @Override
    public boolean addEnclosureStructureInsulationDesignService(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo) {
        return enclosureStructureInsulationDesignDao.insertEnclosureStructureInsulationDesign(enclosureStructureInsulationDesignInfo);
    }

    @Override
    public boolean update_enclosure_structure_insulation_design(EnclosureStructureInsulationDesignInfo enclosureStructureInsulationDesignInfo){
        return enclosureStructureInsulationDesignDao.update_enclosure_structure_insulation_design(enclosureStructureInsulationDesignInfo);
    }
}
