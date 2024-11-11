import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const PortalSelect = ({ label, name, value, options, formik, onChangeCustom, onChangeCustom1, disabled }) => (
  <FormControl
    fullWidth
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor:
            (name === "clubId"
              ? formik.touched.clubName && formik.errors.clubName
                ? "#F9423a"
                : "#2ABF89"
              : formik.touched[name] && formik.errors[name]
              ? "#F9423a"
              : "#2ABF89") || (name === "player" && formik.touched.playerName && formik.errors.playerName ? "#F9423a" : "#2ABF89"),
        },
        "&:hover fieldset": {
          borderColor:
            (name === "clubId"
              ? formik.touched.clubName && formik.errors.clubName
                ? "#F9423a"
                : "#2ABF89"
              : formik.touched[name] && formik.errors[name]
              ? "#F9423a"
              : "#2ABF89") || (name === "player" && formik.touched.playerName && formik.errors.playerName ? "#F9423a" : "#2ABF89"),
        },
        "&.Mui-focused fieldset": {
          borderColor:
            (name === "clubId"
              ? formik.touched.clubName && formik.errors.clubName
                ? "#F9423a"
                : "#2ABF89"
              : formik.touched[name] && formik.errors[name]
              ? "#F9423a"
              : "#2ABF89") || (name === "player" && formik.touched.playerName && formik.errors.playerName ? "#F9423a" : "#2ABF89"),
        },
      },
      "& .MuiInputLabel-root": {
        color:
          name === "clubId"
            ? formik.touched.clubName && formik.errors.clubName
              ? "#F9423a"
              : "rgba(0, 0, 0, 0.54)"
            : name === "player"
            ? formik.touched.playerName && formik.errors.playerName
              ? "#F9423a"
              : "rgba(0, 0, 0, 0.54)"
            : formik.touched[name] && formik.errors[name]
            ? "#F9423a"
            : "rgba(0, 0, 0, 0.54)",
        "&[data-shrink='true']": {
          color:
            name === "clubId"
              ? formik.touched.clubName && formik.errors.clubName
                ? "#F9423a"
                : "rgba(0, 0, 0, 0.54)"
              : name === "player"
              ? formik.touched.playerName && formik.errors.playerName
                ? "#F9423a"
                : "rgba(0, 0, 0, 0.54)"
              : formik.touched[name] && formik.errors[name]
              ? "#F9423a"
              : "rgba(0, 0, 0, 0.54)",
        },
      },

      "& .MuiSvgIcon-root": {
        color:
          name === "clubId"
            ? formik.touched.clubName && formik.errors.clubName
              ? "#F9423a"
              : "rgba(0, 0, 0, 0.54)"
            : name === "player"
            ? formik.touched.playerName && formik.errors.playerName
              ? "#F9423a"
              : "rgba(0, 0, 0, 0.54)"
            : formik.touched[name] && formik.errors[name]
            ? "#F9423a"
            : "rgba(0, 0, 0, 0.54)",
      },
    }}>
    <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-select-label`}
      id={name}
      name={name}
      value={value}
      label={label}
      onChange={(event) => {
        if (onChangeCustom) {
          onChangeCustom(event);
        } else if (onChangeCustom1) {
          onChangeCustom1(event);
        } else {
          formik.handleChange(event);
        }
      }}
      disabled={disabled}
      error={
        (name === "player" && formik.touched.playerName && Boolean(formik.errors.playerName)) ||
        (name === "clubId" && formik.touched.clubName && Boolean(formik.errors.clubName)) ||
        (formik.touched[name] && Boolean(formik.errors[name])) // Altri campi generici
      }>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {(name === "player" && formik.touched.playerName && formik.errors.playerName && <div className="error">{formik.errors.playerName}</div>) ||
      (name === "clubId" && formik.touched.clubName && formik.errors.clubName && <div className="error">{formik.errors.clubName}</div>) ||
      (formik.touched[name] && formik.errors[name] && <div className="error">{formik.errors[name]}</div>)}
  </FormControl>
);

export default PortalSelect;
