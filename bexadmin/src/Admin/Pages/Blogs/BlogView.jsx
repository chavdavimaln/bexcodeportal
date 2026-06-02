import React from "react";
import {
    useParams,
    Link,
} from "react-router-dom";

import {
    ArrowLeft,
    ExternalLink,
} from "lucide-react";

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
                        <ArrowLeft
                            size={18}
                        />

                        Back
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
                        <ExternalLink
                            size={18}
                        />

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

                        <h1
                            className="
                                text-4xl
                                font-bold
                                mb-4
                            "
                        >
                            {blog.title}
                        </h1>

                        <p className="text-gray-500 mb-2">
                            {blog.date}
                        </p>

                        <p className="text-gray-500 mb-6">
                            {blog.author}
                        </p>

                        <div
                            dangerouslySetInnerHTML={{
                                __html:
                                    blog.content,
                            }}
                        />

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default BlogView;