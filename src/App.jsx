import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginVerifyPage from "./pages/LoginVerifyPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterVerifyPage from "./pages/RegisterVerifyPage";
import RegisterCompletePage from "./pages/RegisterCompletePage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
                        <ProtectedRoute>
                            <FeedPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;