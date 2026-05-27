// Admin/Pages/Blogs/BlogList.jsx

import React, {
    useMemo,
    useState,
} from "react";

import { Link } from "react-router-dom";

import BlogContents from "./BlogContents";

import Header from "../../../Admin/Components/Header/Header";
import Footer from "../../../Admin/Components/Footer/Footer";

const BlogList = () => {

    const [visibleBlogs, setVisibleBlogs] =
        useState(6);

    const [activeFilter, setActiveFilter] =
        useState("All Blogs");

    /* Normalize Category */
    const normalizeCategory = (value) => {

        if (!value) return "";

        return value
            .toLowerCase()
            .trim()

            /* Convert & to and */
            .replace(/&/g, "and")

            /* Replace slash with space */
            .replace(/\//g, " ")

            /* Remove multiple hyphens */
            .replace(/-+/g, " ")

            /* Remove special chars */
            .replace(/[^\w\s]/g, "")

            /* Remove extra spaces */
            .replace(/\s+/g, " ")
            .trim();
    };

    /* Local Storage Blogs */
    const localBlogs =
        JSON.parse(
            localStorage.getItem(
                "blogContents"
            )
        ) || [];

    /* Delete Blog */
    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this blog?"
            );

        if (!confirmDelete) return;

        const updatedBlogs =
            localBlogs.filter(
                (blog) =>
                    blog.id !== id
            );

        localStorage.setItem(
            "blogContents",
            JSON.stringify(
                updatedBlogs
            )
        );

        window.location.reload();
    };

    /* Merge Static + Dynamic Blogs */
    const allBlogs = [
        ...localBlogs,
        ...BlogContents,
    ];

    /* Remove Duplicate IDs */
    const uniqueBlogs =
        allBlogs.filter(
            (
                blog,
                index,
                self
            ) =>
                index ===
                self.findIndex(
                    (b) =>
                        b.id ===
                        blog.id
                )
        );

    /* Latest First */
    const blogs = [
        ...uniqueBlogs,
    ].sort(
        (a, b) =>
            b.id - a.id
    );

    /* Filters */
    const filters = [
        "All Blogs",
        "Blog",
        "Case Studies",
        "How-To/Tactical",
        "Pain Awareness",
    ];

    /* Filtered Blogs */
    const filteredBlogs =
        useMemo(() => {

            if (
                activeFilter ===
                "All Blogs"
            ) {
                return blogs;
            }

            const normalizedActiveFilter =
                normalizeCategory(
                    activeFilter
                );

            return blogs.filter(
                (blog) => {

                    /* Multiple Categories */
                    if (
                        Array.isArray(
                            blog.category
                        )
                    ) {

                        return blog.category.some(
                            (cat) =>
                                normalizeCategory(
                                    cat
                                ) ===
                                normalizedActiveFilter
                        );
                    }

                    /* Single Category */
                    return (
                        normalizeCategory(
                            blog.category
                        ) ===
                        normalizedActiveFilter
                    );
                }
            );

        }, [
            blogs,
            activeFilter,
        ]);

    /* Change Filter */
    const handleFilterChange = (
        filter
    ) => {

        setActiveFilter(
            filter
        );

        /* Reset Visible Blogs */
        setVisibleBlogs(6);
    };

    return (
        <>
            <Header />

            <main>

                <section
                    className="
                        relative
                        w-full
                        flex
                        flex-col
                        items-center
                        px-6
                        2xl:px-14
                        md:px-12
                        py-10
                        md:py-14
                        overflow-hidden
                    "
                    data-hide-scroll
                >

                    {/* Filters */}
                    <div
                        className="
                            w-full
                            flex
                            justify-center
                            mb-10
                        "
                    >

                        <div
                            className="
                                flex
                                flex-wrap
                                md:flex-row
                                flex-col
                                items-center
                                justify-center
                                gap-2
                                bg-[#ECECF0]
                                rounded-[15px]
                                md:rounded-[5rem]
                                p-[12px]
                            "
                        >

                            {filters.map(
                                (
                                    filter
                                ) => (

                                    <button
                                        key={
                                            filter
                                        }
                                        onClick={() =>
                                            handleFilterChange(
                                                filter
                                            )
                                        }
                                        className={`
                                            px-5
                                            py-3
                                            rounded-[5rem]
                                            text-[18px]
                                            font-medium
                                            transition
                                            whitespace-nowrap

                                            ${
                                                activeFilter ===
                                                filter
                                                    ? `
                                                        bg-[#FF2300]
                                                        text-white
                                                      `
                                                    : `
                                                        text-[#0A0A0A]
                                                        hover:text-[#FF2300]
                                                      `
                                            }
                                        `}
                                    >
                                        {
                                            filter
                                        }
                                    </button>

                                )
                            )}

                        </div>

                    </div>

                    {/* Blogs Grid */}
                    <div
                        className="
                            w-full
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                        "
                    >

                        {filteredBlogs
                            .slice(
                                0,
                                visibleBlogs
                            )
                            .map(
                                (
                                    blog
                                ) => {

                                    const categoryText =
                                        Array.isArray(
                                            blog.category
                                        )
                                            ? blog.category.join(
                                                ", "
                                            )
                                            : blog.category;

                                    return (
                                        <div
                                            key={
                                                blog.id
                                            }
                                            className="
                                                border
                                                border-[#0000001A]
                                                rounded-[30px]
                                                p-[17px]
                                                bg-white
                                                h-full
                                                flex
                                                flex-col
                                            "
                                        >

                                            {/* Image */}
                                            <figure>

                                                <Link
                                                    to={`/blog/${blog.slug || blog.id}`}
                                                >

                                                    <img
                                                        src={
                                                            blog.image
                                                        }
                                                        alt={
                                                            blog.title
                                                        }
                                                        className="
                                                            w-full
                                                            h-[185px]
                                                            object-cover
                                                            object-center
                                                            rounded-[20px]
                                                        "
                                                    />

                                                </Link>

                                            </figure>

                                            {/* Content */}
                                            <div className="pt-5 flex flex-col h-full">

                                                {/* Category */}
                                                <span
                                                    className="
                                                        w-fit
                                                        bg-[#F8F8F8]
                                                        border
                                                        border-[rgba(224,224,224,0.38)]
                                                        rounded-[9px]
                                                        px-[15px]
                                                        py-[5px]
                                                        text-[14px]
                                                        md:text-[16px]
                                                        font-semibold
                                                        text-black
                                                        capitalize
                                                    "
                                                >
                                                    {
                                                        categoryText
                                                    }
                                                </span>

                                                {/* Title */}
                                                <Link
                                                    to={`/blog/${blog.slug || blog.id}`}
                                                    className="
                                                        mt-4
                                                        text-[#0A0A0A]
                                                        text-[18px]
                                                        md:text-[22px]
                                                        font-medium
                                                        leading-snug
                                                        hover:text-[#EA3C26]
                                                        transition
                                                    "
                                                >
                                                    {
                                                        blog.title
                                                    }
                                                </Link>

                                                {/* Date */}
                                                <p className="mt-2 text-[13px] text-[#999]">
                                                    {
                                                        blog.date
                                                    }
                                                </p>

                                                {/* Excerpt */}
                                                <div
                                                    className="
                                                        mt-3
                                                        text-[15px]
                                                        md:text-[16px]
                                                        text-[#717182]
                                                        leading-[1.6]
                                                    "
                                                >

                                                    {(
                                                        blog.excerpt ||

                                                        blog.content
                                                            ?.replace(
                                                                /<[^>]+>/g,
                                                                ""
                                                            )
                                                            .replace(
                                                                /&nbsp;/g,
                                                                " "
                                                            )
                                                            .replace(
                                                                /&amp;/g,
                                                                "&"
                                                            )
                                                            .replace(
                                                                /&lt;/g,
                                                                "<"
                                                            )
                                                            .replace(
                                                                /&gt;/g,
                                                                ">"
                                                            )

                                                    )
                                                        ?.split(
                                                            " "
                                                        )
                                                        .slice(
                                                            0,
                                                            18
                                                        )
                                                        .join(
                                                            " "
                                                        )
                                                    }...

                                                </div>

                                                {/* Buttons */}
                                                <div className="flex items-center gap-3 mt-4">

                                                    {/* Edit */}
                                                    <Link
                                                        to={`/admin/blogs/edit/${blog.id}`}
                                                        className="
                                                            px-5
                                                            py-2
                                                            bg-black
                                                            text-white
                                                            rounded-full
                                                            text-sm
                                                            hover:bg-[#333]
                                                            transition
                                                        "
                                                    >
                                                        Edit
                                                    </Link>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                blog.id
                                                            )
                                                        }
                                                        className="
                                                            px-5
                                                            py-2
                                                            bg-red-500
                                                            text-white
                                                            rounded-full
                                                            text-sm
                                                            hover:bg-red-600
                                                            transition
                                                        "
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                    </div>

                    {/* No Blogs */}
                    {filteredBlogs.length ===
                        0 && (
                        <div className="text-center text-[18px] text-[#717182] mt-10">
                            No blogs found.
                        </div>
                    )}

                    {/* Load More */}
                    {visibleBlogs <
                        filteredBlogs.length && (

                        <div className="w-full flex justify-center mt-10">

                            <button
                                onClick={() =>
                                    setVisibleBlogs(
                                        (
                                            prev
                                        ) =>
                                            prev + 6
                                    )
                                }
                                className="
                                    px-8
                                    py-3
                                    rounded-full
                                    bg-black
                                    text-white
                                    text-[16px]
                                    font-medium
                                    hover:bg-[#EA3C26]
                                    transition
                                "
                            >
                                Load More
                            </button>

                        </div>

                    )}

                </section>

            </main>

            <Footer />
        </>
    );
};

export default BlogList;