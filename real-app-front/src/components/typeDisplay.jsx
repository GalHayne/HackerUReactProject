const TypeDisplay = ({setCardGalleryStyle}) => {

    const handleGalleryStyleChange = () => {
        setCardGalleryStyle()
    }

  return (
    <div>
      Type Display Card:
      <div className="form-check">
        <input
          className="form-check-input"
          onChange={() => handleGalleryStyleChange()}
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          Slider <i className="bi bi-sliders"></i>
        </label>
      </div>
    </div>
  );
};

export default TypeDisplay;
