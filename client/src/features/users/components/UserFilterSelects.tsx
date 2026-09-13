import Select, { MultiValue } from 'react-select';

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
        onChange={(values) =>
          handleChange(values, onNationalitiesChange)
        }
        placeholder="Select nationalities..."
        closeMenuOnSelect={false}
      />

      <Select
        isMulti
        isSearchable
        options={hobbyOptions}
        value={hobbyOptions.filter((option) =>
          selectedHobbies.includes(option.value),
        )}
        onChange={(values) =>
          handleChange(values, onHobbiesChange)
        }
        placeholder="Select hobbies..."
        closeMenuOnSelect={false}
      />
    </div>
  );
}