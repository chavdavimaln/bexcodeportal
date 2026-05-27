// Front/Pages/Blogs/BlogSingle.jsx

import React from "react";

import {
    useParams,
    Navigate,
    Link,
} from "react-router-dom";

import {
    CalendarDays,
    Share2,
} from "lucide-react";

import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

/* Import Static Blogs */
import BlogContents from "../../../Admin/Pages/Blogs/BlogContents";

const BlogSingle = () => {

    const { slug } = useParams();

    /* Local Storage Blogs */
    const localBlogs =
        JSON.parse(
            localStorage.getItem(
                "blogContents"
            )
        ) || [];

    /* Merge Blogs */
    const allBlogs = [
        ...localBlogs,
        ...BlogContents,
    ];

    /* Remove Duplicate IDs */
    const uniqueBlogs = allBlogs.filter(
        (blog, index, self) =>
            index ===
            self.findIndex(
                (b) => b.id === blog.id
            )
    );

    /* Find Blog */
    const blog = uniqueBlogs.find(
        (item) =>
            item.slug === slug
    );

    /* Redirect if blog not found */
    if (!blog) {
        return (
            <Navigate
                to="/blogs"
                replace
            />
        );
    }

    /* Category Text */
    const categoryText =
        Array.isArray(
            blog.category
        )
            ? blog.category.join(
                ", "
            )
            : blog.category;

    /* Reading Time */
    const plainText =
        blog.content
            ?.replace(
                /<[^>]+>/g,
                ""
            )
            .replace(
                /&nbsp;/g,
                " "
            )
            .trim() || "";

    const wordsPerMinute =
        200;

    const readingTime =
        Math.ceil(
            plainText.split(
                /\s+/
            ).length /
            wordsPerMinute
        );

    /* Current Blog URL */
    const currentUrl =
        `${window.location.origin}/blog/${blog.slug}`;

    /* Encoded Values */
    const encodedUrl =
        encodeURIComponent(
            currentUrl
        );

    const encodedTitle =
        encodeURIComponent(
            blog.title
        );

    /* Social Share Links */
    const facebookShare =
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const twitterShare =
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    const linkedinShare =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    return (
        <>
            <Header />

            <section className="relative w-full px-6 md:px-12 2xl:px-14 py-10 md:py-16 bg-[#FFFFFF]">

                <div className="2xl:max-w-[1270px] max-w-[900px] mx-auto">

                    {/* Category */}
                    <div className="mb-6">

                        <span className="inline-flex items-center bg-[#ECEEF2] rounded-[5rem] px-5 py-2 text-[14px] md:text-[18px] font-medium text-black">
                            {categoryText}
                        </span>

                    </div>

                    {/* Title */}
                    <h1
                        className="
                            text-[28px]
                            md:text-[40px]
                            leading-[1.3]
                            font-normal
                            text-[#0A0A0A]
                            mb-8
                        "
                        style={{
                            fontFamily:
                                "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        {blog.title}
                    </h1>

                    {/* Blog Image */}
                    <figure className="mb-8">

                        <img
                            src={
                                blog.image
                            }
                            alt={
                                blog.title
                            }
                            className="
                                w-full
                                h-auto
                                max-h-[600px]
                                object-cover
                                rounded-[20px]
                            "
                        />

                    </figure>

                    {/* Author + Date + Reading Time */}
                    <div className="flex flex-col md:flex-row md:items-center gap-8 border-b border-black/10 pb-8 mb-8">

                        {/* Author */}
                        <div>

                            <h4 className="text-[#212529] text-[18px] font-medium">
                                {blog.author ||
                                    "Admin"}
                            </h4>

                            <p className="text-[#6A7282] text-[14px] mt-1">
                                {blog.designation ||
                                    "Content Writer"}
                            </p>

                        </div>

                        {/* Publish Date */}
                        <div className="flex items-center gap-3 text-[#4A5565] text-[16px]">

                            <CalendarDays
                                size={18}
                            />

                            <span>
                                {
                                    blog.date
                                }
                            </span>

                        </div>

                        {/* Reading Time */}
                        <div className="flex items-center gap-3 text-[#4A5565] text-[16px]">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                />

                                <polyline points="12 6 12 12 16 14" />

                            </svg>

                            <span>
                                {
                                    readingTime
                                }{" "}
                                min read
                            </span>

                        </div>

                    </div>

                    {/* Social Share */}
                    <div
                        className="
                            inline-flex
                            flex-wrap
                            items-center
                            gap-3
                            border
                            border-[#0000002B]
                            rounded-[7px]
                            px-[10px]
                            py-[10px]
                            mb-10
                        "
                    >

                        {/* Share Text */}
                        <div className="flex items-center gap-2 pr-2">

                            <Share2
                                size={18}
                                className="text-[#0A0A0A]"
                            />

                            <span className="text-[16px] font-medium text-[#0A0A0A]">
                                Share
                            </span>

                        </div>

                        {/* Facebook */}
                        <Link
                            to={facebookShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                w-[40px]
                                h-[40px]
                                rounded-full
                                bg-[#EA3C26]
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:bg-black
                                transition
                            "
                        >

                            <FaFacebookF
                                size={16}
                            />

                        </Link>

                        {/* Twitter */}
                        <Link
                            to={twitterShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                w-[40px]
                                h-[40px]
                                rounded-full
                                bg-[#EA3C26]
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:bg-black
                                transition
                            "
                        >

                            <FaTwitter
                                size={16}
                            />

                        </Link>

                        {/* LinkedIn */}
                        <Link
                            to={linkedinShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                w-[40px]
                                h-[40px]
                                rounded-full
                                bg-[#EA3C26]
                                flex
                                items-center
                                justify-center
                                text-white
                                hover:bg-black
                                transition
                            "
                        >

                            <FaLinkedinIn
                                size={16}
                            />

                        </Link>

                    </div>

                    {/* Blog Content */}
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{
                            __html:
                                blog.content

                                    .replace(
                                        /<(?!h1|h2|h3|h4|h5|h6)([^>]+)\sstyle="[^"]*"/gi,
                                        "<$1"
                                    )

                                    .replace(
                                        /<span[^>]*>/gi,
                                        ""
                                    )

                                    .replace(
                                        /<\/span>/gi,
                                        ""
                                    )

                                    .replace(
                                        /<p>(\s|&nbsp;)*<\/p>/gi,
                                        ""
                                    ),
                        }}
                    />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogSingle;