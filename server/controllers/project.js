const Project = require('../models/project')
const task = require('../models/task')

const controller = {
    async getProject (req,res) {
        try {
            const projects = await Project.find().populate('user').populate(['user', 'tasks']);

            return res.json(projects)
        } catch (err) {
            res.status(400).json({err})
        }
    },
    async byId (req,res) {
        try {
            const project = await Project.findById(req.params.projectId).
            populate(['user', 'tasks']);
    
            res.send({ project });
        } catch (err) {
            res.status(400).json({err})
        }
    },
    async create (req,res) {
        try {
            const project = await Project.create({ ...req.body , user: req.userId});

            return res.send({ Project })

        } catch (err) {
            res.status(400).json({err})
        }
    },
    async updateById (req,res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.findByIdAndUpdate(req.params.projectId,{
                    title,
                    description
                }, {new: true });
    
                project.tasks = [];
                await task.deleteMany({ project: project._id });
    
                await Promise.all(tasks.map(async task => {
                    const projectTask = new Task({ ...task, project: project._id });
    
                    await projectTask.save();
    
                    project.tasks.push(projectTask);
                }));
        } catch (err) {
            res.status(400).json({err})
        }
    },
    async deleteById (req,res) {
        try {
            const project = await Project.findByIdAndRemove(req.params.projectId);

            res.send({ message: 'Project Was Deleted'});
        } catch (err) {
            res.status(400).json({err})
        }
    }
}

module.expors = controller 
