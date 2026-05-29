import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import HomeIndex from "./Admin/Pages/Home/HomeIndex";

import ServicesList from "./Admin/Pages/Services/ServicesList";

import AdminLogin from "./Admin/Pages/Auth/Login";
import AdminRegister from "./Admin/Pages/Auth/Register";

import BlogAdd from "./Admin/Pages/Blogs/BlogAdd";
import BlogList from "./Admin/Pages/Blogs/BlogList";
import BlogEdit from "./Admin/Pages/Blogs/BlogEdit";

import UserList from "./Admin/Pages/Users/UserList";
import UserAdd from "./Admin/Pages/Users/UserAdd";
import UserEdit from "./Admin/Pages/Users/UserEdit";
import UserProfile from "./Admin/Pages/Users/UserProfile";

function App() {

    return (
        <Routes>

            <Route
                path="/"
                element={
                    <Navigate
                        to="/admin/login"
                    />
                }
            />

            <Route
                path="/admin"
                element={<HomeIndex />}
            />

            <Route
                path="/admin/login"
                element={<AdminLogin />}
            />

            <Route
                path="/admin/register"
                element={<AdminRegister />}
            />

            {/* Blogs */}
            <Route
                path="/admin/blogs"
                element={<BlogList />}
            />

            <Route
                path="/admin/blogs/add"
                element={<BlogAdd />}
            />

            <Route
                path="/admin/blogs/edit/:id"
                element={<BlogEdit />}
            />

            {/* Services */}
            <Route
                path="/admin/services"
                element={
                    <ServicesList />
                }
            />

            {/* Users */}
            <Route
                path="/admin/users"
                element={<UserList />}
            />

            <Route
                path="/admin/users/add"
                element={<UserAdd />}
            />

            <Route
                path="/admin/users/edit/:id"
                element={<UserEdit />}
            />

            <Route
                path="/admin/users/profile"
                element={<UserProfile />}
            />

        </Routes>
    );
}

export default App;