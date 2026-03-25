import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import LoginVerifyPage from "../pages/LoginVerifyPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import RegisterVerifyPage from "../pages/RegisterVerifyPage.jsx";
import RegisterCompletePage from "../pages/RegisterCompletePage.jsx";
import FeedPage from "../pages/FeedPage.jsx";
import ValidateSession from "../features/auth/components/ValidateSession.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/verify" element={<LoginVerifyPage />} />

                <Route path="/register" element={<RegisterPage />} />
                <Route path="/register/verify" element={<RegisterVerifyPage />} />
                <Route path="/register/complete" element={<RegisterCompletePage />} />

                <Route
                    path="/feed"
                    element={
                        <ValidateSession>
                            <FeedPage />
                        </ValidateSession>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;