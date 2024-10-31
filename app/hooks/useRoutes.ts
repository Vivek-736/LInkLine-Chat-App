import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();
    
    const routes = useMemo(() => [
        {
            label: "Chat",
            href: "/conversations",
            icon: IoChatboxEllipsesSharp,
            active: pathname === "/conversations" || !!conversationId
        },
        {
            label: "Users",
            href: "/users",
            icon: FaUsers,
            active: pathname === "/users"
        },
        {
            label: "LogOut",
            icon: HiArrowLeftOnRectangle,
            onClick: () => signOut(),
            href: "#",

        }
    ], [pathname, conversationId]);

    return routes;
}

export default useRoutes;
