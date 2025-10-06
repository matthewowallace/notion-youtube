"use client";

import { MenuIcon } from "lucide-react"
import NewDocumentbtn from "./NewDocumentbtn"
import { Button } from "./ui/button"
import { useCollection } from "react-firebase-hooks/firestore";


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { collectionGroup, DocumentData, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";


interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {

  const { user } = useUser();
   const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  })

  const [data, loading, error] = useCollection(
    user && (
      query(
        collectionGroup(db, 'rooms'), where("userId", "==", user.emailAddresses[0].toString())
      )
    )
  );


 
useEffect(() => {

if(!data) return;

const grouped = data.docs.reduce<{
  owner: RoomDocument[];
  editor: RoomDocument[];
}>(
   (accumilator, current) =>{
      const roomData = current.data() as RoomDocument;

      if (roomData.role === "owner"){  
        accumilator.owner.push({
          id: current.id,
          ...roomData,
        });
      } else {
        accumilator.editor.push({
          id: current.id,
          ...roomData,
        });
      }

      return accumilator

   },{
     owner: [],
     editor:[],
   }
) 
  setGroupedData(grouped);
  
}, [data]);
  
     const menuOptions = (
      <div className="flex py-4 flex-col space-y-4 md:max-w-36">
        <NewDocumentbtn />

        <div className="flex py-4 flex-col space-y-4 md:max-w-36">
          {groupedData.owner.length === 0 ? (
            <h2 className="text-gray-500 font-semibold text-sm"> No Documents Found</h2>
          ) : (
            <>
              <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
              {groupedData.owner.map((doc) => (
                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
              ))}
            </>
          )}
        </div>
        {/* Shared with me  */}
        {groupedData.editor.length > 0 && (
          <div className="flex py-4 flex-col space-y-4 md:max-w-36">
            <>
              <h2 className="text-gray-500 font-semibold text-sm">Shared with Me</h2>
              {groupedData.editor.map((doc) => (
                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
              ))}
            </>
        </div>
        )}
      </div>
    );
  
  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>{menuOptions}</SheetTitle>
                <div>
                    {/* {options} */}
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:inline">
          {menuOptions}
        </div>
    </div>
  )
}
export default Sidebar