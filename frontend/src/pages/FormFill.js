import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import toast from "react-hot-toast";

export default function FormFill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    api
      .get(`/forms/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to load form"));
  }, [id]);

  const isFieldInvalid = (field) => {
    if (!field.required) return false;
    return !answers[field.label];
  };

  const isFormValid = () => {
    return form.fields.every((f) => {
      if (!f.required) return true;
      return answers[f.label];
    });
  };

  const submit = async () => {
    try {
      await api.post("/submissions", { formId: id, answers });

      toast.success("Form Submitted!");

      setTimeout(() => navigate("/"), 1000);
    } catch {
      toast.error("Submission failed");
    }
  };

  if (!form) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          {form.title}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {form.description}
        </Typography>

        {form.fields.map((f, i) => {
          const error = touched[f.label] && isFieldInvalid(f);

          if (f.type === "dropdown") {
            return (
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                key={i}
                error={error}
                required={f.required}
              >
                <InputLabel>{f.label}</InputLabel>

                <Select
                  value={answers[f.label] || ""}
                  label={f.label}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [f.label]: e.target.value,
                    })
                  }
                  onBlur={() =>
                    setTouched({
                      ...touched,
                      [f.label]: true,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>Select {f.label}</em>
                  </MenuItem>

                  {f.options?.map((opt, idx) => (
                    <MenuItem key={idx} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>

                {error && (
                  <FormHelperText>{f.label} is required</FormHelperText>
                )}
              </FormControl>
            );
          }

          return (
            <TextField
              key={i}
              fullWidth
              margin="normal"
              label={f.label}
              type={f.type}
              required={f.required}
              value={answers[f.label] || ""}
              error={error}
              helperText={error ? `${f.label} is required` : ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [f.label]: e.target.value,
                })
              }
              onBlur={() =>
                setTouched({
                  ...touched,
                  [f.label]: true,
                })
              }
            />
          );
        })}

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!isFormValid()}
          onClick={submit}
        >
          Submit
        </Button>
      </Card>
    </Box>
  );
}
