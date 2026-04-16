import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Form Builder
        </Typography>

        <Button color="inherit" onClick={() => navigate("/")}>
          Dashboard
        </Button>

        <Button color="inherit" onClick={() => navigate("/create")}>
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
}
