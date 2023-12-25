package com.mobisys.building.dao;

import com.mobisys.building.entity.indoorSuggestInfo;

import java.util.List;

public interface indoorSuggestDao {
    List<indoorSuggestInfo> query();

    /*

     */
    boolean update_t_indoor_confort_suggestion(indoorSuggestInfo indoorSuggestInfo);
}
