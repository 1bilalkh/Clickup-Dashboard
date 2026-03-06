import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Typography } from "@mui/material";
import eventimg1 from "./images/event1.jpg";
import eventimg2 from "./images/event2.jpg";
import eventimg3 from "./images/event3.jpg";
import CustomButton from "../../../common/Button";

const slides = [
  {
    id: 1,
    image: eventimg1,
    text: "13 Fri",
    heading: "AI Innovation Dashboard",
    points: [
      "Live AI Demonstration",
      "Networking Session",
      "Startup Pitch Competition",
    ],
  },
  {
    id: 1,
    image: eventimg2,
    text: "23 Wed",
    heading: "Future Tech Conference",
    points: ["Expert Speakers", "Panel Discussion", "Workshop Training"],
  },
  {
    id: 1,
    image: eventimg3,
    text: "9 Feb",
    heading: "Live AI Demonstration",
    points: [
      "Hands-on AI Workshops",
      "Industry Expert Keynotes",
      "Real-world Case Studies",
    ],
  },
];

export default function UpcomingEvents() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ position: "relative" }}>
            <Box>
              <Box
                component="img"
                src={slides[index].image}
                alt="slider"
                sx={{
                  width: "100%",
                  height: 200,
                  borderRadius: 3,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  color: "#fff",
                  fontWeight: 200,
                  background: "rgba(0, 17, 248, 0.5)",
                  padding: "2px 6px",
                  borderRadius: 2,
                }}
              >
                {slides[index].text}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#1f1e1e",
                  fontWeight: 500,
                  padding: "1px 2px",
                  textAlign: "left",
                  mt: 1,
                  mb: 1,
                }}
              >
                {slides[index].heading}
              </Typography>
            </Box>
            <Box component="ul" sx={{ pl: 3, m: 0 }}>
              {slides[index].points.map((point, i) => (
                <Typography key={i} component="li" variant="body2">
                  {point}
                </Typography>
              ))}
            </Box>
          </Box>
        </motion.div>
      </AnimatePresence>

      <Box sx={{ mt: 2, textAlign: "center" }}>
        {slides.map((_, i) => (
          <Button
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              minWidth: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              p: 0,
              mx: 0.5,
              bgcolor: index === i ? "primary.main" : "grey.400",
              "&:hover": {
                bgcolor: index === i ? "primary.dark" : "grey.500",
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CustomButton fullWidth>Browse All Events</CustomButton>
      </Box>
    </Box>
  );
}
