/* eslint-disable @typescript-eslint/no-explicit-any */
import { Channel, Members } from "pusher-js";
import useActiveList from "./useActiveList";
import { useEffect, useState } from "react";
import { pusherClient } from "../libs/pusher";

const ActiveChannel = () => {
    const { set, add, remove } = useActiveList();
    const [activeChannelState, setActiveChannelState] = useState<Channel | null>(null);

    useEffect(() => {
        let channel = activeChannelState;
        if (!channel) {
            channel = pusherClient.subscribe("presence-LinkLine");
            setActiveChannelState(channel);
        }

        channel.bind('pusher:subscription_succeeded', (members: Members) => {
            const initialMembers: string[] = [];

            members.each((member: Record<string, any>) => initialMembers.push(member.id));
            set(initialMembers);
        });

        channel.bind('pusher:member_added', (member: Record<string, any>) => {
            add(member.id);
        });

        channel.bind('pusher:member_removed', (member: Record<string, any>) => {
            remove(member.id);
        });

        return () => {
            if (channel) {
                pusherClient.unsubscribe('presence-LinkLine');
                setActiveChannelState(null);
            }
            channel.unbind('pusher:subscription_succeeded', (members: Members) => {
                const initialMembers: string[] = [];
    
                members.each((member: Record<string, any>) => initialMembers.push(member.id));
                set(initialMembers);
            });
    
            channel.unbind('pusher:member_added', (member: Record<string, any>) => {
                add(member.id);
            });
    
            channel.unbind('pusher:member_removed', (member: Record<string, any>) => {
                remove(member.id);
            });
        };
        
    }, [activeChannelState, set, add, remove]);
};

export default ActiveChannel;
