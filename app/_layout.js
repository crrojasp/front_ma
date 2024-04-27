import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import Home from "./(app)/Home";

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        // Define la estructura de rutas de tu proyecto
        const routeStructure = {
            "": "home",
            signIn: "signIn",
            signUp: "signUp",
            "(app)" : {
                "home" : "home"
            }
        };
        console.log("segments: ", segments);

        // Compara los segmentos actuales con la estructura de rutas
        const currentRoute = routeStructure[segments.join("/")];

        // Redirige según la lógica de autenticación y los segmentos actuales
        if (isAuthenticated) {
            if (currentRoute === "signIn" || currentRoute === "signUp") {
                router.replace('Home');
            }
        } else if (isAuthenticated == false) {
            router.replace("signIn");
        }
        
    }, [isAuthenticated]);

    return <Slot></Slot>;
};

export default function RootLayout() {
    return (
        <AuthContextProvider>
            <MainLayout/>
        </AuthContextProvider>
    );
}