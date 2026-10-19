import Select, { MultiValue } from "react-select";
import { getSelectStyles } from "./select.styles";

interface SelectOption {
  label: string;
  value: string;
}

interface UserFilterSelectsProps {
  hobbies: string[];
  nationalities: string[];
  selectedHobbies: string[];
  selectedNationalities: string[];
  onHobbiesChange: (values: string[]) => void;
  onNationalitiesChange: (values: string[]) => void;
}

const selectStyles = getSelectStyles<SelectOption, true>();

export function UserFilterSelects({
  hobbies,
  nationalities,
  selectedHobbies,
  selectedNationalities,
  onHobbiesChange,
  onNationalitiesChange,
}: UserFilterSelectsProps) {
  const hobbyOptions: SelectOption[] = hobbies.map((value) => ({
    label: value,
    value,
  }));

  const nationalityOptions: SelectOption[] = nationalities.map((value) => ({
    label: value,
    value,
  }));

  const handleChange = (
    values: MultiValue<SelectOption>,
    onChange: (values: string[]) => void,
  ) => {
    onChange(values.map((item) => item.value));
  };

  return (
    <div className="contents">
      <Select
        className="w-full shrink-0 sm:w-[250px]"
        isMulti
        controlShouldRenderValue={false}
        backspaceRemovesValue={false}
        isSearchable
        aria-label="Nationalities (match any selected)"
        options={nationalityOptions}
        value={selectedNationalities.map((value) => ({ label: value, value }))}
        onChange={(values) => handleChange(values, onNationalitiesChange)}
        placeholder={selectedNationalities.length
          ? `Nationalities (${selectedNationalities.length} selected)`
          : "Select nationalities..."}
        closeMenuOnSelect={false}
        styles={selectStyles}
      />

      <Select
        className="w-full shrink-0 sm:w-[250px]"
        isMulti
        controlShouldRenderValue={false}
        backspaceRemovesValue={false}
        isSearchable
        aria-label="Hobbies (match all selected)"
        options={hobbyOptions}
        value={selectedHobbies.map((value) => ({ label: value, value }))}
        onChange={(values) => handleChange(values, onHobbiesChange)}
        placeholder={selectedHobbies.length
          ? `Hobbies (${selectedHobbies.length} selected)`
          : "Select hobbies..."}
        closeMenuOnSelect={false}
        styles={selectStyles}
      />
    </div>
  );
}
