import { useEffect, useState } from "react";
import { Endpoints,HealthChecksEndpoints } from "../config/app";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface APIStatus {
  title: string;
  endpoint: string;
  status: string;
}

const HealthCheck = () => {
  const [statuses, setStatuses] = useState<APIStatus[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        console.log(`Endpoints: ${JSON.stringify(HealthChecksEndpoints)}`);

        const apiEntries = Object.entries(HealthChecksEndpoints); // Extract keys and values
        const initialStatuses: APIStatus[] = apiEntries.map(([key, url]) => ({
     
          title: key,
          endpoint: url,
          status: "400", // Assume failure initially
        }

    ));

        setStatuses(initialStatuses);

        const requests = apiEntries.map(async ([key, url]) => {
          try {
            console.log(`Network Call: ${url}`);
            const res = await fetch(url);

            setStatuses((prev) =>
              prev.map((item) =>
                item.endpoint === url ? { ...item, status: res.status.toString() } : item
              )
            );

            return { title: key, endpoint: url, status: res.status.toString() };
          } catch (error) {
            console.log(`Error fetching ${url}:`, error);
            return { title: key, endpoint: url, status: "400" };
          }
        });

        await Promise.all(requests);
      } catch (e) {
        console.error("Error fetching API statuses", e);
      }
    };

    fetchAll();
  }, []);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", margin: "2em 0" }}>
        API Health Check
      </Typography>

      {statuses.map((api, index) => {
        const isHealthy = api.status === "200";

        return (
          <Grid
            key={index}
            container
            alignItems="center"
            spacing={2}
            sx={{
              padding: 2,
              borderRadius: 2,
              backgroundColor: isHealthy ? "#e8f5e9" : "#ffebee",
              border: `1px solid ${isHealthy ? "#4caf50" : "#d32f2f"}`,
              marginBottom: "2em",
            }}
          >
            {/* Status Icon */}
            <Grid item>
              {isHealthy ? (
                <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 30 }} />
              ) : (
                <ErrorIcon sx={{ color: "#d32f2f", fontSize: 30 }} />
              )}
            </Grid>

            {/* API Title & Endpoint */}
            <Grid item xs>
              <Typography variant="subtitle1" fontWeight="bold">
                {api.title} API
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {api.endpoint}
              </Typography>
            </Grid>

            {/* Progress Bar */}
            <Grid item xs={5}>
              <LinearProgress
                variant="determinate"
                value={isHealthy ? 100 : 50}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: isHealthy ? "#c8e6c9" : "#ffcdd2",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: isHealthy ? "#4caf50" : "#d32f2f",
                  },
                }}
              />
            </Grid>

            {/* Status Code */}
            <Grid item>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: isHealthy ? "#2e7d32" : "#c62828" }}>
                {api.status}
              </Typography>
            </Grid>
          </Grid>
        );
      })}
    </Box>
  );
};

export default HealthCheck;
