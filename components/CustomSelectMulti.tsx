"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "../styles/select.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FiltersState } from "@/lib/redux/modules/filter";

const CustomSelectMulti: React.FC<{
  title: string;
  options: OptionType[];
  selectedValues?: OptionType[];
  onChange: (selectedValues: OptionType[]) => void;
}> = ({ title, options, selectedValues, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectChange = (option: OptionType) => {
    if (selectedValues?.includes(option)) {
      onChange(selectedValues.filter((p) => p != option));
    } else {
      onChange([option, ...(selectedValues || [])]);
    }
  };

  const filterExist = useMemo(() => {
    return selectedValues && selectedValues?.length > 0;
  }, [selectedValues]);

  return (
    <button
      className={`${styles.select_box} ${filterExist && styles.selected}`}
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <b className={styles.title}>{title}</b>
      {showOptions ? (
        <>
          {filterExist ? (
            <div
              className={styles.selected_total}
            >{`${selectedValues?.length}`}</div>
          ) : (
            <FontAwesomeIcon icon={faAngleUp as IconProp} />
          )}
          <div className={styles.options}>
            {options.map((option) => (
              <div
                className={styles.option}
                key={option.key}
                onClick={() => handleSelectChange(option)}
              >
                {selectedValues?.includes(option) ? (
                  <span className={styles.selected_option}>
                    <FontAwesomeIcon icon={faSquareCheck as IconProp} />
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faSquare as IconProp} />
                  </span>
                )}

                {option.text}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {filterExist ? (
            <div
              className={styles.selected_total}
            >{`${selectedValues?.length}`}</div>
          ) : (
            <FontAwesomeIcon icon={faAngleDown as IconProp} />
          )}
        </>
      )}
    </button>
  );
};

export default CustomSelectMulti;
