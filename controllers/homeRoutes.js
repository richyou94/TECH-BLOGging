const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const userId = req.session.user_id;
    const blogData = await Blog.findAll({
      // where: { user_id: userId },
      // include: [
      //     {
      //         model: User,
      //         attributes: ['username'],
      //     },
      // ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.logged_in) {
      await res.redirect("/");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    if (req.session.logged_in) {
      await res.redirect("/");
      return;
    }
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
