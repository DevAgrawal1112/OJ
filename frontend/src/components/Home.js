import React from "react";
import { useSpring, animated, config } from "react-spring";

const Home = () => {
  const redirect = (e) => {
    e.preventDefault();
    window.location.href = "/problems";
  };
  const redirectsubmissions = (e) => {
    e.preventDefault();
    window.location.href = "/submissions/:1";
  };
  const titleAnimationProps = useSpring({
    to: { opacity: 1, transform: "translateY(0)" },
    from: { opacity: 0, transform: "translateY(-50px)" },
    config: config.wobbly,
    delay: 300,
  });

  const buttonAnimationProps = useSpring({
    to: { opacity: 1, transform: "translateY(0)" },
    from: { opacity: 0, transform: "translateY(50px)" },
    config: config.gentle,
    delay: 600,
  });

  const linkAnimationProps = useSpring({
    to: { opacity: 1, transform: "translateX(0)" },
    from: { opacity: 0, transform: "translateX(-50px)" },
    config: config.default,
    delay: 900,
  });


  return (
    <>
      <section className="homepage">
        <animated.p className="text4" style={titleAnimationProps}>
          Welcome to Our Online Judge!
        </animated.p>
        <animated.button
          className="redirectbut"
          style={{ ...buttonAnimationProps}}
          onClick={redirect}
        >
          All Problems
        </animated.button>
        <animated.button
          className="redirectbut"
          style={{ ...buttonAnimationProps }}
          onClick={redirectsubmissions}
        >
          All Submissions
        </animated.button>
        <animated.p className="text1" style={linkAnimationProps}>
          <a
            className="linkedinlink"
            href="https://www.linkedin.com/in/dev-agrawal-223b211bb/"
          >
            Linkedin
          </a>
        </animated.p>
        <animated.p className="text1" style={linkAnimationProps}>
          <a className="linkedinlink" href="https://github.com/DevAgrawal1112">
            Github
          </a>
        </animated.p>
        <animated.p className="text1" style={linkAnimationProps}>
          <a
            className="linkedinlink"
            href="https://codeforces.com/profile/agrawaldev1112"
          >
            Codeforces
          </a>
        </animated.p>
        <animated.p className="text1" style={linkAnimationProps}>
          <a
            className="linkedinlink"
            href="https://leetcode.com/dev-agrawal-1112/"
          >
            Leetcode
          </a>
        </animated.p>
      </section>
    </>
  );
};

export default Home;
