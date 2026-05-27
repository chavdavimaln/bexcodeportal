// Blog.jsx

import React from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import BlogBanner from "./BlogBanner";
import BlogList from "./BlogList";

const Blog = () => {
    return (
        <>
            <Header />
            <main>
                <BlogBanner />
                <BlogList />
            </main>
            <Footer />
        </>
    );
};

export default Blog;