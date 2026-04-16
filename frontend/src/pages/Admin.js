import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Grid, Card, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Admin() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/forms")
      .then((res) => setForms(res.data))
      .catch(() => toast.error("Failed to load forms"));
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button variant="contained" onClick={() => navigate("/create")}>
        Create New Form
      </Button>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {forms.length === 0 && <Typography>No forms created yet</Typography>}

        {forms.map((form) => (
          <Grid item xs={12} md={6} key={form._id}>
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6">{form.title}</Typography>

              <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/form/${form._id}`)}
                >
                  Open
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate(`/submissions/${form._id}`)}
                >
                  Submissions
                </Button>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
