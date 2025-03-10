import { useAuth } from "../context/AuthContext";

function ProfilePage() {
    const { user, logout } = useAuth();

    return (
        <div className="container">
            <h1>Profile Page</h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <button onClick={logout} className="btn-danger">Logout</button>
        </div>
    );
}

export default ProfilePage;
