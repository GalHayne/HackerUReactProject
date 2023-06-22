const Footer = () => {

  return (
    <div className="">
      <footer className="text-center">
        <div className="p-1 icons to 1 footer">
          <section>
            <a className="icon m-1" title="linkdin" href="https://www.linkedin.com/in/%E2%80%AAgal-hayne%E2%80%AC%E2%80%8F-0a1076267/"  target="_blank" role="button" rel="noreferrer">
              <i className="bi bi-linkedin"></i>
            </a>
            <a  className="icon m-1" title="github" href="https://github.com/galhayne" target="_blank" role="button" rel="noreferrer">
              <i className="bi bi-github"></i>
            </a>
            <a  className="icon m-1" title="whatsapp" href="https://whatsapp.com"  target="_blank" role="button" rel="noreferrer">
            <i className="bi bi-whatsapp"></i>
            </a>
            <a  className="icon m-1" title="facebook" href="https://www.facebook.com/" target="_blank" role="button" rel="noreferrer">
            <i className="bi bi-facebook"></i>
            </a>
            <a  className="icon m-1" title="instagram" href="https://www.instagram.com/ramipamoni/" target="_blank" role="button" rel="noreferrer">
            <i className="bi bi-instagram"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright: Gal Hayne
        </div>
      </footer>
    </div>
  );
};

export default Footer;
