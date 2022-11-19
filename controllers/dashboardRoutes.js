const router = require("express").Router();
const { Blog, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: { user_id: userId },
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

router.get("/newblog", withAuth, (req, res) => {
  res.render("new-blog", { logged_in: req.session.logged_in });
});

module.exports = router;
