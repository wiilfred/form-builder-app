import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Admin from "./pages/Admin";
import CreateForm from "./pages/CreateForm";
import FormFill from "./pages/FormFill";
import Submissions from "./pages/Submissions";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Toaster position="top-right" />

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/form/:id" element={<FormFill />} />
          <Route path="/submissions/:id" element={<Submissions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
