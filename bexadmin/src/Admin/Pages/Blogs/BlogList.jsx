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

const BlogList = () => {

    const [blogs, setBlogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [sortBy, setSortBy] =
        useState("newest");

    useEffect(() => {

        fetchBlogs();

    }, []);

    const fetchBlogs = async () => {

        try {

            const response =
                await fetch(
                    "http://localhost:5000/admin/blog/list"
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

            console.error(
                error
            );

        } finally {

            setLoading(
                false
            );
        }
    };

    const handleDelete =
        async (id) => {

            if (
                !window.confirm(
                    "Delete this blog?"
                )
            ) {
                return;
            }

            try {

                const response =
                    await fetch(
                        `http://localhost:5000/admin/blog/delete/${id}`,
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

                    fetchBlogs();
                }

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const filteredBlogs =
        useMemo(() => {

            let data =
                [...blogs];

            if (
                searchTerm
            ) {

                data =
                    data.filter(
                        (
                            blog
                        ) =>
                            blog.title
                                ?.toLowerCase()
                                .includes(
                                    searchTerm.toLowerCase()
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

    return (
        <AdminLayout>

            <div>

                <div className="flex justify-between mb-8">

                    <div>

                        <h2 className="text-[32px] font-semibold">
                            Blog Management
                        </h2>

                        <p className="text-gray-500">
                            Total Blogs :
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
                        "
                    >
                        Add Blog
                    </Link>

                </div>

                <div className="bg-white p-5 rounded-3xl mb-6">

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="Search Blog"
                            value={
                                searchTerm
                            }
                            onChange={(
                                e
                            ) =>
                                setSearchTerm(
                                    e.target
                                        .value
                                )
                            }
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        />

                        <select
                            value={
                                sortBy
                            }
                            onChange={(
                                e
                            ) =>
                                setSortBy(
                                    e.target
                                        .value
                                )
                            }
                            className="
                                border
                                rounded-xl
                                px-4
                                py-3
                            "
                        >
                            <option value="newest">
                                Newest
                            </option>

                            <option value="oldest">
                                Oldest
                            </option>

                        </select>

                    </div>

                </div>

                <div className="bg-white rounded-3xl overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-3 text-left">
                                    ID
                                </th>

                                <th className="p-3 text-left">
                                    Title
                                </th>

                                <th className="p-3 text-left">
                                    Slug
                                </th>

                                <th className="p-3 text-left">
                                    Date
                                </th>

                                <th className="p-3 text-left">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-5"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : filteredBlogs.length >
                                0 ? (

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

                                            <td className="p-3">
                                                {
                                                    blog.id
                                                }
                                            </td>

                                            <td className="p-3">
                                                {
                                                    blog.title
                                                }
                                            </td>

                                            <td className="p-3">
                                                {
                                                    blog.slug
                                                }
                                            </td>

                                            <td className="p-3">
                                                {
                                                    new Date(
                                                        blog.display_date
                                                    ).toLocaleDateString()
                                                }
                                            </td>

                                            <td className="p-3">

                                                <div className="flex gap-2">

                                                    <Link
                                                        to={`/admin/blogs/view/${blog.id}`}
                                                        className="p-2 bg-blue-100 rounded"
                                                    >
                                                        <Eye size={14} />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/blogs/edit/${blog.id}`}
                                                        className="p-2 bg-black text-white rounded"
                                                    >
                                                        <Pencil size={14} />
                                                    </Link>

                                                    <Link
                                                        to={`/blog/${blog.slug}`}
                                                        target="_blank"
                                                        className="p-2 bg-green-100 rounded"
                                                    >
                                                        <ExternalLink size={14} />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                blog.id
                                                            )
                                                        }
                                                        className="p-2 bg-red-600 text-white rounded"
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
                                        className="text-center p-5"
                                    >
                                        No Blogs Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>
    );
};

export default BlogList;