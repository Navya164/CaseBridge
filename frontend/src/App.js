import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Navbar from './pages/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintForm from './pages/ComplaintForm';
import EvidenceUpload from './pages/EvidenceUpload';
import AdminDashboard from './pages/AdminDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import ManageUsers from './pages/ManageUsers';
import AssignOfficer from './pages/AssignOfficer';
import PermissionManagement from './pages/PermissionManagement';
import AdminPermission from './pages/AdminPermission';
import OfficerComplaints from './pages/OfficerComplaints';
import TrackComplaint from './pages/TrackComplaint';
import UserDashboard from './pages/UserDashboard';

function App() {

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={
            !token
              ? <Login />
              : <Navigate to="/complaint" />
          }
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={
            !token
              ? <Register />
              : <Navigate to="/complaint" />
          }
        />

        {/* COMPLAINT */}
        <Route
          path="/complaint"
          element={
            token
              ? <ComplaintForm />
              : <Navigate to="/" />
          }
        />

        {/* EVIDENCE */}
        <Route
          path="/upload"
          element={
            token
              ? <EvidenceUpload />
              : <Navigate to="/" />
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin"
          element={
            token && role === 'ADMIN'
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

        {/* ANALYTICS */}
        <Route
          path="/analytics"
          element={
            token && role === 'ADMIN'
              ? <AnalyticsDashboard />
              : <Navigate to="/" />
          }
        />

        {/* OFFICER DASHBOARD */}
        <Route
          path="/officer"
          element={
            token && role === 'OFFICER'
              ? <OfficerDashboard />
              : <Navigate to="/" />
          }
        />
        <Route
    path="/manage-users"
    element={
        token && role === 'ADMIN'
        ? <ManageUsers />
        : <Navigate to="/" />
    }
/>
<Route
    path="/officer-complaints"
    element={
        token && role === 'OFFICER'
        ? <OfficerComplaints />
        : <Navigate to="/" />
    }
/>

<Route
    path="/assign-officer"
    element={
        token && role === 'ADMIN'
        ? <AssignOfficer />
        : <Navigate to="/" />
    }
/>
<Route

    path="/permissions"

    element={

        token && role === 'ADMIN'

        ? <PermissionManagement />

        : <Navigate to="/" />
    }
/>
<Route
    path="/permissions"
    element={
        token && role === 'ADMIN'
        ? <AdminPermission />
        : <Navigate to="/" />
    }
/>
<Route path="/dashboard" element={<UserDashboard />} />
<Route path="/track" element={<TrackComplaint />} />
<Route path="/complaint" element={<ComplaintForm />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;