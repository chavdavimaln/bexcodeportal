import React, {
    useEffect,
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

import API_URL from "../../../Config/api";

const BlogList = () => {

    const [blogs, setBlogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [filterCategory, setFilterCategory] =
        useState("All");

    const [sortBy, setSortBy] =
        useState("newest");

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs =
        async () => {

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

                    setBlogs(
                        result.data
                    );
                }

            } catch (error) {

                console.log(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    const categories = [
        "All",
    ];

    const filteredBlogs =
        useMemo(() => {

            let data =
                [...blogs];

            if (
                searchTerm.trim()
            ) {

                const search =
                    searchTerm.toLowerCase();

                data =
                    data.filter(
                        (blog) =>
                            blog.title
                                ?.toLowerCase()
                                .includes(
                                    search
                                )
                    );
            }

            switch (
            sortBy
            ) {

                case "oldest":

                    data.sort(
                        (
                            a,
                            b
                        ) =>
                            a.id -
                            b.id
                    );

                    break;

                case "titleAsc":

                    data.sort(
                        (
                            a,
                            b
                        ) =>
                            a.title.localeCompare(
                                b.title
                            )
                    );

                    break;

                case "titleDesc":

                    data.sort(
                        (
                            a,
                            b
                        ) =>
                            b.title.localeCompare(
                                a.title
                            )
                    );

                    break;

                default:

                    data.sort(
                        (
                            a,
                            b
                        ) =>
                            b.id -
                            a.id
                    );
            }

            return data;

        }, [
            blogs,
            searchTerm,
            sortBy,
        ]);

    const handleDelete =
        async (
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

            try {

                const response =
                    await fetch(
                        `${API_URL}/admin/blog/delete/${id}`,
                        {
                            method:
                                "DELETE",
                        }
                    );

                const result =
                    await response.json();

                if (
                    result.status
                ) {

                    setBlogs(
                        (
                            prev
                        ) =>
                            prev.filter(
                                (
                                    blog
                                ) =>
                                    blog.id !==
                                    id
                            )
                    );
                }

            } catch (
            error
            ) {

                console.log(
                    error
                );
            }
        };

    return (

        <AdminLayout>

            <div>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

                    <div>

                        <h2 className="text-[32px] font-semibold">
                            Blog Management
                        </h2>

                        <p className="text-gray-500 mt-1">
                            Total Blogs:
                            {" "}
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

                        <div className="lg:col-span-3">

                            <label className="block text-md font-medium mb-2">
                                Search
                            </label>

                            <input
                                type="text"
                                value={
                                    searchTerm
                                }
                                onChange={
                                    (
                                        e
                                    ) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                }
                                placeholder="Search Blog"
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                "
                            />

                        </div>

                        <div>

                            <label className="block text-md font-medium mb-2">
                                Sort By
                            </label>

                            <select
                                value={
                                    sortBy
                                }
                                onChange={
                                    (
                                        e
                                    ) =>
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

                            </select>

                        </div>

                    </div>

                </div>

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

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="px-3 py-3 text-left">
                                        Title
                                    </th>

                                    <th className="px-3 py-3 text-left">
                                        Slug
                                    </th>

                                    <th className="px-3 py-3 text-left">
                                        Status
                                    </th>

                                    <th className="px-3 py-3 text-left">
                                        Display Date
                                    </th>

                                    <th className="px-3 py-3 text-left">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-10"
                                        >
                                            Loading...
                                        </td>

                                    </tr>

                                ) : filteredBlogs.length > 0 ? (

                                    filteredBlogs.map(
                                        (
                                            blog
                                        ) => (

                                            <tr
                                                key={
                                                    blog.id
                                                }
                                                className="border-t"
                                            >

                                                <td className="px-3 py-2">
                                                    {
                                                        blog.title
                                                    }
                                                </td>

                                                <td className="px-3 py-2">
                                                    {
                                                        blog.slug
                                                    }
                                                </td>

                                                <td className="px-3 py-2">
                                                    {
                                                        blog.blog_status
                                                    }
                                                </td>

                                                <td className="px-3 py-2">
                                                    {
                                                        new Date(
                                                            blog.display_date
                                                        ).toLocaleDateString()
                                                    }
                                                </td>

                                                <td className="px-3 py-2">

                                                    <div className="flex gap-1">

                                                        <Link
                                                            to={`/admin/blogs/view/${blog.id}`}
                                                            className="
                                                                w-8
                                                                h-8
                                                                bg-blue-50
                                                                text-blue-600
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >
                                                            <Eye size={14} />
                                                        </Link>

                                                        <Link
                                                            to={`/blog/${blog.slug}`}
                                                            target="_blank"
                                                            className="
                                                                w-8
                                                                h-8
                                                                bg-green-50
                                                                text-green-600
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >
                                                            <ExternalLink size={14} />
                                                        </Link>

                                                        <Link
                                                            to={`/admin/blogs/edit/${blog.id}`}
                                                            className="
                                                                w-8
                                                                h-8
                                                                bg-black
                                                                text-white
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >
                                                            <Pencil size={14} />
                                                        </Link>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    blog.id
                                                                )
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                bg-red-600
                                                                text-white
                                                                rounded-lg
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-10"
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