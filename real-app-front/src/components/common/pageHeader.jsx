const PageHeader = ({ title, description, note = null }) => {
  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <h1>{title}</h1>
        </div>
      </div>

      {description && (
        <div className="row mt-2">
          <div className="col-12">
            <div>{description}</div>
          </div>
        </div>
      )}

      {note && <span>
        <p>{note}</p>
      </span>}
    </>
  );
};

export default PageHeader;
