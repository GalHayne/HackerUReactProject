const Footer = () => {

  return (
    <div className="">
      <footer className="text-center">
        <div className="p-1 icons to 1 footer">
          <section>
            <a className="icon m-1" href="#!" role="button">
              <i class="bi bi-linkedin"></i>
            </a>
            <a  className="icon m-1" href="#!" role="button">
              <i class="bi bi-github"></i>
            </a>
            <a  className="icon m-1" href="#!" role="button">
            <i class="bi bi-whatsapp"></i>
            </a>
            <a  className="icon m-1" href="#!" role="button">
            <i class="bi bi-facebook"></i>
            </a>
            <a  className="icon m-1" href="#!" role="button">
            <i class="bi bi-instagram"></i>
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
