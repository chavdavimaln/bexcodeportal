// import { Routes, Route, Navigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from './Front/Pages/Home/IndexHome';
import Blogs from './Front/Pages/Blogs/Blogs';
import AdminLogin from "./Admin/Pages/Auth/Login";
import AdminRegister from "./Admin/Pages/Auth/Register";
import BlogAdd from "./Admin/Pages/Blogs/BlogAdd";
import BlogList from "./Admin/Pages/Blogs/BlogList";
import BlogEdit from "./Admin/Pages/Blogs/BlogEdit";
import BlogSingle from "./Front/Pages/Blogs/BlogSingle";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} >Home</Route>
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/admin/blogs" element={<BlogList />} />
                <Route path="/admin/blogs/add" element={<BlogAdd />} />
                <Route path="/admin/blogs/edit/:id" element={<BlogEdit />} />
                <Route
                    path="/blog/:slug"
                    element={<BlogSingle />}
                />
                {/* <Route path="/contact-us" element={<Contact />} />
                <Route path="/about" element={<AboutUs />} /> */}
                {/* these 3 page are same  */}
                {/* <Route path="/monaghan-medical" element={<Products />} />
                <Route path="/product" element={<Navigate to="/monaghan-medical" replace />} />
                <Route path="/products" element={<Navigate to="/monaghan-medical" replace />} /> */}

            </Routes>
        </>
    );
}

export default App;
