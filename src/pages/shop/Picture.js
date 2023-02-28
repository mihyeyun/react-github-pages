import React from "react";
import { useDrag } from "react-dnd";

function Picture({id, name, count, photo, price}) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: id, count: count },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }));
    
   
  return <><img ref={drag} src={photo} width="100px" style={{border: isDragging ? "3px solid pink" : "0px", cursor: "grab"}}></img>
        </>

};

export default Picture;
