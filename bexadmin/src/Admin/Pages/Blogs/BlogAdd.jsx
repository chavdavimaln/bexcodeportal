// Admin/Pages/Blogs/BlogAdd.jsx

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { Check, X, } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";

// import BlogContents from "./BlogContents";

import JoditEditor from "jodit-react";
import { apiRequest, apiRequestWithFileRequest } from "../../utils/api.interceptors.js";

// import API_URL from "../../../Config/api";

const BlogAdd = () => {

    const navigate = useNavigate();
    const editor = useRef(null);

    /* Input Refs */
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const dateRef = useRef(null);
    const categoryRef = useRef(null);
    // const authorRef = useRef(null);
    // const designationRef = useRef(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [categories, setCategories] = useState([]);

    /* Editor Config */
    const config = useMemo(() => ({
        readonly: false,
        placeholder: "Write full blog content...",
        height: 450,
        uploader: {
            insertImageAsBase64URI: true,
        },
        buttons: ["source", "|", "bold", "italic", "underline", "strikethrough", "|", "ul", "ol", "|", "outdent", "indent", "|", "font", "fontsize", "brush", "paragraph", "|", "image", "table", "link", "|", "align", "undo", "redo", "|", "hr", "eraser", "copyformat", "|", "fullsize",],
        style: { font: "16px", },
    }), []);

    /* Form State */
    const [form, setForm] =
        useState({
            title: "", image_url: null,
            date: new Date().toISOString().slice(0, 16),
            author: "",
            designation: "",
            content: "",
        });

    const [categoryInput, setCategoryInput] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});

    /* Normalize Text */
    // const normalizeText = (value) => {
    //     return value?.toLowerCase().trim().replace(/\s+/g, " ");
    // };

    /* Scroll To Field */
    const scrollToField = (ref) => {

        if (!ref?.current) return;

        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        ref.current.focus();
    };

    const fetchCategories = useCallback(async () => {
        try {
            const result = await apiRequest(
                "/admin/category/list",
                {
                    method: "GET",
                }
            );
            console.log(result.data);
            if (result.status) {
                setCategoryOptions(result.data.category);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    /* Add Category */

    const addCategory = async () => {
        const value = categoryInput.trim();

        if (!value) return;

        const alreadyExists = categoryOptions.some(
            (cat) =>
                cat.name.toLowerCase() === value.toLowerCase()
        );

        if (alreadyExists) {
            setErrors({
                category: "Category already exists.",
            });
            return;
        }

        try {
            const result = await apiRequest(
                "/admin/category/create",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (result.status) {
                const newCategory = result.data.category[0];

                // Add to category list
                setCategoryOptions((prev) => [
                    ...prev,
                    newCategory,
                ]);

                // Auto-select category
                setCategories((prev) => [
                    ...prev,
                    newCategory,
                ]);

                setCategoryInput("");
                setErrors((prev) => ({
                    ...prev,
                    category: "",
                }));
            } else {
                setErrors({
                    category:
                        result.message ||
                        "Failed to create category",
                });
            }
        } catch (error) {
            console.error(error);

            setErrors({
                category: "Something went wrong",
            });
        }
    };

    const toggleCategory = (category) => {
        setCategories((prev) =>
            prev.some((item) => item.id === category.id) ? prev.filter((item) => item.id !== category.id) : [...prev, category]
        );
    };

    /* Image Upload + Compress */
    const handleImage = (e) => {

        const file = e.target.files[0];

        if (!file) return;

        /* Max 2MB Validation */
        if (file.size > 2 * 1024 * 1024) {

            setErrors({ image_url: "Image size must be less than 2MB.", });
            scrollToField(imageRef);
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {

            const img = new Image();

            img.src = event.target.result;

            img.onload = () => {

                const canvas = document.createElement("canvas");
                const maxWidth = 1200;
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                /* Compress Image */
                const compressedImage = canvas.toDataURL("image/jpeg", 0.7);
                setForm({ ...form, image_url: compressedImage, });

                setForm((prev) => ({
                    ...prev,
                    imageFile: file,
                }));

                setErrors((prev) => ({ ...prev, image_url: "", }));
            };
        };

        reader.readAsDataURL(file);
    };

    /* Submit Blog */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const newErrors = {};

        if (form.title.trim() === "") {
            newErrors.title = "Blog title is required.";
            scrollToField(titleRef);
        }
        // else if (isDuplicateTitle) {
        //     newErrors.title = "Blog is already added.";
        //     scrollToField(titleRef);
        // } 
        else if (!form.image_url) {
            newErrors.image_url = "Blog image is required.";
            scrollToField(imageRef);
        } else if (form.date.trim() === "") {
            newErrors.date = "Date & time is required.";
            scrollToField(dateRef);
        } else if (categories.length === 0) {
            newErrors.category = "Please add at least one category.";
            scrollToField(categoryRef);
        } else if (form.content.replace(/<[^>]*>/g, "").trim() === "") {
            newErrors.content = "Blog content is required.";
        }
        // else if (form.author.trim() === "") {
        //     newErrors.author = "Author name is required.";
        //     scrollToField(authorRef);
        // } 
        // else if (form.designation.trim() === "") {
        //     newErrors.designation = "Designation is required.";
        //     scrollToField(designationRef);
        // }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }
        const category_ids = categories.map(
            (item) => item.id
        );
        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("image_url", form.imageFile);
        formData.append("display_date", form.date);
        formData.append("author", form.author);
        formData.append("designation", form.designation);
        formData.append("content", form.content);
        formData.append("category_ids", category_ids.join(','));
        // console.log(JSON.stringify(categories));
        // console.log(category_ids.join(','));
        // return false;
        try {
            const result = await apiRequestWithFileRequest("/admin/blog/create", {
                method: "POST",
                // body: JSON.stringify(newBlog),
                body: formData,
            });

            if (result.status) {
                setMessage("Blog Added Successfully!");

                setTimeout(() => {
                    navigate("/admin/blogs");
                }, 1000);
            } else {
                setErrors({ api: result.message, });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AdminLayout>

            <div>

                <h1 className="text-[32px] font-semibold mb-8">
                    Add Blog
                </h1>

                <div className="bg-white border border-black/10 rounded-[25px] p-6 md:p-8" >
                    <form onSubmit={handleSubmit} className="space-y-6" >

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Blog Title
                            </label>

                            <input ref={titleRef} type="text" value={form.title}
                                onChange={(e) => {
                                    setForm({ ...form, title: e.target.value, });
                                    setErrors((prev) => ({ ...prev, title: "", })
                                    );
                                }}
                                className={`w-full border rounded-xl px-4 py-3 outline-none  ${errors.title ? `border-red-500` : `border-black/10`}`}
                                placeholder="Enter Blog Title"
                            />

                            {errors.title && (
                                <p className="text-red-500 text-sm mt-2"> {errors.title} </p>
                            )}

                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Select Image
                            </label>

                            <input ref={imageRef} type="file" accept="image/*" onChange={handleImage}
                                className={`w-full border rounded-xl px-4 py-3 ${errors.image_url ? `border-red-500` : `border-black/10`}`}
                            />

                            {errors.image_url && (<p className="text-red-500 text-sm mt-2"> {errors.image_url} </p>)}

                            {form.image_url && (
                                <img src={form.image_url} alt="" className="mt-4 h-[180px] rounded-xl object-cover" />
                            )}

                        </div>

                        {/* Date */}
                        <div>

                            <label className="block text-sm font-medium mb-2"> Date & Time </label>

                            <input ref={dateRef} type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, })}
                                className={`w-full border rounded-xl px-4 py-3 ${errors.date ? `border-red-500` : `border-black/10`}`}
                            />
                            {errors.date && (<p className="text-red-500 text-sm mt-2"> {errors.date} </p>)}
                        </div>

                        {/* Categories */}
                        <div ref={categoryRef}>
                            <label className="block text-sm font-medium mb-2"> Categories </label>
                            <div className="flex flex-col md:flex-row gap-3">

                                <input type="text" value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}
                                    className={`w-full border rounded-xl px-4 py-3 ${errors.category ? `border-red-500` : `border-black/10`}`}
                                    placeholder="Add New Category"
                                />

                                <button type="button" onClick={addCategory} className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-black transition" >
                                    Add
                                </button>

                            </div>

                            {errors.category && (<p className="text-red-500 text-sm mt-2"> {errors.category} </p>)}

                            {/* Existing Categories */}
                            {
                                categoryOptions.length > 0 && (
                                    <div className="mt-5">

                                        <h4 className="text-[15px] font-medium mb-3">
                                            Select Categories
                                        </h4>

                                        <div className="flex flex-wrap gap-3">

                                            {categoryOptions.map((item, index) => {

                                                // const isSelected = categories.includes(item);
                                                const isSelected = categories.some(
                                                    (cat) => cat.id === item.id
                                                );

                                                return (
                                                    <button key={item.id} type="button"
                                                        onClick={() => toggleCategory(item)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
                                                            ${isSelected ? "bg-[#EA3C26] border-[#EA3C26] text-white" : "bg-[#f8f8f8] border-black/10 text-black"}`}
                                                    >
                                                        {item.name}
                                                        {isSelected && <Check size={16} />}
                                                    </button>
                                                );
                                            }
                                            )}

                                        </div>
                                    </div>
                                )}

                            {/* Added Categories */}
                            {categories.length > 0 && (
                                <div className="mt-5">

                                    <h4 className="text-[15px] font-medium mb-3">
                                        Added Categories
                                    </h4>

                                    <div className="flex flex-wrap gap-3">

                                        {categories.map((item) => (
                                            <button key={item.id} type="button"
                                                onClick={() =>
                                                    setCategories((prev) =>
                                                        prev.filter(
                                                            (cat) => cat.id !== item.id
                                                        )
                                                    )
                                                }
                                                className="flex items-center gap-2 bg-[#EA3C26] text-white border border-[#EA3C26] px-4 py-2 rounded-full"
                                            >
                                                {item.name}
                                                <X size={16} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Blog Content
                            </label>

                            <div className={`border rounded-xl overflow-hidden bg-white ${errors.content ? `border-red-500` : `border-black/10`}`} >
                                <JoditEditor ref={editor} value={form.content} config={config} tabIndex={1} onChange={(newContent) => setForm({ ...form, content: newContent, })} />
                            </div>

                            {errors.content && (<p className="text-red-500 text-sm mt-2"> {errors.content}</p>)}

                        </div>

                        {/* Author */}
                        <div className="grid md:grid-cols-2 gap-6">

                            {/*   <div>

                                <label className="block text-sm font-medium mb-2">
                                    Author Name
                                </label>

                                <input ref={authorRef} type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value, })}
                                    className={` w-full border rounded-xl px-4 py-3 ${errors.author ? `border-red-500` : `border-black/10 `} `} placeholder="Enter Name"
                                />

                                {errors.author && (<p className="text-red-500 text-sm mt-2"> {errors.author}</p>)}

                            </div> */}

                            {/*   <div>

                                <label className="block text-sm font-medium mb-2"> Designation </label>
                                <input ref={designationRef} type="text" value={form.designation}
                                    onChange={(e) => setForm({ ...form, designation: e.target.value, })}
                                    className={`w-full border rounded-xl px-4 py-3 ${errors.designation ? `border-red-500` : `border-black/10`}`}
                                    placeholder="Enter Designation"
                                />
                                {errors.designation && (<p className="text-red-500 text-sm mt-2"> {errors.designation} </p>)}
                            </div> */}
                        </div>

                        {/* Storage Error */}
                        {errors.storage && (<p className="text-red-500 font-medium"> {errors.storage} </p>)}

                        {/* Success */}
                        {message && (<p className="text-green-600 font-medium"> {message}</p>)}

                        {/* Submit */}
                        <button className="w-full md:w-auto px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black transition">
                            Submit Blog
                        </button>

                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default BlogAdd;