import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <PageHeader
      title={
        <>
          About Real<i className="bi bi-geo-fill"></i>App
        </>
      }
      description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo voluptas itaque minus? Voluptatibus odit quos porro ea assumenda quasi reiciendis corrupti, reprehenderit accusantium sed esse ratione, sapiente labore, odio debitis."
    />
  );
};

export default About;
