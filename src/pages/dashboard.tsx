import {UserAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export function Dashboard() {
    const {session, profile, signOut} = UserAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState("Agent"); // Connecté en tant que "Agent" par défaut

    console.log(session);

    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            await signOut();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    }

    if (!session) return <p>Accès refusé. Connectez-vous.</p>;

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Bienvenue {session?.user?.email}</h2>
            <p>{profile?.name} {profile?.last_name}</p>
            <button onClick={() => setRole("Manager")} >Manager</button>
            <button onClick={() => setRole("Agent")} >Agent</button>
            <button onClick={handleSignOut}>Se déconnecter</button>
        </div>
    )
}