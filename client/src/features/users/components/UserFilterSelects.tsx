import Select, { MultiValue, StylesConfig } from "react-select";
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
interface SelectOption {
  label: string;
  value: string;
}

const selectStyles: StylesConfig<SelectOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    height: "44px",
    borderRadius: "8px",
    width: "250px",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #dbeafe" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#2563eb" : "#9ca3af",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    flexWrap: "nowrap",
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin",
  }),

  multiValue: (base) => ({
    ...base,
    flexShrink: 0,
    borderRadius: "6px",
    backgroundColor: "#eff6ff",
  }),

  multiValueLabel: (base) => ({
    ...base,
    color: "#1d4ed8",
    fontWeight: 500,
  }),

  menu: (base) => ({
    ...base,
    zIndex: 50,
    borderRadius: "8px",
    overflow: "hidden",
  }),

  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    backgroundColor: state.isSelected
      ? "#eff6ff"
      : state.isFocused
        ? "#f3f4f6"
        : "white",
    color: state.isSelected ? "#1d4ed8" : "#374151",
  }),
};

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
    <div className="grid gap-3 md:grid-cols-2">
      <Select
        isMulti
        isSearchable
        options={nationalityOptions}
        value={nationalityOptions.filter((option) =>
          selectedNationalities.includes(option.value),
        )}
        onChange={(values) => handleChange(values, onNationalitiesChange)}
        placeholder="Select nationalities..."
        closeMenuOnSelect={false}
        styles={selectStyles}
      />

      <Select
        isMulti
        isSearchable
        options={hobbyOptions}
        value={hobbyOptions.filter((option) =>
          selectedHobbies.includes(option.value),
        )}
        onChange={(values) => handleChange(values, onHobbiesChange)}
        placeholder="Select hobbies..."
        closeMenuOnSelect={false}
        styles={selectStyles}
      />
    </div>
  );
}
