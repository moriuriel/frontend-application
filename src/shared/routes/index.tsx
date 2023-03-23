import { Route, Routes } from "react-router-dom";
import { Header } from "../../components/Header";
import { SignIn } from "../../modules/signIn";
import { SignUp } from "../../modules/signUp";

function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Header />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
  );
}

export {Router}