import RakibAdminLayout from "@/Layout/dashboard/RakibAdminLayout"
import UserProfile from "@/pages/dashboard/userAdmin/UserProfilej";

const rakibAdminUser = {
    path: "/admin",
    element: <RakibAdminLayout />,
    children: [
        // {
        //     index: true,
        //     element: <UserProfile />
        // },
        {
            path: "user-profile",
            element: <UserProfile />
        },
        {
            path: "mentor-profile",
            element: <UserProfile />
        }
    ]
}

export default rakibAdminUser;