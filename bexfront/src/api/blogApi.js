export const getBlogs = () => {
    return JSON.parse(
        localStorage.getItem(
            "blogContents"
        )
    ) || [];
};

export const getBlogById = (
    id
) => {

    const blogs =
        getBlogs();

    return blogs.find(
        (blog) =>
            String(blog.id) ===
            String(id)
    );
};

export const deleteBlog = (
    id
) => {

    const blogs =
        getBlogs();

    const updated =
        blogs.filter(
            (blog) =>
                blog.id !== id
        );

    localStorage.setItem(
        "blogContents",
        JSON.stringify(
            updated
        )
    );

    return updated;
};