import React, { useEffect, useState } from 'react';
import { useUser } from '../context/usercontext';

export default function Profile() {
    const { obtenerPerfil, logout, profile } = useUser();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            await obtenerPerfil();
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="m-4">
            <h2>Tu perfil</h2>
            <form>
                <label htmlFor="usermail">Mail usuario: </label>
                <input
                    type="text"
                    name="usermail"
                    value={profile?.email || ''}
                    readOnly
                />
            </form>

            <button className="btn btn-primary my-3" onClick={logout}>
                Cerrar sesión
            </button>
        </div>
    );
}
