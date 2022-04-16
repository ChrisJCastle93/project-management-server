const router = require("express").Router();
const Project = require("../models/Project.model");

router.get("/", (req, res, next) => {
  Project.find().then((projects) => {
    res.json(projects);
  });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
    .populate("tasks")
    .then((project) => {
      res.json(project);
    });
});

router.post("/new", (req, res, next) => {
  const { title, description } = req.body;
  Project.create({ title, description })
    .then((newProject) => {
      res.json(newProject);
    })
    .catch((err) => console.log(err));
});

router.put("/:projectid/update", (req, res, next) => {
  const { projectid } = req.params;
  const { title, description } = req.body;
  Project.findByIdAndUpdate(projectid, { title, description }).then(() => res.json({ message: `${projectid} updated successfully` }));
});

router.delete("/:projectid/delete", (req, res, next) => {
  const { projectid } = req.params;
  Project.findByIdAndRemove(projectid).then(() => res.json({ message: `${projectid} is kaput` }));
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
