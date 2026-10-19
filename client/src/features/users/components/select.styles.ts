import { StylesConfig } from "react-select";

export const getSelectStyles = <Option, IsMulti extends boolean>(): StylesConfig<Option, IsMulti> => ({
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    height: "44px",
    flexWrap: "nowrap",
    borderRadius: "8px",
    width: "100%",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 2px #dbeafe" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#2563eb" : "#9ca3af",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    minWidth: 0,
    flexWrap: "nowrap",
    overflow: "hidden",
  }),

  placeholder: (base) => ({
    ...base,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  singleValue: (base) => ({
    ...base,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    flexShrink: 0,
  }),

  multiValue: (base) => ({
    ...base,
    minWidth: 0,
    maxWidth: "100%",
    flexShrink: 1,
    borderRadius: "6px",
    backgroundColor: "#eff6ff",
  }),

  multiValueLabel: (base) => ({
    ...base,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
});
