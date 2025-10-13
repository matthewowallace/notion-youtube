import { auth } from "@clerk/nextjs/server"
import React from "react";

function Doclayout({children, params} : {
    children:React.ReactNode;
    params: Promise<{id: string}>
}) {
     auth().protect;
  return (
   
    <div>{children}</div>
  )
}
export default Doclayout