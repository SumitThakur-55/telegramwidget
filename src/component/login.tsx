"use client";

import { useEffect, useRef } from "react";

interface TelegramLoginButtonProps {
    onAuth: (user: any) => void;
}

const TelegramLoginButton = ({ onAuth }: TelegramLoginButtonProps) => {
    const widgetContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && widgetContainer.current) {
            const script = document.createElement("script");
            script.src = "https://telegram.org/js/telegram-widget.js?9";
            script.async = true;
            script.setAttribute("data-telegram-login", "RudramxlabsBot"); // Replace with your bot username
            script.setAttribute("data-size", "large");
            script.setAttribute("data-radius", "5");
            script.setAttribute("data-request-access", "write");
            script.setAttribute("data-auth-url", "https://660c-2409-4081-e3e-9d30-4811-3d4d-a035-e08f.ngrok-free.app/api/telegram-auth"); // Your backend URL
            script.setAttribute("data-userpic", "true");

            // Set up the `onauth` callback to pass data to the parent component
            (window as any).TelegramLoginWidget = {
                auth: (user: any) => onAuth(user),
            };

            widgetContainer.current.appendChild(script);
        }
    }, [onAuth]);

    return <div ref={widgetContainer}></div>;
};

export default TelegramLoginButton;
