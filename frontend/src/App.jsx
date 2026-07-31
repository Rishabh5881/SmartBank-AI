import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";


import Navbar from "./components/layout/Navbar";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";


import Accounts from "./pages/accounts/Accounts";

import Cards from "./pages/cards/Cards";

import Loans from "./pages/loans/Loans";

import Transactions from "./pages/transaction/Transactions";

import Notification from "./pages/Notification";

import Profile from "./pages/profile";

import NotFound from "./pages/NotFound";


import ProtectedRoute from "./components/ProtectedRoute";


import ProtectedRoute from "./components/auth/ProtectedRoute";



function App(){


const location = useLocation();



const hideNavbar =
location.pathname === "/login" ||
location.pathname === "/signup";



return (

<>


{
!hideNavbar && <Navbar />
}



<Routes>



<Route
path="/"
element={<Home />}
/>


<Route
path="/login"
element={<Login />}
/>


<Route
path="/signup"
element={<Signup />}
/>





<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>



<Route
path="/accounts"
element={
<ProtectedRoute>
<Accounts/>
</ProtectedRoute>
}
/>



<Route
path="/transactions"
element={
<ProtectedRoute>
<Transactions />
</ProtectedRoute>
}
/>



<Route
path="/cards"
element={
<ProtectedRoute>
<Cards />
</ProtectedRoute>
}
/>



<Route
path="/loans"
element={
<ProtectedRoute>
<Loans />
</ProtectedRoute>
}
/>



<Route
path="/notifications"
element={
<ProtectedRoute>
<Notifications />
</ProtectedRoute>
}
/>



<Route
path="/profile"
element={
<ProtectedRoute>
<Profile />
</ProtectedRoute>
}
/>



<Route
path="*"
element={<NotFound />}
/>



</Routes>


</>

);

}



export default App;