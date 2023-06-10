"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import styles from "../styles/filtertag.module.scss";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { removeTourType, resetItinerary } from "@/lib/redux/modules/filter";
import FilterType from "@/types/FilterType";

type Props = { tag: OptionType; filterType: FilterType };

const FilterTag: React.FC<Props> = ({ tag, filterType }) => {
  const dispatch = useAppDispatch();
  const handleDelete = () => {
    filterType === FilterType.TourType
      ? dispatch(removeTourType(tag))
      : dispatch(resetItinerary());
  };
  return (
    <button className={styles.filter_tag} onClick={handleDelete}>
      <b>{tag.text}</b>
      <span>
        <FontAwesomeIcon icon={faX as IconProp} size="xs" />
      </span>
    </button>
  );
};

export default FilterTag;
