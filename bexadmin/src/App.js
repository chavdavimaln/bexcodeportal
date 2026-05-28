// import { Routes, Route, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomeIndex from "./Admin/Pages/Home/HomeIndex";
import ServicesList from "./Admin/Pages/Services/ServicesList";
import AdminLogin from "./Admin/Pages/Auth/Login";
import AdminRegister from "./Admin/Pages/Auth/Register";
import BlogAdd from "./Admin/Pages/Blogs/BlogAdd";
import BlogList from "./Admin/Pages/Blogs/BlogList";
import BlogEdit from "./Admin/Pages/Blogs/BlogEdit";


function App() {
    return (
        <>
            <Routes>
                <Route path="/admin" element={<HomeIndex />} >Home</Route>
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/blogs" element={<BlogList />} />
                <Route path="/admin/blogs/add" element={<BlogAdd />} />
                <Route path="/admin/blogs/edit/:id" element={<BlogEdit />} />
                <Route
                    path="/admin/services"
                    element={<ServicesList />}
                />
            </Routes>
        </>
    );
}

export default App;
