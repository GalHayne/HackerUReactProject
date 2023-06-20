import useDarkContext from "../hooks/useDarkModa-context";

const Footer = () => {

  const { theme} = useDarkContext();

  return (
    <footer className="pt-3 py-2 text-center" id={`footer-${theme}`}>
      <span>
        Real<i className="bi bi-geo-fill"></i>App
      </span>
      <span className="mx-2">&copy;</span>
      <span>{new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
