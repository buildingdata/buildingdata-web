package com.mobisys.building.service;

import com.mobisys.building.entity.indoorSuggestInfo;

import java.util.List;

public interface indoorSuggestService {
   public  List<indoorSuggestInfo> getSuggest();
   public boolean update_t_indoor_confort_suggestion(indoorSuggestInfo indoorSuggestInfo);
}
