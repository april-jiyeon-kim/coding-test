"use client";

import React from "react";
import styles from "../styles/page.module.scss";
import CustomSelectSingle from "./CustomSelectSingle";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  change,
  setItineraryFilter,
  setTourTypeFilter,
} from "@/lib/redux/modules/filter";
import CustomSelectMulti from "./CustomSelectMulti";
import { AppDispatch } from "@/lib/redux/store";
import { filters } from "@/data/filters";

const Filter: React.FC<{}> = ({}) => {
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const handleItinery = (selectedValue: OptionType) => {
    dispatch(setItineraryFilter(selectedValue));
  };

  const handleTourTypes = (selectedValues: OptionType[]) => {
    dispatch(setTourTypeFilter(selectedValues));
  };

  return (
    <div className={styles.filter_wrapper}>
      <h1>미국 라스베가스</h1>
      <CustomSelectMulti
        title="상품 유형"
        options={filters.tourTypes}
        onChange={handleTourTypes}
        selectedValues={filter.tourTypes}
      />
      <CustomSelectSingle
        title="예약 기간"
        options={filters.itinerary}
        onChange={handleItinery}
        selectedValue={filter.itinerary}
      />
    </div>
  );
};

export default Filter;
