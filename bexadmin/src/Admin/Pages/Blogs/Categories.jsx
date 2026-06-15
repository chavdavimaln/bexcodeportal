
import React, { useEffect, useState, } from "react";

import { Pencil, Trash2, } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";
// import { API_URL } from "../../../Config/api";
import { apiRequest } from "../../utils/api.interceptors.js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await apiRequest("/admin/category/list",
                {
                    method: "GET",
                }
            );
            // console.log( "Category List:", result);
            if (result.status) {
                setCategories(result.data.category || []);
            }
        } catch (error) {
            console.error("Category Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!categoryName.trim()) {
            setError("Category name is required.");
            return;
        }
        try {
            let result;
            if (editingId) {
                result = await apiRequest(`/admin/category/update/${editingId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify({
                            name: categoryName,
                            cat_status: "active",
                        }),
                    }
                );
            } else {
                result = await apiRequest("/admin/category/create",
                    {
                        method: "POST",
                        body: JSON.stringify({ name: categoryName, }),
                    }
                );
            }

            if (result.status) {
                // alert(result.message);
                toast.success(result.message);
                setCategoryName("");
                setEditingId(null);
                setError("");
                fetchCategories();
            } else {
                setError(result.message || "Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            setError("Something went wrong.");
        }
    };
    const handleEdit = async (id) => {
        try {
            const result = await apiRequest(`/admin/category/details/${id}`,
                {
                    method: "GET",
                }
            );

            if (result.status) {
                const category = result.data.category[0];
                setCategoryName(category.name);
                setEditingId(category.id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Delete this category?",
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
        // const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        // if (!confirmDelete) {
        //     return;
        // }
        try {
            const result = await apiRequest(`/admin/category/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (result.status) {
                // alert(result.message);
                toast.success(result.message);
                setCategories((prev) => prev.filter((item) => item.id !== id));
            } else {
                // alert(result.message || "Delete failed.");
                toast.error(result.message || "Delete failed.");
            }
        } catch (error) {
            console.error(error);
            // alert("Delete failed.");
            toast.error("Delete failed.");
        }
    };

    return (

        <AdminLayout>
            <div>
                <div className="mb-8">
                    <h1 className="text-[32px] font-semibold"> Blog Categories </h1>
                    <p className="text-gray-500 mt-1">Manage blog categories</p>
                </div>
                <div className="bg-white border border-black/10 rounded-3xl p-6 mb-6" >
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4" >
                        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)
                        } placeholder="Enter Category Name" className="flex-1 border border-black/10 rounded-xl px-4 py-3" />
                        <button type="submit" className="px-8 py-3 bg-red-600 text-white rounded-xl" >
                            {editingId ? "Update Category" : "Add Category"}
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-500 mt-3"> {error} </p>
                    )}
                </div>
                <div className="bg-white border border-black/10 rounded-3xl overflow-hidden" >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-5 text-left">ID</th>
                                    <th className="p-5 text-left">Category</th>
                                    <th className="p-5 text-left">Status</th>
                                    <th className="p-5 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8" >
                                            Loading...
                                        </td>
                                    </tr>
                                ) : categories.length > 0 ? (
                                    categories.map((item) => (
                                        <tr key={item.id} className="border-t" >

                                            <td className="p-5"> {item.id} </td>
                                            <td className="p-5"> {item.name} </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-xs ${item.cat_status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`} >
                                                    {item.cat_status}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEdit(item.id)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center" >
                                                        <Pencil size={14} />
                                                    </button>

                                                    <button onClick={() => handleDelete(item.id)}
                                                        className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center" >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-10 text-gray-500" >
                                            No Categories Found
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

export default Categories;