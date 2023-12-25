package com.mobisys.building.service.impl;

import com.mobisys.building.dao.EnclosureStructureEnvelopeDesignDao;
import com.mobisys.building.entity.EnclosureStructureEnvelopeDesignInfo;
import com.mobisys.building.service.EnclosureStructureEnvelopeDesignService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class EnclosureStructureEnvelopeDesignServiceImpl implements EnclosureStructureEnvelopeDesignService {
    @Resource
    EnclosureStructureEnvelopeDesignDao enclosureStructureEnvelopeDesignDao;

    @Override
    public List<EnclosureStructureEnvelopeDesignInfo> getEnclosureStructureEnvelopeDesignById(int id) {
        return enclosureStructureEnvelopeDesignDao.queryEnclosureStructureEnvelopeDesignById(id);
    }

    @Override
    public boolean addEnclosureStructureEnvelopeDesignService(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo) {
        return enclosureStructureEnvelopeDesignDao.insertEnclosureStructureEnvelopeDesign(enclosureStructureEnvelopeDesignInfo);
    }
    @Override
    public boolean update_enclosure_structure_envelope_design(EnclosureStructureEnvelopeDesignInfo enclosureStructureEnvelopeDesignInfo){
        return enclosureStructureEnvelopeDesignDao.update_enclosure_structure_envelope_design(enclosureStructureEnvelopeDesignInfo);
    }
}
