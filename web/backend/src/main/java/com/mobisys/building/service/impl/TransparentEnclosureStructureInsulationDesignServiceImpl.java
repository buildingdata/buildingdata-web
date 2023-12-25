package com.mobisys.building.service.impl;

import com.mobisys.building.dao.TransparentEnclosureStructureInsulationDesignDao;
import com.mobisys.building.entity.TransparentEnclosureStructureInsulationDesignInfo;
import com.mobisys.building.service.TransparentEnclosureStructureInsulationDesignService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class TransparentEnclosureStructureInsulationDesignServiceImpl implements TransparentEnclosureStructureInsulationDesignService {
    @Resource
    TransparentEnclosureStructureInsulationDesignDao transparentEnclosureStructureInsulationDesignDao;

    @Override
    public List<TransparentEnclosureStructureInsulationDesignInfo> getTransparentEnclosureStructureInsulationDesignById(int id) {
        return transparentEnclosureStructureInsulationDesignDao.queryTransparentEnclosureStructureInsulationDesignById(id);
    }

    @Override
    public boolean addTransparentEnclosureStructureInsulationDesign(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo) {
        return transparentEnclosureStructureInsulationDesignDao.insertTransparentEnclosureStructureInsulationDesign(transparentEnclosureStructureInsulationDesignInfo);
    }

    @Override
    public  boolean update_transparent_enclosure_structure_insulation_design(TransparentEnclosureStructureInsulationDesignInfo transparentEnclosureStructureInsulationDesignInfo){
        return transparentEnclosureStructureInsulationDesignDao.update_transparent_enclosure_structure_insulation_design(transparentEnclosureStructureInsulationDesignInfo);
    }
}
