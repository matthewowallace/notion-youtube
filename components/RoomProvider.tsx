'use client'

import React from "react";
import{
    ClientSideSuspense,
    RoomProvider as RoomProviderWrapper,
} from "@liveblocks/react/suspense";
import { Spinner } from "@/components/ui/spinner"
import LiveCursorProvider from "./LiveCursorProvider";

function RoomProvider({roomId, children}:{
    roomId: string;
    children: React.ReactNode;
}) {
  return (
    <RoomProviderWrapper 
        id={roomId}
        initialPresence={{cursor : null}}
    ><ClientSideSuspense fallback={<Spinner />}>
            <LiveCursorProvider>
                {children}
            </LiveCursorProvider>
        </ClientSideSuspense>
    </RoomProviderWrapper>
  )
}
export default RoomProvider