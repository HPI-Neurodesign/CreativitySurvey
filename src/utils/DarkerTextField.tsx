import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const DarkerDisabledTextField = withStyles({
  root: {
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "rgba(0, 0, 0, 0.8)", // (default alpha is 0.38)
    },
  },
})(TextField);
