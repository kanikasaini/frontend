import Express from "express";
import serverRender from "./serverRender";
import api from "../src/api/api";
var router = Express.Router();

router.get(
  "/",
  function(req, res, next) {
    api
      .HomePage()
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/guides/",
  function(req, res, next) {
    api
      .GuidePage()
      .then(response => response.json())
      .then(json => {
        json = response.json();
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

router.get(
  "/catalogue/*",
  function(req, res, next) {
    api
      .CataloguePage(req.url)
      .then(response => response.json())
      .then(json => {
        res.locals.ssrData = json;
        next();
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
        res.locals.ssrData = {};
        next();
      });
  },
  serverRender
);

module.exports = router;
