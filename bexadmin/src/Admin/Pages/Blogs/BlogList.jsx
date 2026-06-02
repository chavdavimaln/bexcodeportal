import React, {
    useMemo,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    Pencil,
    Trash2,
    Eye,
    ExternalLink,
} from "lucide-react";

import AdminLayout from "../../Components/Layout/AdminLayout";

const BlogList = () => {
    const [searchTerm, setSearchTerm] =
        useState("");
    const [filterCategory, setFilterCategory] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("newest");

    const [blogs, setBlogs] =
        useState(
            JSON.parse(
                localStorage.getItem(
                    "blogContents"
                )
            ) || []
        );

    const normalizeCategory = (
        value
    ) => {

        if (!value) return "";

        return value
            .toLowerCase()
            .trim();
    };

    const categories = [
        "All",
        ...new Set(
            blogs.flatMap(
                (blog) =>
                    Array.isArray(
                        blog.category
                    )
                        ? blog.category
                        : [
                            blog.category,
                        ]
            )
        ),
    ];

    const filteredBlogs =
        useMemo(() => {

            let data = [...blogs];

            /* Category Filter */
            if (
                filterCategory !==
                "All"
            ) {

                data = data.filter(
                    (blog) => {

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
                                    normalizeCategory(
                                        filterCategory
                                    )
                            );
                        }

                        return (
                            normalizeCategory(
                                blog.category
                            ) ===
                            normalizeCategory(
                                filterCategory
                            )
                        );
                    }
                );
            }

            /* Search Filter */
            if (
                searchTerm.trim()
            ) {

                const search =
                    searchTerm
                        .toLowerCase()
                        .trim();

                data = data.filter(
                    (blog) => {

                        const title =
                            blog.title
                                ?.toLowerCase() || "";

                        const author =
                            blog.author
                                ?.toLowerCase() || "";

                        const date =
                            blog.date
                                ?.toLowerCase() || "";

                        const year =
                            blog.date
                                ? new Date(
                                    blog.date
                                )
                                    .getFullYear()
                                    .toString()
                                : "";

                        const category =
                            Array.isArray(
                                blog.category
                            )
                                ? blog.category
                                    .join(
                                        " "
                                    )
                                    .toLowerCase()
                                : (
                                    blog.category ||
                                    ""
                                ).toLowerCase();

                        return (
                            title.includes(
                                search
                            ) ||
                            author.includes(
                                search
                            ) ||
                            category.includes(
                                search
                            ) ||
                            date.includes(
                                search
                            ) ||
                            year.includes(
                                search
                            )
                        );
                    }
                );
            }

            /* Sorting */
            switch (sortBy) {

                case "oldest":

                    data.sort(
                        (a, b) =>
                            a.id - b.id
                    );

                    break;

                case "titleAsc":

                    data.sort(
                        (a, b) =>
                            a.title.localeCompare(
                                b.title
                            )
                    );

                    break;

                case "titleDesc":

                    data.sort(
                        (a, b) =>
                            b.title.localeCompare(
                                a.title
                            )
                    );

                    break;

                case "category":

                    data.sort(
                        (a, b) => {

                            const catA =
                                Array.isArray(
                                    a.category
                                )
                                    ? a.category.join(
                                        ", "
                                    )
                                    : a.category;

                            const catB =
                                Array.isArray(
                                    b.category
                                )
                                    ? b.category.join(
                                        ", "
                                    )
                                    : b.category;

                            return catA.localeCompare(
                                catB
                            );
                        }
                    );

                    break;

                default:

                    data.sort(
                        (a, b) =>
                            b.id - a.id
                    );
            }

            return data;

        }, [
            blogs,
            filterCategory,
            sortBy,
            searchTerm,
        ]);

    const handleDelete = (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Delete this blog?"
            );

        if (
            !confirmDelete
        ) {
            return;
        }

        const updatedBlogs =
            blogs.filter(
                (blog) =>
                    blog.id !== id
            );

        localStorage.setItem(
            "blogContents",
            JSON.stringify(
                updatedBlogs
            )
        );

        setBlogs(
            updatedBlogs
        );
    };

    /* Clear Search Only */
    const clearSearch = () => {
        setSearchTerm("");
    };

    /* Clear All Filters */
    const clearFilters = () => {
        setSearchTerm("");
        setFilterCategory("All");
        setSortBy("newest");
    };
    return (
        <AdminLayout>

            <div>

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>

                        <h2 className="text-[32px] font-semibold">
                            Blog Management
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Total Blogs:{" "}
                            {
                                filteredBlogs.length
                            }
                        </p>

                    </div>

                    <Link
                        to="/admin/blogs/add"
                        className="
                            px-6
                            py-3
                            bg-red-600
                            text-white
                            rounded-xl
                            font-medium
                            w-fit
                        "
                    >
                        Add Blog
                    </Link>

                </div>

                {/* Filters */}
                <div
                    className="
                    bg-white
                    rounded-3xl
                    border
                    border-black/10
                    p-5
                    mb-6
                    "
                >

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">

                            <label className="block text-md font-medium mb-2">
                                Search
                            </label>

                            <div className="relative">

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                    }
                                    placeholder="
                                        Search by title,
                                        category,
                                        author,
                                        date,
                                        year...
                                    "
                                    className="
                                        w-full
                                        border
                                        rounded-xl
                                        px-4
                                        py-3
                                        pr-12
                                        text-sm
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-red-500/20
                                    "
                                />

                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-red-500
                                            hover:text-red-700
                                            transition
                                            text-sm
                                            font-medium
                                        "
                                    >
                                        ✕
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* Category */}
                        <div>

                            <label className="block text-md font-medium mb-2">
                                Category Filter
                            </label>

                            <select
                                value={filterCategory}
                                onChange={(e) =>
                                    setFilterCategory(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            >

                                {categories.map(
                                    (item) => (
                                        <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* Sort */}
                        <div>

                            <label className="block text-md font-medium mb-2">
                                Sort By
                            </label>

                            <select
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            >

                                <option value="newest">
                                    Newest First
                                </option>

                                <option value="oldest">
                                    Oldest First
                                </option>

                                <option value="titleAsc">
                                    Title A-Z
                                </option>

                                <option value="titleDesc">
                                    Title Z-A
                                </option>

                                <option value="category">
                                    Category A-Z
                                </option>

                            </select>

                        </div>

                        {/* Clear All */}
                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    w-full
                                    h-[50px]
                                    px-5
                                    bg-gray-100
                                    border
                                    border-black/10
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    hover:bg-red-600
                                    hover:text-white
                                    transition
                                "
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-black/10
                        overflow-hidden
                    "
                >

                    <div className="overflow-x-auto scrollbar-thin">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-3 py-3 text-left text-md font-medium whitespace-nowrap">
                                        Image
                                    </th>

                                    <th className="px-3 py-3 text-left text-md font-medium whitespace-nowrap">
                                        Title
                                    </th>

                                    <th className="px-3 py-3 text-left text-md font-medium whitespace-nowrap">
                                        Category
                                    </th>

                                    <th className="px-3 py-3 text-left text-md font-medium whitespace-nowrap">
                                        Date
                                    </th>

                                    <th className="px-3 py-3 text-left text-md font-medium whitespace-nowrap">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredBlogs.length >
                                    0 ? (

                                    filteredBlogs.map(
                                        (
                                            blog
                                        ) => {

                                            const category =
                                                Array.isArray(
                                                    blog.category
                                                )
                                                    ? blog.category.join(
                                                        ", "
                                                    )
                                                    : blog.category;

                                            return (

                                                <tr
                                                    key={
                                                        blog.id
                                                    }
                                                    className="border-t"
                                                >

                                                    <td className="px-3 py-2 text-[14px]">

                                                        <img
                                                            src={
                                                                blog.image
                                                            }
                                                            alt=""
                                                            className="
                                                                w-20
                                                                h-14
                                                                rounded-md
                                                                object-cover
                                                            "
                                                        />

                                                    </td>

                                                    <td className="px-3 py-2 font-medium text-[14px] max-w-[220px]">
                                                        {
                                                            blog.title
                                                        }
                                                    </td>

                                                    <td className="px-3 py-2 text-[14px]">

                                                        <span
                                                            className="
                                                                px-2
                                                                py-1
                                                                bg-gray-100
                                                                rounded-full
                                                                text-[14px]
                                                                whitespace-nowrap
                                                            "
                                                        >
                                                            {
                                                                category
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="px-3 py-2 text-[14px] whitespace-nowrap">
                                                        {
                                                            blog.date
                                                        }
                                                    </td>

                                                    <td className="px-3 py-2 text-[14px]">

                                                        <div className="flex items-center gap-1">

                                                            {/* Admin View */}
                                                            <Link
                                                                to={`/admin/blogs/view/${blog.id}`}
                                                                title="View Blog"
                                                                className="
                                                                    w-8
                                                                    h-8
                                                                    rounded-lg
                                                                    bg-blue-50
                                                                    text-blue-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    hover:bg-blue-600
                                                                    hover:text-white
                                                                    transition
                                                                "
                                                            >
                                                                <Eye size={14} />
                                                            </Link>

                                                            {/* Front View */}
                                                            <Link
                                                                to={`/blog/${blog.slug || blog.id}`}
                                                                target="_blank"
                                                                title="Front View"
                                                                className="
                                                                    w-8
                                                                    h-8
                                                                    rounded-lg
                                                                    bg-green-50
                                                                    text-green-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    hover:bg-green-600
                                                                    hover:text-white
                                                                    transition
                                                                "
                                                            >
                                                                <ExternalLink size={14} />
                                                            </Link>

                                                            {/* Edit */}
                                                            <Link
                                                                to={`/admin/blogs/edit/${blog.id}`}
                                                                title="Edit Blog"
                                                                className="
                                                                    w-8
                                                                    h-8
                                                                    rounded-lg
                                                                    bg-black
                                                                    text-white
                                                                    flex
                                                                    items-center
                                                                    justify-center  
                                                                    hover:bg-gray-700
                                                                    transition
                                                                "
                                                            >
                                                                <Pencil size={14} />
                                                            </Link>

                                                            {/* Delete */}
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        blog.id
                                                                    )
                                                                }
                                                                title="Delete Blog"
                                                                className="
                                                                    w-8
                                                                    h-8
                                                                    rounded-lg
                                                                    bg-red-600
                                                                    text-white
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    hover:bg-red-700
                                                                    transition
                                                                "
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            );
                                        }
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="
                                                py-12
                                                text-center
                                                text-gray-500
                                            "
                                        >
                                            No Blogs Found
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default BlogList;