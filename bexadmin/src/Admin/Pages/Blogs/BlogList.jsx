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

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

                        {/* Search */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Search
                            </label>

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search blogs..."
                                    className="
                                        flex-1
                                        border
                                        rounded-xl
                                        px-4
                                        py-3
                                    "
                                />

                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={clearSearch}
                                        className="
                                        px-4
                                        py-3
                                        rounded-xl
                                        border
                                        border-red-500
                                        text-red-600
                                        hover:bg-red-50
                                        transition
                                    "
                                    >
                                        Clear
                                    </button>
                                )}

                            </div>

                        </div>

                        {/* Category */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
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

                            <label className="block text-sm font-medium mb-2">
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
                                    px-5
                                    py-3
                                    bg-gray-100
                                    border
                                    border-black/10
                                    rounded-xl
                                    font-medium
                                    hover:bg-red-600
                                    hover:text-white
                                    transition
                                "
                            >
                                Reset All Filters
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

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[1100px]">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="p-5 text-left">
                                        Image
                                    </th>

                                    <th className="p-5 text-left">
                                        Title
                                    </th>

                                    <th className="p-5 text-left">
                                        Category
                                    </th>

                                    <th className="p-5 text-left">
                                        Date
                                    </th>

                                    <th className="p-5 text-left">
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

                                                    <td className="p-5">

                                                        <img
                                                            src={
                                                                blog.image
                                                            }
                                                            alt=""
                                                            className="
                                                                w-full
                                                                h-17
                                                                rounded-xl
                                                                object-cover
                                                            "
                                                        />

                                                    </td>

                                                    <td className="p-5 font-medium">
                                                        {
                                                            blog.title
                                                        }
                                                    </td>

                                                    <td className="p-5">

                                                        <span
                                                            className="
                                                                px-3
                                                                py-1
                                                                bg-gray-100
                                                                rounded-full
                                                                text-sm
                                                            "
                                                        >
                                                            {
                                                                category
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="p-5">
                                                        {
                                                            blog.date
                                                        }
                                                    </td>

                                                    <td className="p-5">

                                                        <div className="flex items-center gap-2">

                                                            {/* Admin View */}
                                                            <Link
                                                                to={`/admin/blogs/view/${blog.id}`}
                                                                title="View Blog"
                                                                className="
                                                                    w-10
                                                                    h-10
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
                                                                <Eye size={18} />
                                                            </Link>

                                                            {/* Front View */}
                                                            <Link
                                                                to={`/blog/${blog.slug || blog.id}`}
                                                                target="_blank"
                                                                title="Front View"
                                                                className="
                                                                    w-10
                                                                    h-10
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
                                                                <ExternalLink size={18} />
                                                            </Link>

                                                            {/* Edit */}
                                                            <Link
                                                                to={`/admin/blogs/edit/${blog.id}`}
                                                                title="Edit Blog"
                                                                className="
                                                                    w-10
                                                                    h-10
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
                                                                <Pencil size={18} />
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
                                                                    w-10
                                                                    h-10
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
                                                                <Trash2 size={18} />
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