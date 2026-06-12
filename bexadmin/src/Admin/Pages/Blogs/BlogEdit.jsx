import React, { useEffect, useState, useMemo, useRef, } from "react";

import { useNavigate, useParams, } from "react-router-dom";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { API_URL } from "../../../Config/api";
import JoditEditor from "jodit-react";
import { apiRequest, apiRequestWithFileRequest } from "../../utils/api.interceptors.js";

const BlogEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [selectedCategoryIds, setSelectedCategoryIds,] = useState([]);

    const [form, setForm] = useState({
        title: "",
        image: "",
        date: "",
        author: "",
        designation: "",
        content: "",
    });
    useEffect(() => {

        const loadBlog = async () => {
            try {
                const result = await apiRequest(
                    `/admin/blog/details/${id}`,
                    {
                        method: "GET",
                    }
                );

                if (result.status && result.data.blog.length) {
                    const blog = result.data.blog[0];

                    setForm({
                        title: blog.title || "",
                        image: blog.image_full_url || "",
                        date: blog.display_date
                            ? new Date(blog.display_date)
                                .toISOString()
                                .slice(0, 16)
                            : "",
                        author: blog.author?.author_name || "",
                        designation: blog.designation || "",
                        content: blog.content || "",
                    });

                    setSelectedCategoryIds(
                        blog.category_ids
                            ? blog.category_ids.split(",").map(id => parseInt(id, 10))
                            : []
                    );


                    // setTimeout(() => {
                    //     console.log(blog);
                    //     console.log(categoryOptions);
                    // }, 3000);
                    // setSelectedCategoryIds(
                    //     blog.category_ids
                    //         ? blog.category_ids.split(",").map(Number)
                    //         : []
                    // );
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
        loadBlog();
    }, [id]);

    const loadCategories = async () => {
        try {
            const result = await apiRequest(
                "/admin/category/list",
                {
                    method: "GET",
                }
            );

            if (result.status) {
                setCategoryOptions(result.data.category);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const config = useMemo(() => ({
        readonly: false,
        placeholder: "Write full blog content...",
        height: 450,
        uploader: { insertImageAsBase64URI: true, },
    }), []);

    const toggleCategory = (id) => {
        if (selectedCategoryIds.includes(id)) {
            setSelectedCategoryIds(selectedCategoryIds.filter((item) => item !== id));
        } else {
            setSelectedCategoryIds([...selectedCategoryIds, id,]
            );
        }
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setForm({ ...form, image: URL.createObjectURL(file), });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const newErrors = {};
        if (!form.title.trim()) {
            newErrors.title = "Title required";
        }
        if (!selectedCategoryIds.length) {
            newErrors.category = "Select category";
        }
        if (form.content.replace(/<[^>]*>/g, "").trim() === "") {
            newErrors.content = "Content required";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("content", form.content);
            formData.append("designation", form.designation);
            formData.append("category_ids", selectedCategoryIds.join(","));
            formData.append("blog_status", "publish");
            formData.append("display_date", form.date.replace("T", " "));

            if (imageFile) {
                formData.append("image_url", imageFile);
            }
            // console.log(form);
            // console.log(selectedCategoryIds.join(","));
            // return false;
            const result = await apiRequestWithFileRequest(`/admin/blog/update/${id}`, {
                method: "PUT",
                body: formData,
            });

            if (result.status) {
                setMessage("Blog updated successfully");

                setTimeout(() => {
                    navigate("/admin/blogs");
                }, 1000);

            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
            alert("Unable to update blog");
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-10"> Loading... </div>
            </AdminLayout>
        );
    }
    return (
        <AdminLayout>
            <div>
                <h1 className="text-[32px] font-semibold mb-8"> Edit Blog </h1>
                <div className="bg-white border border-black/10 rounded-[25px] p-8">
                    <form onSubmit={handleSubmit} className="space-y-6" >
                        <div>
                            <label className="block mb-2"> Blog Title </label>
                            <input type="text" value={form.title}
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value, })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />

                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1"> {errors.title} </p>
                            )}

                        </div>
                        <div>
                            <label className="block mb-2"> Image </label>
                            <input type="file" accept="image/*" onChange={handleImage} className="w-full border rounded-xl px-4 py-3" />
                            {form.image && (
                                <img src={form.image} alt="" className="mt-4 h-[180px] rounded-xl object-cover" />
                            )}
                        </div>
                        <div>
                            <label className="block mb-2"> Date & Time </label>
                            <input type="datetime-local" value={form.date}
                                onChange={(e) =>
                                    setForm({ ...form, date: e.target.value, })
                                }
                                className="w-full border rounded-xl px-4 py-3"
                            />
                        </div>
                        <div>
                            <label className="block mb-3"> Categories </label>
                            <div className="flex flex-wrap gap-3">
                                {categoryOptions.map((item) => {
                                    const isSelected = selectedCategoryIds.includes(item.id);
                                    return (
                                        <button key={item.id} type="button" onClick={() => toggleCategory(item.id)}
                                            className={`px-4 py-2 rounded-full border ${isSelected ? "bg-red-600 text-white border-red-600" : "bg-white border-gray-300"}`} >
                                            {item.name}
                                        </button>
                                    );
                                }
                                )}
                            </div>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-2"> {errors.category} </p>
                            )}

                        </div>
                        <div>

                            <label className="block mb-2"> Content </label>

                            <JoditEditor ref={editor} value={form.content} config={config}
                                onChange={(value) =>
                                    setForm(
                                        { ...form, content: value, }
                                    )
                                }
                            />

                            {errors.content && (
                                <p className="text-red-500 text-sm mt-2"> {errors.content} </p>
                            )}

                        </div>

                        {message && (
                            <p className="text-green-600"> {message} </p>
                        )}

                        <button type="submit" className="px-8 py-3 bg-red-600 text-white rounded-full" >
                            Update Blog
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogEdit;