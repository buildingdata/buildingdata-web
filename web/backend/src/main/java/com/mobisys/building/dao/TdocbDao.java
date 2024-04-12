package com.mobisys.building.dao;

import com.mobisys.building.entity.TdocbInfo;

import java.util.List;

public interface TdocbDao {
    /**
     * 列出民用建筑热工设计规范附表参数表中信息
     */
    List<TdocbInfo> queryTdocb();

    /**
     * 按城市ID查找民用建筑热工设计规范附表参数表信息
     */
    TdocbInfo queryTdocbById(int id);

    /**
     * 插入信息
     */
    boolean insertTdocb(TdocbInfo tdocbInfo);

}
