import { createContext, useState } from "react";

const DarkContext = createContext();

function Provider({ children }) {
    
  const [theme, setTheme] = useState("dark");

  const [galleryStyle, setGalleryStyle] = useState(true);

  const toogleTheme = (state) => {
    setTheme((prev) => {
      if (state === prev) return state;
      return prev === "light" ? "dark" : "light";
    });
  };

  const toogleStyle = () => setGalleryStyle(state => !state);

  const valueToShare = {
    toogleTheme,
    theme,
    toogleStyle,
    galleryStyle,
  };

  return (
    <DarkContext.Provider value={valueToShare}>{children}</DarkContext.Provider>
  );
}

export { Provider };
export default DarkContext;
