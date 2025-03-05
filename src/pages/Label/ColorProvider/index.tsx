import { createContext, useEffect, useState } from "react";

interface ColorContext {
  color: any;
  setColor: React.Dispatch<React.SetStateAction<any>>;
}

export const ColorContext = createContext({} as ColorContext);
export default function ColorProvider(props: any) {
  const [color, setColor] = useState("#00ff1e");

  useEffect(
    () => {
      console.log("新color>>>", color);
    },
    [color]
  );
  return (
    <ColorContext.Provider
      value={{
        color,
        setColor
      }}
    >
      {props.children}
    </ColorContext.Provider>
  );
}
