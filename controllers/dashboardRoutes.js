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
    let blogs = blogData.map((blog) => blog.get({ plain: true }));
    blogs = blogs.reverse();

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

router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {});
    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render("update-blog", { blog, logged_in: req.session.logged_in });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
