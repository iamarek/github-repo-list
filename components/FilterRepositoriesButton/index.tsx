import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Repository } from "../../types/types";
import useRepositories from "../../utils/useRepositories";

type Props = {
  filter: string | undefined;
  setFilter: Dispatch<SetStateAction<string | undefined>>;
};

// Value of option that shows all cards
const DEFAULT_VALUE = "show-all";

const FilterRepositoriesButton = ({ filter, setFilter }: Props) => {
  const { data } = useRepositories();
  // Filter null items and remove duplicated languages
  const languages = new Set(
    (data?.map((item) => item.language).filter((item) => item) ||
      []) as string[]
  );

  // If user selects show-all -> clear filter, otherwise add filter value
  const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === DEFAULT_VALUE) {
      setFilter(undefined);
    } else {
      setFilter(e.target.value);
    }
  };

  return (
    <div className="grid grid-flow-col gap-3 items-center">
      <label htmlFor="filter" className="font-bold">
        Filter:{" "}
      </label>
      <select
        id="filter"
        name="filter"
        className="border px-3 appearance-none min-w-[220px] h-full"
        onChange={(e) => handleFilterChange(e)}
        value={filter}
      >
        <option value={DEFAULT_VALUE}>Show all</option>
        {[...languages]?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterRepositoriesButton;
