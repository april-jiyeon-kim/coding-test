"use client";

import React, { useRef, useState } from "react";
import styles from "../styles/select.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useOutsideClick } from "@/lib/useOutsideClick";

const CustomSelectSingle: React.FC<{
  title: string;
  options: OptionType[];
  selectedValue?: OptionType;
  onChange: (selectedValue: OptionType) => void;
}> = ({ title, options, selectedValue, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(selectRef, () => {
    if (showOptions) {
      setShowOptions(false);
    }
  });

  const handleSelectChange = (option: OptionType) => {
    onChange(option);
  };

  return (
    <button
      ref={selectRef}
      className={`${styles.select_box} ${selectedValue && styles.selected}`}
      onClick={() => setShowOptions((prev) => !prev)}
    >
      <b className={styles.title}>{title}</b>
      {showOptions ? (
        <>
          <FontAwesomeIcon icon={faAngleUp as IconProp} />
          <div className={styles.options}>
            {options.map((option) => (
              <div
                className={styles.option}
                key={option.key}
                onClick={() => handleSelectChange(option)}
              >
                {selectedValue === option && (
                  <span className={styles.selected_option}>
                    <FontAwesomeIcon icon={faCheck as IconProp} />
                  </span>
                )}

                {option.text}
              </div>
            ))}
          </div>
        </>
      ) : (
        <FontAwesomeIcon icon={faAngleDown as IconProp} />
      )}
    </button>
  );
};

export default CustomSelectSingle;
