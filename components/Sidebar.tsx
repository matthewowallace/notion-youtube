import { MenuIcon } from "lucide-react"
import NewDocumentbtn from "./NewDocumentbtn"
import { Button } from "./ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Sidebar = () => {
  
     const menuOptions = (
      <>
        <NewDocumentbtn />
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