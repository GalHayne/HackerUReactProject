import PageHeader from "./common/pageHeader";

const Home = () => {
  return (
    <PageHeader
      title={
        <>
          Real<i className="bi bi-geo-fill"></i>App
        </>
      }
      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo voluptas itaque minus? Voluptatibus odit quos porro ea assumenda quasi reiciendis corrupti, reprehenderit accusantium sed esse ratione, sapiente labore, odio debitis."
    />
  );
};

export default Home;
