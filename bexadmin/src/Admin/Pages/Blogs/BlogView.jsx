import React from "react";

import {
    useParams,
    Link,
} from "react-router-dom";

import {
    ArrowLeft,
    ExternalLink,
    Pencil,
    CalendarDays,
    Share2,
} from "lucide-react";

import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
} from "react-icons/fa";

import AdminLayout from "../../Components/Layout/AdminLayout";

const BlogView = () => {

    const { id } =
        useParams();

    const blogs =
        JSON.parse(
            localStorage.getItem(
                "blogContents"
            )
        ) || [];

    const blog =
        blogs.find(
            (item) =>
                String(item.id) ===
                String(id)
        );
        /* Category Text */
const categoryText =
    Array.isArray(blog?.category)
        ? blog.category.join(", ")
        : blog?.category;

/* Reading Time */
const plainText =
    blog?.content
        ?.replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim() || "";

const readingTime =
    Math.ceil(
        plainText.split(/\s+/).length / 200
    );

    /* Current URL */
    const currentUrl =
        `${window.location.origin}/blog/${blog?.slug || blog?.id}`;

    const encodedUrl =
        encodeURIComponent(currentUrl);

    const encodedTitle =
        encodeURIComponent(blog?.title);

    /* Share URLs */
    const facebookShare =
        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const twitterShare =
        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

    const linkedinShare =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    if (!blog) {

        return (
            <AdminLayout>

                <div className="text-center py-20">

                    <h2 className="text-2xl font-semibold">
                        Blog Not Found
                    </h2>

                </div>

            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="max-w-5xl">

                <div className="flex flex-wrap items-center gap-3 mb-8">

                    <Link
                        to="/admin/blogs"
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            border
                            rounded-xl
                        "
                    >
                        <ArrowLeft size={18} />
                        Back
                    </Link>

                    <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-black
                            text-white
                            rounded-xl
                        "
                    >
                        <Pencil size={18} />
                        Edit Blog
                    </Link>

                    <Link
                        to={`/blog/${blog.slug || blog.id}`}
                        target="_blank"
                        className="
                            flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-green-600
                            text-white
                            rounded-xl
                        "
                    >
                        <ExternalLink size={18} />
                        Front View
                    </Link>

                </div>
                <div
                    className="
                        bg-white
                        border
                        border-black/10
                        rounded-3xl
                        overflow-hidden
                    "
                >

                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="
                            w-full
                            h-[400px]
                            object-cover
                        "
                    />

                    <div className="p-8">

                        {/* Category */}
                        <div className="mb-5">

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    px-4
                                    py-2
                                    bg-gray-100
                                    rounded-full
                                    text-sm
                                    font-medium
                                "
                            >
                                {categoryText}
                            </span>

                        </div>

                        {/* Title */}
                        <h1
                            className="
                                text-4xl
                                font-bold
                                mb-5
                            "
                        >
                            {blog.title}
                        </h1>

                        {/* Author / Date / Reading Time */}
                        <div
                            className="
                                flex
                                flex-wrap
                                gap-8
                                border-b
                                border-black/10
                                pb-6
                                mb-6
                            "
                        >

                            <div>

                                <h4 className="font-semibold">
                                    {blog.author || "Admin"}
                                </h4>

                                <p className="text-gray-500 text-sm">
                                    {blog.designation ||
                                        "Content Writer"}
                                </p>

                            </div>

                            <div className="flex items-center gap-2 text-gray-500">

                                <CalendarDays size={18} />

                                {blog.date}

                            </div>

                            <div className="flex items-center gap-2 text-gray-500">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle
                                        cx="12"
                                        cy="12"
                                        r="10"
                                    />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>

                                {readingTime} min read

                            </div>

                        </div>

                        {/* Share Section */}
                        <div
                            className="
                                inline-flex
                                flex-wrap
                                items-center
                                gap-3
                                border
                                rounded-xl
                                px-4
                                py-3
                                mb-8
                            "
                        >

                            <div className="flex items-center gap-2">

                                <Share2 size={18} />

                                <span className="font-medium">
                                    Share
                                </span>

                            </div>

                            <a
                                href={facebookShare}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-red-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-black
                                    transition
                                "
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href={twitterShare}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-red-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-black
                                    transition
                                "
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href={linkedinShare}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-red-600
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    hover:bg-black
                                    transition
                                "
                            >
                                <FaLinkedinIn />
                            </a>

                        </div>

                        {/* Blog Content */}
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.content

                                        .replace(
                                            /<(?!h1|h2|h3|h4|h5|h6)([^>]+)\sstyle="[^"]*"/gi,
                                            "<$1"
                                        )

                                        .replace(
                                            /<span[^>]*>/gi,
                                            ""
                                        )

                                        .replace(
                                            /<\/span>/gi,
                                            ""
                                        )

                                        .replace(
                                            /<p>(\s|&nbsp;)*<\/p>/gi,
                                            ""
                                        ),
                            }}
                        />

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default BlogView;