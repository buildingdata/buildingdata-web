package com.mobisys.building.service.impl;

import com.mobisys.building.dao.indoorSuggestDao;
import com.mobisys.building.entity.indoorSuggestInfo;
import com.mobisys.building.service.indoorSuggestService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
@Service
public class indoorSuggestServiceImpl implements indoorSuggestService {
    @Resource
    private com.mobisys.building.dao.indoorSuggestDao indoorSuggestDao;
    @Override
    public List<indoorSuggestInfo> getSuggest() {
        return indoorSuggestDao.query();
    }
    @Override
    public boolean update_t_indoor_confort_suggestion(indoorSuggestInfo indoorSuggestInfo){
        return indoorSuggestDao.update_t_indoor_confort_suggestion(indoorSuggestInfo);
    }
}
