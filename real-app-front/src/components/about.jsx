import PageHeader from "./common/pageHeader";

const About = () => {
  const description = (
    <div>
      <p>
        A brief description of the site: First you must choose which user you
        want to <span className="bold">sign up</span> to one of the three users
        (normal user, business user, administrator user) and then{" "}
        <span className="bold">sign in </span> to the site
      </p>

      <p>
        <span className="bold">Normal user </span> - as a normal user you can
        see all the cards you have uploaded to the website by clicking on my
        cards. If you liked one of the cards, you can click on the star to the
        left of the card and the card will be saved in your{" "}
        <span className="bold">favorite cards.</span> You can download it from
        there by clicking the star again. You can view only the cards you liked
        by clicking on <span className="bold">favorite cards.</span> If you
        would like to see a map of the business owner or other details in a
        large display, click on the right corner of the card and a large screen
        of the card will open containing all the details of the owner of the
        SEC.
      </p>

      <p>
        <span className="bold">Business user </span> - He has all the privileges
        that a normal user has and can add cards of professionals, edit them if
        there is a change or delete the cards he created.
      </p>
      <p>
        <span className="bold">Admin user </span> - he has all the site
        administration privileges and all the privileges that the other users
        have. Can by clicking on <span className="bold">CRM</span> to get a
        table of all users registered to the site. Turn a normal user into a
        business user. Turn a business user into a normal user. Delete a
        non-admin user. Delete and edit any card found on the site.
      </p>

      <p>
        Except for admin, any user who tried to log in 3 times without success
        within 24 hours will be blocked. The block will be removed by a request
        from the admin
      </p>

      <p>
        The state in which the site goes up with it is a dark mode. On the site,
        it is possible to switch between dark mode and light mode by clicking on
        the moon/sun on the top right.
      </p>

      <p>
        Each button on the site has a tool tip that explains the purpose of the
        button or what it is used for.
      </p>
    </div>
  );

  return (
    <div>
      <PageHeader title={<>About</>} description={description} />
    </div>
  );
};

export default About;
