import * as React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import IdeasSubmissions from "./ideas-Submissions/IdeasSubmissions";

export default function AnimatedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Ideas Submissions" sx={{ width: "48%" }} />
        <Tab label="Research Submissions" sx={{ width: "48%" }} />
      </Tabs>

      <Box
        sx={{
          position: "relative",
          minHeight: 100,
          // bgcolor: "#fff",
          mt: 3,
          borderRadius: 4,
          pb: "10px",
        }}
      >
        <AnimatePresence mode="wait">
          {value === 0 && (
            <motion.div
              key="tab1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <IdeasSubmissions />
              
            </motion.div>
          )}

          {value === 1 && (
            <motion.div
              key="tab2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <IdeasSubmissions />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
