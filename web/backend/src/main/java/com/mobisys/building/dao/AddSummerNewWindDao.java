package com.mobisys.building.dao;

import com.mobisys.building.entity.AddSummerNewWindInfo;

import java.util.List;
public interface AddSummerNewWindDao {
    /**
     * 按照站台号查找附表1夏季新风计算逐时焓值参数
     */
    List<AddSummerNewWindInfo> queryaddSummerNewWindById(int id);
}
