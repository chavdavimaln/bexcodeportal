// src/Front/Pages/Blogs/BlogSingle.jsx

import React, {
    useEffect,
    useState,
} from "react";

import {
    useParams,
    Navigate,
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

import { API_URL } from "../../../Config/api";

const BlogSingle = () => {

    const { slug } = useParams();

    const [blog, setBlog] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {

        try {

            const response =
                await fetch(
                    `${API_URL}/admin/blog/list`
                );

            const result =
                await response.json();

            if (
                result.status
            ) {

                const foundBlog =
                    result.data.find(
                        (item) =>
                            item.slug === slug
                    );

                setBlog(
                    foundBlog || null
                );
            }

        } catch (error) {

            console.error(
                "Blog Fetch Error:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="py-20 text-center">
                    Loading...
                </div>
                <Footer />
            </>
        );
    }

    if (!blog) {
        return (
            <Navigate
                to="/blogs"
                replace
            />
        );
    }

    const categoryText =
        Array.isArray(
            blog.category
        )
            ? blog.category.join(", ")
            : blog.category || "Blog";

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

    const readingTime =
        Math.max(
            1,
            Math.ceil(
                plainText.split(/\s+/)
                    .length / 200
            )
        );

    const currentUrl =
        `${window.location.origin}/blog/${blog.slug}`;

    const encodedUrl =
        encodeURIComponent(
            currentUrl
        );

    const encodedTitle =
        encodeURIComponent(
            blog.title
        );

    const facebookShare =
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const twitterShare =
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    const linkedinShare =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

    const imageUrl =
        blog.image_full_url
            ? blog.image_full_url
            : blog.image_url
                ? `http://api.bexcod.com${blog.image_url}`
                : "/no-image.jpg";

    return (
        <>
            <Header />

            <section
                className="
                    relative
                    w-full
                    px-6
                    md:px-12
                    2xl:px-14
                    py-10
                    md:py-16
                    bg-white
                "
            >

                <div className="max-w-[900px] mx-auto">

                    {/* Category */}
                    <div className="mb-6">
                        <span
                            className="
                                inline-flex
                                items-center
                                bg-[#ECEEF2]
                                rounded-full
                                px-5
                                py-2
                                text-sm
                                font-medium
                            "
                        >
                            {categoryText}
                        </span>
                    </div>

                    {/* Title */}
                    <h1
                        className="
                            text-[28px]
                            md:text-[40px]
                            leading-[1.3]
                            mb-8
                        "
                    >
                        {blog.title}
                    </h1>

                    {/* Featured Image */}
                    <figure className="mb-8">

                        <img
                            src={imageUrl}
                            alt={blog.title}
                            className="
                                w-full
                                rounded-[20px]
                                object-cover
                            "
                        />

                    </figure>

                    {/* Meta */}
                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            gap-8
                            border-b
                            pb-8
                            mb-8
                        "
                    >

                        <div>
                            <h4 className="font-medium">
                                {blog.author ||
                                    "Admin"}
                            </h4>

                            <p className="text-gray-500 text-sm">
                                Content Writer
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarDays
                                size={18}
                            />

                            <span>
                                {blog.display_date
                                    ? new Date(
                                        blog.display_date
                                    ).toLocaleDateString()
                                    : ""}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>

                            <span>
                                {readingTime}
                                {" "}
                                min read
                            </span>

                        </div>

                    </div>

                    {/* Share */}
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-3
                            border
                            rounded-lg
                            px-3
                            py-3
                            mb-10
                        "
                    >

                        <div className="flex items-center gap-2">
                            <Share2 size={18} />
                            <span>
                                Share
                            </span>
                        </div>

                        <a
                            href={facebookShare}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#EA3C26]
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href={twitterShare}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#EA3C26]
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <FaTwitter />
                        </a>

                        <a
                            href={linkedinShare}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                w-10
                                h-10
                                rounded-full
                                bg-[#EA3C26]
                                text-white
                                flex
                                items-center
                                justify-center
                            "
                        >
                            <FaLinkedinIn />
                        </a>

                    </div>

                    {/* Content */}
                    <div
                        className="blog-content"
                        dangerouslySetInnerHTML={{
                            __html:
                                blog.content || "",
                        }}
                    />

                </div>

            </section>

            <Footer />
        </>
    );
};

export default BlogSingle;