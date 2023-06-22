import PageHeader from "./common/pageHeader";
import useDarkContext from "../hooks/useDarkModa-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Home = () => {
  const { theme } = useDarkContext();

  const navigate = useNavigate();

  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        title={<>Home</>}
        description="Hayne's Cards website is a website that allows users to post business cards of workplaces and professionals. Any user can register to connect to the professional marker he likes. As the site manager, I check the business cards that people upload and if there is a mistake, the business card can be deleted and edited. To enjoy the site you will first need to register by clicking on Sign Up. The site has over 100,000 registered users and over 450,000 cards of professionals you can talk to."
        note="So what are you waiting for register now!!!"
      />
      <div className="text-center">
        {!user && (
          <button
            type="button"
            className={`btn btn-primary p-3 my-5  ${theme}`}
            onClick={() => navigate("/sign-up")}
            title="sign up now"
          >
            Sign Up Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
