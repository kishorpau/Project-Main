import React, { forwardRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { green } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const GreenSwitchComponent = forwardRef((props, ref) => {
  return <GreenSwitch {...props} ref={ref} />;
});

export default GreenSwitchComponent;
