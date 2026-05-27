// Admin/Pages/Blogs/BlogEdit.jsx

import React, {
    useEffect,
    useState,
    useMemo,
    useRef,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Check,
    X,
} from "lucide-react";

import Header from "../../../Front/Components/Header/Header";
import Footer from "../../../Front/Components/Footer/Footer";

import BlogContents from "./BlogContents";

import JoditEditor from "jodit-react";

const BlogEdit = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const editor = useRef(null);

    /* Input Refs */
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const dateRef = useRef(null);
    const categoryRef = useRef(null);
    const authorRef = useRef(null);
    const designationRef = useRef(null);

    /* Form State */
    const [form, setForm] =
        useState({
            title: "",
            image: "",
            date: "",
            author: "",
            designation: "",
            content: "",
        });

    const [categoryInput, setCategoryInput] =
        useState("");

    const [categories, setCategories] =
        useState([]);

    const [message, setMessage] =
        useState("");

    const [errors, setErrors] =
        useState({});

    /* Local Storage Blogs */
    const localBlogs = useMemo(() => {

        return (
            JSON.parse(
                localStorage.getItem(
                    "blogContents"
                )
            ) || []
        );

    }, []);

    /* Merge Static + Dynamic Blogs */
    const allBlogs = useMemo(() => {

        return [
            ...localBlogs,
            ...BlogContents,
        ];

    }, [localBlogs]);

    /* Category Options */
    const categoryOptions =
        useMemo(() => {

            const allCategories =
                allBlogs.flatMap(
                    (blog) => {

                        if (
                            Array.isArray(
                                blog.category
                            )
                        ) {
                            return blog.category;
                        }

                        return blog.category
                            ? [
                                blog.category,
                            ]
                            : [];
                    }
                );

            return [
                ...new Set(
                    allCategories
                ),
            ];

        }, [allBlogs]);

    /* Editor Config */
    const config = useMemo(() => ({
        readonly: false,

        placeholder:
            "Write full blog content...",

        height: 450,

        uploader: {
            insertImageAsBase64URI: true,
        },

        buttons: [
            "source",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "ul",
            "ol",
            "|",
            "outdent",
            "indent",
            "|",
            "font",
            "fontsize",
            "brush",
            "paragraph",
            "|",
            "image",
            "table",
            "link",
            "|",
            "align",
            "undo",
            "redo",
            "|",
            "hr",
            "eraser",
            "copyformat",
            "|",
            "fullsize",
        ],

        style: {
            font: "16px",
        },
    }), []);

    /* Fetch Existing Blog */
    useEffect(() => {

        const blogs =
            JSON.parse(
                localStorage.getItem(
                    "blogContents"
                )
            ) || [];

        const blog = blogs.find(
            (item) =>
                item.id ===
                Number(id)
        );

        if (blog) {

            setForm({
                title:
                    blog.title || "",

                image:
                    blog.image || "",

                date:
                    blog.date || "",

                author:
                    blog.author || "",

                designation:
                    blog.designation || "",

                content:
                    blog.content || "",
            });

            setCategories(
                Array.isArray(
                    blog.category
                )
                    ? blog.category
                    : blog.category
                        ? [
                            blog.category,
                        ]
                        : []
            );
        }

    }, [id]);

    /* Normalize Text */
    const normalizeText = (
        value
    ) => {

        return value
            ?.toLowerCase()
            .trim()
            .replace(
                /\s+/g,
                " "
            );
    };

    /* Duplicate Blog Check */
    const isDuplicateTitle =
        allBlogs.some(
            (blog) =>
                blog.id !==
                Number(id) &&

                normalizeText(
                    blog.title
                ) ===
                normalizeText(
                    form.title
                )
        );

    /* Scroll To Field */
    const scrollToField = (
        ref
    ) => {

        if (!ref?.current) return;

        ref.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });

        ref.current.focus();
    };

    /* Add Category */
    const addCategory = () => {

        const value =
            categoryInput.trim();

        if (!value) return;

        const alreadyExists =
            categories.some(
                (cat) =>
                    normalizeText(
                        cat
                    ) ===
                    normalizeText(
                        value
                    )
            );

        if (alreadyExists) {

            setErrors({
                category:
                    "Category already added.",
            });

            return;
        }

        setCategories([
            ...categories,
            value,
        ]);

        setCategoryInput("");

        setErrors((prev) => ({
            ...prev,
            category: "",
        }));
    };

    /* Toggle Category */
    const toggleCategory = (
        category
    ) => {

        const exists =
            categories.includes(
                category
            );

        if (exists) {

            setCategories(
                categories.filter(
                    (item) =>
                        item !==
                        category
                )
            );

        } else {

            setCategories([
                ...categories,
                category,
            ]);
        }

        setErrors((prev) => ({
            ...prev,
            category: "",
        }));
    };

    /* Remove Category */
    const removeCategory = (
        item
    ) => {

        setCategories(
            categories.filter(
                (cat) =>
                    cat !== item
            )
        );
    };

    /* Image Upload + Compress */
    const handleImage = (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        /* Max 2MB Validation */
        if (
            file.size >
            2 * 1024 * 1024
        ) {

            setErrors({
                image:
                    "Image size must be less than 2MB.",
            });

            scrollToField(
                imageRef
            );

            return;
        }

        const reader =
            new FileReader();

        reader.onload = (
            event
        ) => {

            const img =
                new Image();

            img.src =
                event.target.result;

            img.onload = () => {

                const canvas =
                    document.createElement(
                        "canvas"
                    );

                const maxWidth =
                    1200;

                let width =
                    img.width;

                let height =
                    img.height;

                if (
                    width >
                    maxWidth
                ) {

                    height =
                        (
                            height *
                            maxWidth
                        ) / width;

                    width =
                        maxWidth;
                }

                canvas.width =
                    width;

                canvas.height =
                    height;

                const ctx =
                    canvas.getContext(
                        "2d"
                    );

                ctx.drawImage(
                    img,
                    0,
                    0,
                    width,
                    height
                );

                /* Compress Image */
                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.7
                    );

                setForm({
                    ...form,
                    image:
                        compressedImage,
                });

                setErrors((prev) => ({
                    ...prev,
                    image: "",
                }));
            };
        };

        reader.readAsDataURL(
            file
        );
    };

    /* Update Blog */
    const handleSubmit = (
        e
    ) => {

        e.preventDefault();

        setMessage("");

        const newErrors = {};

        /* Title */
        if (
            form.title.trim() ===
            ""
        ) {

            newErrors.title =
                "Blog title is required.";

            scrollToField(
                titleRef
            );
        }

        /* Duplicate Title */
        else if (
            isDuplicateTitle
        ) {

            newErrors.title =
                "Blog is already added.";

            scrollToField(
                titleRef
            );
        }

        /* Image */
        else if (
            !form.image
        ) {

            newErrors.image =
                "Blog image is required.";

            scrollToField(
                imageRef
            );
        }

        /* Date */
        else if (
            form.date.trim() ===
            ""
        ) {

            newErrors.date =
                "Date & time is required.";

            scrollToField(
                dateRef
            );
        }

        /* Category */
        else if (
            categories.length ===
            0
        ) {

            newErrors.category =
                "Please add at least one category.";

            scrollToField(
                categoryRef
            );
        }

        /* Content */
        else if (
            form.content
                .replace(
                    /<[^>]*>/g,
                    ""
                )
                .trim() === ""
        ) {

            newErrors.content =
                "Blog content is required.";
        }

        /* Author */
        else if (
            form.author.trim() ===
            ""
        ) {

            newErrors.author =
                "Author name is required.";

            scrollToField(
                authorRef
            );
        }

        /* Designation */
        else if (
            form.designation.trim() ===
            ""
        ) {

            newErrors.designation =
                "Designation is required.";

            scrollToField(
                designationRef
            );
        }

        setErrors(
            newErrors
        );

        if (
            Object.keys(
                newErrors
            ).length > 0
        ) {
            return;
        }

        const blogs =
            JSON.parse(
                localStorage.getItem(
                    "blogContents"
                )
            ) || [];

        const updatedBlogs =
            blogs.map((blog) =>
                blog.id ===
                    Number(id)
                    ? {
                        ...blog,

                        ...form,

                        id: Number(id),

                        slug: form.title
                            .toLowerCase()
                            .trim()
                            .replace(
                                /[^\w\s-]/g,
                                ""
                            )
                            .replace(
                                /\s+/g,
                                "-"
                            ),

                        category:
                            categories,
                    }
                    : blog
            );

        try {

            localStorage.setItem(
                "blogContents",
                JSON.stringify(
                    updatedBlogs
                )
            );

            setMessage(
                "Blog Updated Successfully!"
            );

            setTimeout(() => {

                navigate(
                    "/admin/blogs"
                );

            }, 1000);

        } catch (error) {

            console.error(
                error
            );

            setErrors({
                storage:
                    "Storage limit exceeded. Please delete some old blogs or use smaller images.",
            });
        }
    };

    return (
        <>
            <Header />

            <section className="relative w-full px-6 md:px-12 2xl:px-14 py-10 md:py-14 bg-[#f8f8f8]">

                <div className="max-w-[1000px] mx-auto bg-white rounded-[30px] border border-black/10 p-6 md:p-10 shadow-sm">

                    <h2 className="text-[28px] md:text-[38px] font-semibold mb-8">
                        Edit Blog
                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-6"
                    >

                        {/* Title */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Blog Title
                            </label>

                            <input
                                ref={
                                    titleRef
                                }
                                type="text"
                                value={
                                    form.title
                                }
                                onChange={(
                                    e
                                ) => {

                                    setForm({
                                        ...form,
                                        title:
                                            e.target
                                                .value,
                                    });

                                    setErrors(
                                        (
                                            prev
                                        ) => ({
                                            ...prev,
                                            title:
                                                "",
                                        })
                                    );
                                }}
                                className={`
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none

                                    ${
                                        errors.title
                                            ? `
                                                border-red-500
                                              `
                                            : `
                                                border-black/10
                                              `
                                    }
                                `}
                                placeholder="Enter Blog Title"
                            />

                            {errors.title && (
                                <p className="text-red-500 text-sm mt-2">
                                    {
                                        errors.title
                                    }
                                </p>
                            )}

                        </div>

                        {/* Image */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Select Image
                            </label>

                            <input
                                ref={
                                    imageRef
                                }
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImage
                                }
                                className={`
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3

                                    ${
                                        errors.image
                                            ? `
                                                border-red-500
                                              `
                                            : `
                                                border-black/10
                                              `
                                    }
                                `}
                            />

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-2">
                                    {
                                        errors.image
                                    }
                                </p>
                            )}

                            {form.image && (
                                <img
                                    src={
                                        form.image
                                    }
                                    alt=""
                                    className="mt-4 h-[180px] rounded-xl object-cover"
                                />
                            )}

                        </div>

                        {/* Date */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Date & Time
                            </label>

                            <input
                                ref={
                                    dateRef
                                }
                                type="datetime-local"
                                value={
                                    form.date
                                }
                                onChange={(
                                    e
                                ) =>
                                    setForm(
                                        {
                                            ...form,
                                            date:
                                                e
                                                    .target
                                                    .value,
                                        }
                                    )
                                }
                                className={`
                                    w-full
                                    border
                                    rounded-xl
                                    px-4
                                    py-3

                                    ${
                                        errors.date
                                            ? `
                                                border-red-500
                                              `
                                            : `
                                                border-black/10
                                              `
                                    }
                                `}
                            />

                            {errors.date && (
                                <p className="text-red-500 text-sm mt-2">
                                    {
                                        errors.date
                                    }
                                </p>
                            )}

                        </div>

                        {/* Categories */}
                        <div ref={categoryRef}>

                            <label className="block text-sm font-medium mb-2">
                                Categories
                            </label>

                            {/* Add Category */}
                            <div className="flex flex-col md:flex-row gap-3">

                                <input
                                    type="text"
                                    value={
                                        categoryInput
                                    }
                                    onChange={(e) =>
                                        setCategoryInput(
                                            e.target.value
                                        )
                                    }
                                    className={`
                                        w-full
                                        border
                                        rounded-xl
                                        px-4
                                        py-3

                                        ${
                                            errors.category
                                                ? `
                                                    border-red-500
                                                  `
                                                : `
                                                    border-black/10
                                                  `
                                        }
                                    `}
                                    placeholder="Add New Category"
                                />

                                <button
                                    type="button"
                                    onClick={
                                        addCategory
                                    }
                                    className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-black transition"
                                >
                                    Add
                                </button>

                            </div>

                            {errors.category && (
                                <p className="text-red-500 text-sm mt-2">
                                    {
                                        errors.category
                                    }
                                </p>
                            )}

                            {/* Existing Categories */}
                            {categoryOptions.length >
                                0 && (
                                <div className="mt-5">

                                    <h4 className="text-[15px] font-medium mb-3">
                                        Select Categories
                                    </h4>

                                    <div className="flex flex-wrap gap-3">

                                        {categoryOptions.map(
                                            (
                                                item,
                                                index
                                            ) => {

                                                const isSelected =
                                                    categories.includes(
                                                        item
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            index
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            toggleCategory(
                                                                item
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            items-center
                                                            gap-2
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            border
                                                            transition

                                                            ${
                                                                isSelected
                                                                    ? `
                                                                        bg-[#EA3C26]
                                                                        border-[#EA3C26]
                                                                        text-white
                                                                      `
                                                                    : `
                                                                        bg-[#f8f8f8]
                                                                        border-black/10
                                                                        text-black
                                                                        hover:border-[#EA3C26]
                                                                        hover:text-[#EA3C26]
                                                                      `
                                                            }
                                                        `}
                                                    >

                                                        {item}

                                                        {isSelected && (
                                                            <Check
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        )}

                                                    </button>
                                                );
                                            }
                                        )}

                                    </div>

                                </div>
                            )}

                            {/* Added Categories */}
                            {categories.length >
                                0 && (
                                <div className="mt-5">

                                    <h4 className="text-[15px] font-medium mb-3">
                                        Added Categories
                                    </h4>

                                    <div className="flex flex-wrap gap-3">

                                        {categories.map(
                                            (
                                                item,
                                                index
                                            ) => (
                                                <button
                                                    key={
                                                        index
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        removeCategory(
                                                            item
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        bg-[#EA3C26]
                                                        text-white
                                                        border
                                                        border-[#EA3C26]
                                                        px-4
                                                        py-2
                                                        rounded-full
                                                        transition
                                                    "
                                                >

                                                    {
                                                        item
                                                    }

                                                    <X
                                                        size={
                                                            16
                                                        }
                                                    />

                                                </button>
                                            )
                                        )}

                                    </div>

                                </div>
                            )}

                        </div>

                        {/* Content */}
                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Blog Content
                            </label>

                            <div
                                className={`
                                    border
                                    rounded-xl
                                    overflow-hidden
                                    bg-white

                                    ${
                                        errors.content
                                            ? `
                                                border-red-500
                                              `
                                            : `
                                                border-black/10
                                              `
                                    }
                                `}
                            >

                                <JoditEditor
                                    ref={
                                        editor
                                    }
                                    value={
                                        form.content
                                    }
                                    config={
                                        config
                                    }
                                    tabIndex={1}
                                    onChange={(
                                        newContent
                                    ) =>
                                        setForm({
                                            ...form,
                                            content:
                                                newContent,
                                        })
                                    }
                                />

                            </div>

                            {errors.content && (
                                <p className="text-red-500 text-sm mt-2">
                                    {
                                        errors.content
                                    }
                                </p>
                            )}

                        </div>

                        {/* Author */}
                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Author Name
                                </label>

                                <input
                                    ref={
                                        authorRef
                                    }
                                    type="text"
                                    value={
                                        form.author
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setForm(
                                            {
                                                ...form,
                                                author:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className={`
                                        w-full
                                        border
                                        rounded-xl
                                        px-4
                                        py-3

                                        ${
                                            errors.author
                                                ? `
                                                    border-red-500
                                                  `
                                                : `
                                                    border-black/10
                                                  `
                                        }
                                    `}
                                    placeholder="Enter Name"
                                />

                                {errors.author && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {
                                            errors.author
                                        }
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Designation
                                </label>

                                <input
                                    ref={
                                        designationRef
                                    }
                                    type="text"
                                    value={
                                        form.designation
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setForm(
                                            {
                                                ...form,
                                                designation:
                                                    e
                                                        .target
                                                        .value,
                                            }
                                        )
                                    }
                                    className={`
                                        w-full
                                        border
                                        rounded-xl
                                        px-4
                                        py-3

                                        ${
                                            errors.designation
                                                ? `
                                                    border-red-500
                                                  `
                                                : `
                                                    border-black/10
                                                  `
                                        }
                                    `}
                                    placeholder="Enter Designation"
                                />

                                {errors.designation && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {
                                            errors.designation
                                        }
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Storage Error */}
                        {errors.storage && (
                            <p className="text-red-500 font-medium">
                                {
                                    errors.storage
                                }
                            </p>
                        )}

                        {/* Success */}
                        {message && (
                            <p className="text-green-600 font-medium">
                                {message}
                            </p>
                        )}

                        {/* Submit */}
                        <button className="w-full md:w-auto px-8 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-black transition">
                            Update Blog
                        </button>

                    </form>

                </div>

            </section>

            <Footer />
        </>
    );
};

export default BlogEdit;