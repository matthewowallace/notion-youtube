"use client";

import { Button } from "./ui/button"
import { useTransition } from "react"
import { createNewDocument } from "@/actions/actions";
import { useRouter } from "next/navigation";

const NewDocumentbtn = () => {

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      //Create Document 
      const {docId} = await createNewDocument();
      router.push(`/doc/${docId}`)
    })
  }

  return (
        <Button onClick={handleCreateNewDocument} disabled={isPending}> { isPending ? "Creating..." : "New Document"}</Button>
  )
}
export default NewDocumentbtn