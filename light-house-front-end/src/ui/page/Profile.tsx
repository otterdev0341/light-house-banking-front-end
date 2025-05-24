import useUserStore from "../../store/user_store";

export const ProfilePage = () => {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
                <p className="text-lg">No user information available.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <div className="text-lg">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>First Name:</strong> {user.first_name}</p>
                <p><strong>Last Name:</strong> {user.last_name}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>User Role:</strong> {user.user_role}</p>
            </div>
        </div>
    );
};