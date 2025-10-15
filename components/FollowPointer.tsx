import { motion , AnimatePresence, useMotionValue } from "framer-motion";

function FollowPointer({
  x,y,info
}:{

    x:number;
    y:number;
    info: {
        name: string;
        email: string;
        avatar: string; 
    }
}) {
  const color = stringToColor(info.email || '1')

  return (
    <motion.div>FollowPointer</motion.div>
  )
}
export default FollowPointer