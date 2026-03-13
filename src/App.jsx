import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/feed" element={<FeedPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;