import { useEffect, useState } from "react";
import { motion } from "framer-motion";


function LandingPage() {
  const [Rotate, setRotate] = useState(0);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      let MouseX = e.clientX;
      let MouseY = e.clientY;

      let DeltaX = MouseX - window.innerWidth / 2;
      let DeltaY = MouseY - window.innerHeight / 2;

      var angle = Math.atan2(DeltaY, DeltaX) * (180 / Math.PI);
      setRotate(angle - 180);
    });
  });

  return (
    <div data-scroll-containeer className="w-full h-screen overflow-hidden cursor-pointer">
      <div data-scroll data-scroll-speed="-.7" className='relative w-full h-full bg-center bg-cover bg-[url("https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-scaled.jpg")]'>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 flex justify-between">
          <div className="w-[15vw] h-[15vw] bg-white rounded-full flex items-center justify-center">
            <div className="w-2/3 h-2/3 bg-black rounded-full overflow-hidden relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-2xl font-[regular] text-white">Play</h1>
              </div>
              <motion.div
                transition={{ ease: "linear" }}
                style={{
                  transform: `translate(-50%,-50%) rotate(${Rotate}deg)`,
                }}
                className="line w-full h-8 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
              >
                <div className="w-12 h-12 rounded-full bg-white"></div>
              </motion.div>
            </div>
          </div>
          <div className="w-[15vw] h-[15vw] bg-white rounded-full flex items-center justify-center">
            <div className="w-2/3 h-2/3 bg-black rounded-full overflow-hidden relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-2xl font-[regular] text-white">Play</h1>
              </div>
              <motion.div
                transition={{ ease: "linear" }}
                style={{
                  transform: `translate(-50%,-50%) rotate(${Rotate}deg)`,
                }}
                className="line w-full h-8 absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]"
              >
                <div className="w-12 h-12 rounded-full bg-white"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;