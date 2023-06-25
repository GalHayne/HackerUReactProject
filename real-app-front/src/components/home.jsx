import PageHeader from "./common/pageHeader";
import useDarkContext from "../hooks/useDarkModa-context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const Home = () => {
  const { theme } = useDarkContext();

  const navigate = useNavigate();

  const { user } = useAuth();

  const description = <p>
    <span>Hayne's Card</span> Site is a site that allows users to post business cards of workplaces and professionals. Any user can register on the site. There are three types of users
    <br />
    <span>1. Normal user</span> - can view all the business cards on the site and mark and save which one he is interested.
    <br />
    <span>2. Business user</span> - can view all the cards on the site, in addition can upload business cards himself, delete and edit his business cards.
    <br />
    <span>3. Admin user</span> - can access all the information on the site, see all the tickets, delete and edit the tickets, unblock a blocked user, turn a normal user into a business user and a business user into a normal user. and delete a user.
    <br />
    As the site manager, I check the business cards that people upload, and if there is a mistake, you can delete and edit the business card. To enjoy the site you will first need to register by clicking register. The site has over 100,000 registered users and over 450,000 professional cards to talk to. So what are you waiting for register now!!!

  </p>

  return (
    <div>
      <PageHeader
        title={<>Home</>}
        description={description}
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
