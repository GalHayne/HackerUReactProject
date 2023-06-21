const TypeDisplay = ({setCardGalleryStyle,galleryStyle}) => {

    const handleGalleryStyleChange = () => {
        setCardGalleryStyle()
    }

  return (
    <div>
      Slider Display Card:
      <div className="form-check">
        <input
          className="form-check-input"
          onChange={() => handleGalleryStyleChange()}
          type="checkbox"
          checked={!galleryStyle}
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
