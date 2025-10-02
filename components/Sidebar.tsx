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


interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {

  const { user } = useUser();

  const [data, loading, error] = useCollection(
    user && (
      query(
        collectionGroup(db, 'rooms'), where("userId", "==", user.emailAddresses[0].toString())
      )
    )
  );


  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  })

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
      }else {
        accumilator.editor.push({
          id:current.id,
          ...roomData,
        })
      }
      return accumilator
   },{
     owner: [],
     editor:[],
   }
) 
  setGroupedData(grouped);
  
}, [data])
  
     const menuOptions = (
      <>
        <NewDocumentbtn />

        {/* { Documents } */}
        {/* {List} */}
        
      </>
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