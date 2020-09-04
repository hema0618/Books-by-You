// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const wishlist = require("../models/wishlist");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/api/wishlist", (req, res) => {
    console.log("GET /API/wishlist", req.body);
    db.Wishlist.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(function(data){
      res.json(data);
    })
  })

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.post("/api/wishlist", (req, res) => {
    console.log("POST /api/wishlist");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      return res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log(req.body);
      console.log(req.user);
      db.Wishlist.create({
        rating: req.body.rating,
        page_count: req.body.page_count,
        author: req.body.author,
        title: req.body.title,
        card_img: req.body.card_img,
        UserId: req.user.id,
        buy_link: req.body.buy_link,
        price: req.body.price,
        description: req.body.description

        
      })
        .then((result) => {
         return res.json(result);
         console.log(result);
        })
        .catch(err => {
          console.log(err)
         return res.status(401).json(err);
        });
    }
  });
};
