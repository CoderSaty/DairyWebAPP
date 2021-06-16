const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs");
const _ = require('lodash');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const lessons = [];

app.get("/", (req, res) => {
    res.render("index", { homeStartContent: homeStartingContent, lessons: lessons });
})
app.get("/about", (req, res) => {
    res.render("about", { aboutStartContent: aboutContent });
})
app.get("/contact", (req, res) => {
    res.render("contact", { contactStartContent: contactContent });
})
app.get('/compose', (req, res) => {
    res.render("compose")
})
app.post("/index", (req, res) => {
    const lesson = {
        "heading": req.body.heading,
        "message": req.body.message,
    };
    lessons.push(lesson);
    res.redirect("/");
})
app.get("/lessons/:lesson", (req, res) => {
    lessons.forEach((lesson) => {
        if (_.lowerCase(lesson.heading) === _.lowerCase(req.params.lesson)) {
            res.render("post", { heading: lesson.heading, message: lesson.message });
        }
        else {
            // console.log()
            // res.redirect("/");
            //     console.log("404 Not Found");
            // console.log(_.lowerCase(lesson.heading));
            // console.log(_.lowerCase(req.params.lesson));
        }
    })
    // console.log(req.params.lesson);
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server started");
})