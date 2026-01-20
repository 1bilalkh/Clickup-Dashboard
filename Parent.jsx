import { useState } from "react";
import IconComponent from "./IconComponent";
import BoxComponent from "./BoxComponent";


function Parent() {
  const [showBox, setShowBox] = useState(true);

  return (
    <>
      <IconComponent setShowBox={setShowBox} />
      <BoxComponent showBox={showBox} />
    </>
  );
}

export default Parent;
