const router = require("express").Router();
const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

router.post("/new", (req, res) => {
  const { title, description, projectId } = req.body;

  console.log(projectId, "<== PROJECT ID");

  Task.create({
    title,
    description,
    project: projectId,
  })
    .then((newlyCreatedTaskFromDB) => {
      return Project.findByIdAndUpdate(
        projectId,
        {
          $push: { tasks: newlyCreatedTaskFromDB._id },
        },
        {
          new: true,
        }
      ).populate("tasks");
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/task/:taskId", (req, res) => {
  const { taskId } = req.params;
  Task.findById(taskId)
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.json(err));
});

router.put("/task/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { title, description } = req.body;
  Task.findByIdAndUpdate(
    taskId,
    {
      title,
      description,
    },
    {
      new: true,
    }
  )
    .then((task) => {
      res.json(task);
    })
    .catch((err) => res.json(err));
});

router.delete("/:taskId", (req, res) => {
  const { taskId } = req.params;
  const { project } = req.body;

  Task.findByIdAndRemove(taskId)
    .then((removedTask) => {
      return Project.findByIdAndUpdate(project, {
        $pull: { tasks: removedTask._id },
      }).populate('tasks');
    })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
