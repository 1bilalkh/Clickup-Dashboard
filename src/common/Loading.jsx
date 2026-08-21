import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabelAndValue(props) {
  const progressId = React.useId();
  return (
    <div>
      <Typography  fontWeight={'bold'} id={progressId} variant="h5" color="black">
        CRM Dashboard
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress
            variant="determinate"
            aria-labelledby={progressId}
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
        </Box>
     
      </Box>
    </div>
  );
}

LinearProgressWithLabelAndValue.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between `min` and `max`.
   */
  value: PropTypes.number.isRequired,
};

function Loading() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabelAndValue value={progress} />
      </Box>
    </>
  );
}

export default Loading;
