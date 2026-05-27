// AuthData.jsx

const AuthData =
    JSON.parse(localStorage.getItem("users")) || [
        {
            id: 1,
            fullName: "Demo User",
            email: "demo@gmail.com",
            password: "123456",
        },
        {
            id: 2,
            fullName: "vimal",
            email: "vimal@bexcodeservices.com",
            password: "123456",
        },
    ];

export default AuthData;