const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const generateFile = require("../compilerUtils/generateFile");
const executeCode = require("../compilerUtils/execCode");

require("../db/connect");
const User = require("../model/userSchema");
const Problem = require("../model/probSchema");
const Submission = require("../model/submissionSchema");
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// home route
router.get("/", (req, res) => {
  res.send("Hello World from the router server");
});

// register route
router.post("/register", async (req, res) => {
  const { email, userid, password, cpassword } = req.body;

  if (!email || !userid || !password || !cpassword) {
    return res.status(422).json({ error: "Some fields are missing" });
  }

  if (!isValidEmail(email)) {
    return res.status(412).json({ error: "Invalid email format" });
  }

  if (!isValidPassword(password)) {
    return res.status(413).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character" });
  }
  try {
    const userEmailExist = await User.findOne({ email: email });
    const userUseridExist = await User.findOne({ userid: userid });

    if (userEmailExist) {
      return res.status(409).json({ error: "Email already Exists" });
    } else if (userUseridExist) {
      return res.status(406).json({ error: "Please make different user id" });
    } else if (password != cpassword) {
      return res.status(400).json({ error: "Passwords are not matching" });
    } else {
      const user = new User({ email, userid, password });

      await user.save();

      res.status(201).json({ message: "Registration Successful" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "You're missing some fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userLogin.generateAuthToken();

        res
          .status(201)
          .json({ token: token, message: "User Logged in Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// problems getter route
router.get("/problems", authenticate, async (req, res) => {
  try {
    const allProblems = await Problem.find({});
    res.send(allProblems);
  } catch (err) {
    console.log(err);
  }
});

// problem adder route
// currently adding problems through postman so not adding authenticate here
router.post("/addproblems", async (req, res) => {
  const {
    problemid,
    name,
    statement,
    difficulty,
    tag,
    constraints,
    sinput,
    soutput,
    intestcase,
    outtestcase,
  } = req.body;

  if (
    !problemid ||
    !name ||
    !statement ||
    !difficulty ||
    !tag ||
    !constraints ||
    !sinput ||
    !soutput ||
    !intestcase ||
    !outtestcase
  ) {
    return res.status(422).json({ error: "You're missing some fields" });
  }

  try {
    const problem = new Problem({
      problemid,
      name,
      statement,
      difficulty,
      tag,
      constraints,
      sinput,
      soutput,
      intestcase,
      outtestcase,
    });
    await problem.save();
    res.status(201).json({ message: "Problem Added Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// problem page getter route
router.get("/problem/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.findOne({ problemid: id });

    if (!problem) {
      return res
        .status(500)
        .json({ error: "Can't able to extract data from DB" });
    }

    res.send(problem);
  } catch (error) {
    console.error(error);
  }
});

// userdata getter route
router.get("/userdata", authenticate, async (req, res) => {
  try {
    res.send(req.userdata);
  } catch (err) {
    console.error(err);
  }
});

// code runner route
router.post("/run", async (req, res) => {
  const { lang, code, input, type } = req.body;
  if (!code) {
    return res.status(404).json({ error: "Please enter some code" });
  }

  try {
    const filePath = await generateFile(lang, code);
    const output = await executeCode(filePath, lang, input, type);
    res.json({ filePath, output });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// submission adder route
router.post("/addsubmission", authenticate, async (req, res) => {
  const { problemid, lang, code, userid, verdict } = req.body;

  if (!code) {
    return res.status(422).json({ error: "Write some code" });
  }

  try {
    const submission = {
      lang,
      code,
      userid,
      verdict,
    };

    const existingSubmission = await Submission.findOne({ problemid });
    if (existingSubmission) {
      existingSubmission.submissions.push(submission);
      await existingSubmission.save();
    } else {
      const newSubmission = new Submission({
        problemid,
        submissions: [submission],
      });
      await newSubmission.save();
    }

    res.status(201).json({ message: "Code Submitted Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// submission getter route
router.get("/submissions/:id", authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const submission = await Submission.findOne({ problemid: id });

    res.send(submission);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;