// // UserProfile.jsx

// import React, {
//     useEffect,
//     useState,
// } from "react";

// import {
//     Link,
//     useParams,
// } from "react-router-dom";

// import AdminLayout from "../../Components/Layout/AdminLayout";

// const UserProfile = () => {

//     const { id } = useParams();

//     const [user, setUser] =
//         useState(null);

//     useEffect(() => {

//         const localUsers =
//             JSON.parse(
//                 localStorage.getItem(
//                     "users"
//                 )
//             ) || [];

//         const loggedUser =
//             JSON.parse(
//                 localStorage.getItem(
//                     "loggedUser"
//                 )
//             ) || {};

//         /* Find Selected User */
//         const selectedUser =
//             localUsers.find(
//                 (item) =>
//                     item.id ===
//                     Number(id)
//             );

//         /* If user not found then logged user */
//         setUser(
//             selectedUser ||
//             loggedUser
//         );

//     }, [id]);

//     if (!user) {
//         return null;
//     }

//     return (
//         <AdminLayout>

//             <div className="max-w-[1000px]">

//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-8">

//                     <h2 className="text-[30px] font-semibold">
//                         User Profile
//                     </h2>

//                     <Link
//                         to={`/admin/users/edit/${user.id}`}
//                         className="
//                             px-6
//                             py-3
//                             rounded-full
//                             bg-red-600
//                             text-white
//                             font-medium
//                         "
//                     >
//                         Edit Profile
//                     </Link>

//                 </div>

//                 {/* Profile Card */}
//                 <div
//                     className="
//                         bg-white
//                         rounded-3xl
//                         border
//                         border-black/10
//                         p-8
//                     "
//                 >

//                     <div className="flex flex-col lg:flex-row gap-10">

//                         {/* Left Profile Image */}
//                         <div className="shrink-0">

//                             <img
//                                 src={
//                                     user.profile
//                                 }
//                                 alt=""
//                                 className="
//                                     w-[220px]
//                                     h-[220px]
//                                     rounded-3xl
//                                     object-cover
//                                     border
//                                     border-black/10
//                                 "
//                             />

//                         </div>

//                         {/* Right Details */}
//                         <div className="flex-1">

//                             <div className="mb-8">

//                                 <h3 className="text-[34px] font-semibold leading-tight">
//                                     {
//                                         user.firstName
//                                     }{" "}
//                                     {
//                                         user.lastName
//                                     }
//                                 </h3>

//                                 <p className="text-gray-500 mt-2 text-[16px]">
//                                     {
//                                         user.role
//                                     }
//                                 </p>

//                             </div>

//                             {/* Details Grid */}
//                             <div className="grid md:grid-cols-2 gap-6">

//                                 {/* Username */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         Username
//                                     </p>

//                                     <h4 className="font-medium text-[18px] break-all">
//                                         {
//                                             user.username
//                                         }
//                                     </h4>

//                                 </div>

//                                 {/* Email */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         Email Address
//                                     </p>

//                                     <h4 className="font-medium text-[18px] break-all">
//                                         {
//                                             user.email
//                                         }
//                                     </h4>

//                                 </div>

//                                 {/* First Name */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         First Name
//                                     </p>

//                                     <h4 className="font-medium text-[18px]">
//                                         {
//                                             user.firstName
//                                         }
//                                     </h4>

//                                 </div>

//                                 {/* Last Name */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         Last Name
//                                     </p>

//                                     <h4 className="font-medium text-[18px]">
//                                         {
//                                             user.lastName
//                                         }
//                                     </h4>

//                                 </div>

//                                 {/* Role */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         Role
//                                     </p>

//                                     <h4 className="font-medium text-[18px]">
//                                         {
//                                             user.role
//                                         }
//                                     </h4>

//                                 </div>

//                                 {/* Password */}
//                                 <div
//                                     className="
//                                         border
//                                         border-black/10
//                                         rounded-2xl
//                                         p-5
//                                     "
//                                 >

//                                     <p className="text-gray-500 text-sm mb-2">
//                                         Password
//                                     </p>

//                                     <h4 className="font-medium text-[18px]">
//                                         ********
//                                     </h4>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </AdminLayout>
//     );
// };

// export default UserProfile;


import React, {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import AdminLayout from "../../Components/Layout/AdminLayout";

import UserData from "../Auth/UserData";

const UserProfileCopy = () => {

    const { username } =
        useParams();

    const [user, setUser] =
        useState(null);

    useEffect(() => {

        const localUsers =
            JSON.parse(
                localStorage.getItem(
                    "authUser"
                )
            ) || [];

        const allUsers = [
            ...UserData,
            ...localUsers,
        ];

        const foundUser =
            allUsers.find(
                (item) =>
                    item.username ===
                    username
            );

        if (foundUser) {
            setUser(foundUser);
        }

    }, [username]);

    if (!user) {

        return (
            <AdminLayout>
                <div className="text-[20px] font-medium">
                    User not found
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>

            <div className="max-w-[900px]">

                <h2 className="text-[30px] font-semibold mb-8">
                    User Profile
                </h2>

                <div
                    className="
                        bg-white
                        rounded-3xl
                        border
                        border-black/10
                        p-8
                    "
                >

                    <div className="flex flex-col md:flex-row gap-8">

                        <img
                            src={
                                user.profile
                            }
                            alt=""
                            className="
                                w-[180px]
                                h-[180px]
                                rounded-3xl
                                object-cover
                                border
                            "
                        />

                        <div className="space-y-5">

                            <div>

                                <h3 className="text-[32px] font-semibold">
                                    {
                                        user.firstName
                                    }{" "}
                                    {
                                        user.lastName
                                    }
                                </h3>

                                <p className="text-gray-500 mt-1">
                                    @
                                    {
                                        user.username
                                    }
                                </p>

                            </div>

                            <div className="space-y-3 text-[16px]">

                                <p>
                                    <strong>
                                        Username:
                                    </strong>{" "}
                                    {
                                        user.username
                                    }
                                </p>

                                <p>
                                    <strong>
                                        First Name:
                                    </strong>{" "}
                                    {
                                        user.firstName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Last Name:
                                    </strong>{" "}
                                    {
                                        user.lastName
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Email:
                                    </strong>{" "}
                                    {
                                        user.email
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Role:
                                    </strong>{" "}
                                    {
                                        user.role
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default UserProfileCopy;