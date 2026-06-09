// Admin/Pages/Blogs/Categories.jsx

import React, {
    useEffect,
    useState,
} from "react";
import {
    Pencil,
    Trash2,
} from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const Categories = () => {

    const [categories, setCategories] =
        useState([]);

    const [categoryName, setCategoryName] =
        useState("");

    const [editingId, setEditingId] =
        useState(null);

    const [error, setError] =
        useState("");

    /* Load Categories */
    useEffect(() => {

        const savedCategories =
            JSON.parse(
                localStorage.getItem(
                    "blogCategories"
                )
            ) || [];

        setCategories(
            savedCategories
        );

    }, []);

    /* Save Categories */
    const saveCategories = (
        updatedCategories
    ) => {

        localStorage.setItem(
            "blogCategories",
            JSON.stringify(
                updatedCategories
            )
        );

        setCategories(
            updatedCategories
        );
    };

    /* Add / Update Category */
    const handleSubmit = (
        e
    ) => {

        e.preventDefault();

        const value =
            categoryName.trim();

        if (!value) {

            setError(
                "Category name is required."
            );

            return;
        }

        const exists =
            categories.some(
                (item) =>
                    item.name
                        .toLowerCase()
                        .trim() ===
                    value
                        .toLowerCase()
                        .trim() &&
                    item.id !==
                    editingId
            );

        if (exists) {

            setError(
                "Category already exists."
            );

            return;
        }

        if (editingId) {

            const updated =
                categories.map(
                    (item) =>
                        item.id ===
                            editingId
                            ? {
                                ...item,
                                name: value,
                            }
                            : item
                );

            saveCategories(
                updated
            );

            setEditingId(
                null
            );

        } else {

            const updated =
                [
                    {
                        id: Date.now(),
                        name: value,
                    },
                    ...categories,
                ];

            saveCategories(
                updated
            );
        }

        setCategoryName(
            ""
        );

        setError("");
    };

    /* Edit */
    const handleEdit = (
        category
    ) => {

        setCategoryName(
            category.name
        );

        setEditingId(
            category.id
        );
    };

    /* Delete */
    const handleDelete = (
        id
    ) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this category?"
            );

        if (
            !confirmDelete
        ) {
            return;
        }

        const updated =
            categories.filter(
                (item) =>
                    item.id !== id
            );

        saveCategories(
            updated
        );
    };

    /* Count Assigned Blogs */
    const getBlogCount = (
        categoryName
    ) => {

        const blogs =
            JSON.parse(
                localStorage.getItem(
                    "blogContents"
                )
            ) || [];

        return blogs.filter(
            (blog) => {

                if (
                    Array.isArray(
                        blog.category
                    )
                ) {

                    return blog.category.some(
                        (cat) =>
                            cat
                                .toLowerCase()
                                .trim() ===
                            categoryName
                                .toLowerCase()
                                .trim()
                    );
                }

                return (
                    blog.category
                        ?.toLowerCase()
                        .trim() ===
                    categoryName
                        .toLowerCase()
                        .trim()
                );
            }
        ).length;
    };

    return (

        <AdminLayout>

            <div>

                {/* Header */}
                <div className="mb-8">

                    <h1 className="text-[32px] font-semibold">
                        Blog Categories
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage blog categories
                    </p>

                </div>

                {/* Add Category */}
                <div
                    className="
                        bg-white
                        border
                        border-black/10
                        rounded-3xl
                        p-6
                        mb-6
                    "
                >

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="
                            flex
                            flex-col
                            md:flex-row
                            gap-4
                        "
                    >

                        <input
                            type="text"
                            value={
                                categoryName
                            }
                            onChange={(e) =>
                                setCategoryName(
                                    e.target
                                        .value
                                )
                            }
                            placeholder="Enter Category Name"
                            className="
                                flex-1
                                border
                                border-black/10
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                            "
                        />

                        <button
                            type="submit"
                            className="
                                px-8
                                py-3
                                bg-red-600
                                text-white
                                rounded-xl
                                font-medium
                            "
                        >
                            {editingId
                                ? "Update Category"
                                : "Add Category"}
                        </button>

                    </form>

                    {error && (
                        <p className="text-red-500 mt-3 text-sm">
                            {error}
                        </p>
                    )}

                </div>

                {/* Categories Table */}
                <div
                    className="
                        bg-white
                        border
                        border-black/10
                        rounded-3xl
                        overflow-hidden
                    "
                >

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="p-5 text-left text-md">
                                        #
                                    </th>

                                    <th className="p-5 text-left text-md">
                                        Category
                                    </th>

                                    <th className="p-5 text-left text-md">
                                        Assigned Blogs
                                    </th>

                                    <th className="p-5 text-left text-md">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {categories.length >
                                    0 ? (

                                    categories.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <tr
                                                key={
                                                    item.id
                                                }
                                                className="border-t"
                                            >

                                                <td className="p-5">
                                                    {index + 1}
                                                </td>

                                                <td className="p-5 font-medium">
                                                    {
                                                        item.name
                                                    }
                                                </td>

                                                <td className="p-5">

                                                    <span
                                                        className="
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            bg-gray-100
                                                            text-sm
                                                        "
                                                    >
                                                        {
                                                            getBlogCount(
                                                                item.name
                                                            )
                                                        }{" "}
                                                        Blogs
                                                    </span>

                                                </td>

                                                <td className="p-5">

                                                    <div className="flex gap-2">

                                                        <button
                                                            onClick={() =>
                                                                handleEdit(item)
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                rounded-full
                                                                bg-black
                                                                text-white
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                            title="Edit"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                rounded-full
                                                                bg-red-600
                                                                text-white
                                                                flex
                                                                items-center
                                                                justify-center
                                                            "
                                                            title="Delete"
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
                                            colSpan="4"
                                            className="
                                                py-12
                                                text-center
                                                text-gray-500
                                            "
                                        >
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