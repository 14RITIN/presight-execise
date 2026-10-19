import { StylesConfig } from "react-select";

export const getSelectStyles = <Option, IsMulti extends boolean>(): StylesConfig<Option, IsMulti> => ({
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    height: "44px",
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
});
