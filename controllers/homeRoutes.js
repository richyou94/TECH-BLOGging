const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
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

router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        // {
        //   model: Comment,
        //   include: [User],
        // },
      ],
    });
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },
      ],
      where: { blog_id: req.params.id },
    });

    let comments = commentData.map((comment) => comment.get({ plain: true }));
    comments = comments.reverse();
    // const commentData = await Comment.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['username', 'id'],
    //     },
    //   ],
    //   where: { blog_id: req.params.id },
    // )};

    if (blogData) {
      const blog = blogData.get({ plain: true });

      res.render("view-blog", { blog, logged_in: req.session.logged_in, req_id: req.session.user_id, comments });
    } else {
      res.status(404).end();
    }
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
