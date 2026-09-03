import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Loading projects...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Projects
      </Typography>

      {projects.map((project) => (
        <Box
          key={project._id}
          sx={{
            background: "#f3f8fc",
            p: 2,
            mb: 2,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ py: 1 }}
          >
            <Link
              to={`/projects/${project._id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {project.name}
            </Link>
          </Typography>

          <Typography>
            {project.description}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}