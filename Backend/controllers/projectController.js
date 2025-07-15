import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';


export const createProject = async (req, res) => {
  try {
    const title = req.body?.title || '';
    const category = req.body?.category || '';
    const description = req.body?.description || '';
    const imageUrl = req.body?.imageUrl || '';

    if (!title || !category || !description) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const project = new Project({ title, category, description, imageUrl });
    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Project creation failed:', error.message);
    res.status(500).json({ error: error.message });
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const { title, category, description } = req.body;

    if (req.body.imageUrl && req.body.imageUrl !== project.imageUrl) {
      const oldPath = path.join(process.cwd(), project.imageUrl);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }

    project.title = title || project.title;
    project.category = category || project.category;
    project.description = description || project.description;
    project.imageUrl = req.body.imageUrl || project.imageUrl;

    await project.save();
    res.json({ message: 'Project updated with new image ', data: project });
  } catch (error) {
    console.error('Project update failed ', error.message);
    res.status(400).json({ error: error.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

