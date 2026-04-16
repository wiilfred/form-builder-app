import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import toast from "react-hot-toast";

export default function Submissions() {
  const { id } = useParams();

  const [form, setForm] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`/forms/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to load form"));

    api
      .get(`/submissions/${id}`)
      .then((res) => setData(res.data))
      .catch(() => {
        toast.error("Failed to load submissions");
        setData([]);
      });
  }, [id]);

  if (!form) {
    return <Typography sx={{ p: 3 }}>Loading...</Typography>;
  }

  if (data.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No submissions yet</Typography>
      </Box>
    );
  }

  const headers = form.fields;

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Submissions
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              {headers.map((field, i) => (
                <TableCell key={i}>{field.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {headers.map((field, j) => (
                  <TableCell key={j}>
                    {row.answers?.[field.label] ?? "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
