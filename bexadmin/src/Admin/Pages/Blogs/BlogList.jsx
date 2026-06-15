import React, { useEffect, useMemo, useState, } from "react";

import { Link, } from "react-router-dom";

import { Pencil, Trash2, ExternalLink, } from "lucide-react";

import AdminLayout from "../../Components/Layout/AdminLayout";
import { apiRequest } from "../../utils/api.interceptors.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const BlogList = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        fetchBlogs();
    }, []);
    const fetchBlogs = async () => {
        try {
            const result = await apiRequest("/admin/blog/list", { method: "GET" });
            console.log("Blog List API Response:", result);
            if (result?.status) {
                setBlogs(result.data);
            }
        } catch (error) {
            console.error("Blog Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirm = await Swal.fire({
            title: "Delete this blog?",
            text: "Are you sure, it cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) {
            return;
        }

        // if (!window.confirm("Delete this blog?")) {
        //     return;
        // }

        try {
            const result = await apiRequest(`/admin/blog/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (result?.status) {
                toast.success("Blog deleted successfully.");
                // alert("Blog deleted successfully.");
                fetchBlogs();
            } else {
                // alert( result?.message || "Failed to delete blog." );
                toast.error(result?.message || "Failed to delete blog.");
            }
        } catch (error) {
            console.error(error);
            // alert("Something went wrong.");
            toast.error("Something went wrong");
        }
    };

    const filteredBlogs = useMemo(() => {
        let data = [...blogs];
        if (searchTerm) {
            data = data.filter(
                (blog) => blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (sortBy) {
            case "oldest":
                data.sort((a, b) => a.id - b.id);
                break;
            default:
                data.sort((a, b) => b.id - a.id);
        }
        return data;
    }, [blogs, searchTerm, sortBy,]);

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

                    <Link to="/admin/blogs/add" className="px-6 py-3 bg-red-600 text-white rounded-xl h-[100%]" >
                        Add Blog
                    </Link>

                </div>

                <div className="bg-white p-5 rounded-3xl mb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Search Blog" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border rounded-xl px-4 py-3" />

                        <select value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border rounded-xl px-4 py-3 " >
                            <option value="newest"> Newest</option>
                            <option value="oldest"> Oldest</option>
                        </select>
                    </div>

                </div>

                <div className="bg-white rounded-3xl overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th className="p-3 text-left"> ID </th>
                                <th className="p-3 text-left">Title</th>
                                <th className="p-3 text-left">Slug</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-5" >
                                        Loading...
                                    </td>
                                </tr>

                            ) : filteredBlogs.length >
                                0 ? (

                                filteredBlogs.map(
                                    (blog) => (

                                        <tr key={blog.id} className="border-t" >
                                            <td className="p-3"> {blog.id} </td>
                                            <td className="p-3"> {blog.title} </td>
                                            <td className="p-3"> {blog.slug} </td>
                                            <td className="p-3"> {new Date(blog.display_date).toLocaleDateString()} </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    {/* <Link
                                                        to={`/admin/blogs/view/${blog.id}`}
                                                        className="p-2 bg-blue-100 rounded"
                                                    >
                                                        <Eye size={14} />
                                                    </Link> */}

                                                    <Link to={`/admin/blogs/edit/${blog.id}`} className="p-2 bg-black text-white rounded">
                                                        <Pencil size={14} />
                                                    </Link>

                                                    <Link to={`/blog/${blog.slug}`} target="_blank" className="p-2 bg-green-100 rounded" >
                                                        <ExternalLink size={14} />
                                                    </Link>

                                                    <button onClick={() => handleDelete(blog.id)} className="p-2 bg-red-600 text-white rounded" >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )

                            ) : (

                                <tr>
                                    <td colSpan="5" className="text-center p-5" >
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