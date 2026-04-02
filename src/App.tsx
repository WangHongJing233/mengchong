import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Leaderboard from "@/pages/Leaderboard";
import Community from "@/pages/Community";
import Profile from "@/pages/Profile";
import HealthTracking from "@/pages/HealthTracking";

// A wrapper to inject Layout with BottomNav
function MainLayout() {
  return (
    <Layout showNav={true}>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rank" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Pages without bottom nav */}
        <Route path="/health" element={
          <Layout showNav={false}>
            <HealthTracking />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}