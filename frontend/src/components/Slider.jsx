import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import { useLocation } from "react-router-dom";

const AirbnbSlider = withStyles({
  root: {
    color: "red",
    height: 3,
    padding: "13px 0"
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px"
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 3
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3
  }
})(Slider);

// function AirbnbThumbComponent({ minPrice, maxPrice, ...props }) {
//   return (
//     <span {...props}>
//       <span className="bar" />
//       <span className="bar" />
//       <span className="bar" />
//     </span>
//   );
// }

const shouldntUpdate = (prevProps, nextProps) => {
  return (
    prevProps.minPrice === nextProps.minPrice &&
    prevProps.maxPrice === nextProps.maxPrice
  );
};

export default React.memo(function AirSlider({ minPrice, maxPrice, ...props }) {
  if (!minPrice || !maxPrice) return null;
  const [value, setValue] = useState([minPrice, maxPrice]);
  useEffect(() => {
    // I can't think of another way to call setValue
    // after changing the product category and thus min/max price
    setValue([minPrice, maxPrice]);
  }, [minPrice]);
  const handleChange = (e, value) => setValue(value);
  const marks = [
    {
      value: minPrice,
      label: "$" + minPrice.toLocaleString("en-US")
    },
    {
      value: Math.round((maxPrice - minPrice) * 0.25) + minPrice,
      label:
        "$" +
        (Math.round((maxPrice - minPrice) * 0.25) + minPrice).toLocaleString(
          "en-US"
        )
    },
    {
      value: Math.round((maxPrice - minPrice) * 0.5) + minPrice,
      label:
        "$" +
        (Math.round((maxPrice - minPrice) * 0.5) + minPrice).toLocaleString(
          "en-US"
        )
    },
    {
      value: Math.round((maxPrice - minPrice) * 0.75) + minPrice,
      label:
        "$" +
        (Math.round((maxPrice - minPrice) * 0.75) + minPrice).toLocaleString(
          "en-US"
        )
    },
    {
      value: maxPrice,
      label: "$" + maxPrice.toLocaleString("en-US")
    }
  ];
  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  return (
    <AirbnbSlider
      // ThumbComponent={AirbnbThumbComponent}
      ValueLabelComponent={ValueLabelComponent}
      marks={marks}
      value={value}
      min={minPrice}
      max={maxPrice}
      step={Math.round((maxPrice - minPrice) / 8)}
      valueLabelFormat={value => "$" + value.toLocaleString("en-US")}
      valueLabelDisplay="auto"
      onChange={handleChange}
      {...props}
    />
  );
}, shouldntUpdate);
