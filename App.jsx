import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";

export default function App() {
    return (
        <Router basename="/Local-Event-Explorer">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </Router>
    );
}