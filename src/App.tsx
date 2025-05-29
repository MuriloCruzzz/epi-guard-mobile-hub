import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";

// Pages
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import RecoverPassword from "./pages/RecoverPassword";
import Home from "./pages/Home";
import MyEPIs from "./pages/MyEPIs";
import EPIDetail from "./pages/EPIDetail";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import RequestEPI from "./pages/RequestEPI";
import RequestDetails from "./pages/RequestDetails";
import RequestSuccess from "./pages/RequestSuccess";
import PendingRequests from "./pages/PendingRequests";
import EvaluateEPI from "./pages/EvaluateEPI";
import DDSList from "./pages/DDSList";
import DDSDetail from "./pages/DDSDetail";
import Consumption from "./pages/Consumption";
import NotFound from "./pages/NotFound";
import Users from "./pages/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/splash" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recover-password" element={<RecoverPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/my-epis" element={<MyEPIs />} />
              <Route path="/epi/:id" element={<EPIDetail />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/request-epi" element={<RequestEPI />} />
              <Route path="/request-details/:id" element={<RequestDetails />} />
              <Route path="/request-success" element={<RequestSuccess />} />
              <Route path="/pending-epis" element={<PendingRequests />} />
              <Route path="/evaluate-epi/:id" element={<EvaluateEPI />} />
              <Route path="/dds" element={<DDSList />} />
              <Route path="/dds/:id" element={<DDSDetail />} />
              <Route path="/consumption" element={<Consumption />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
