import React, { useState } from "react";
import api from "../api/api";
import {
  TextField,
  Button,
  Card,
  Typography,
  MenuItem,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    fields: [],
  });

  const navigate = useNavigate();

  // Add field
  const addField = () => {
    setForm({
      ...form,
      fields: [
        ...form.fields,
        { label: "", type: "text", required: false, options: [] },
      ],
    });
  };

  // Update field
  const updateField = (index, key, value) => {
    const updated = [...form.fields];
    updated[index][key] = value;
    setForm({ ...form, fields: updated });
  };

  // Add option
  const addOption = (index) => {
    const updated = [...form.fields];
    updated[index].options.push("");
    setForm({ ...form, fields: updated });
  };

  // Update option
  const updateOption = (fieldIndex, optionIndex, value) => {
    const updated = [...form.fields];
    updated[fieldIndex].options[optionIndex] = value;
    setForm({ ...form, fields: updated });
  };

  // Save form
  const saveForm = async () => {
    try {
      await api.post("/forms", form);
      toast.success("Form Created!");
      navigate("/");
    } catch {
      toast.error("Error creating form");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5">Create Form</Typography>

        <TextField
          fullWidth
          label="Title"
          margin="normal"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <TextField
          fullWidth
          label="Description"
          margin="normal"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Button sx={{ mt: 2 }} onClick={addField}>
          + Add Field
        </Button>

        {form.fields.map((f, i) => (
          <Card key={i} sx={{ p: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Label"
              margin="dense"
              value={f.label}
              onChange={(e) => updateField(i, "label", e.target.value)}
            />

            <TextField
              select
              fullWidth
              label="Type"
              margin="dense"
              value={f.type}
              onChange={(e) => updateField(i, "type", e.target.value)}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="dropdown">Dropdown</MenuItem>
            </TextField>

            <FormControlLabel
              control={
                <Switch
                  checked={f.required}
                  onChange={(e) => updateField(i, "required", e.target.checked)}
                />
              }
              label="Required"
            />

            {f.type === "dropdown" && (
              <>
                <Typography sx={{ mt: 1 }}>Options</Typography>

                {f.options.map((opt, idx) => (
                  <TextField
                    key={idx}
                    fullWidth
                    margin="dense"
                    label={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, idx, e.target.value)}
                  />
                ))}

                <Button onClick={() => addOption(i)}>+ Add Option</Button>
              </>
            )}
          </Card>
        ))}

        <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={saveForm}>
          Save Form
        </Button>
      </Card>
    </Box>
  );
}
