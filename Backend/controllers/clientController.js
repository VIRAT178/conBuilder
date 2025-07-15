import Client from "../models/Client.js";

export const createClient = async (req, res) => {
  try {
    const { name, role, testimonial } = req.body;
    const imageUrl = req.body.imageUrl || "/uploads/default.jpg";

    const client = new Client({
      name,
      imageUrl,
      role,
      testimonial,
    });

    await client.save();
    res.status(201).json({
      message: "Client added successfully ",
      data: client,
    });
  } catch (error) {
    console.error("Client creation error ", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import fs from "fs";
import path from "path";

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: "Client not found" });

    const { name, role, testimonial } = req.body;

    if (req.body.imageUrl && req.body.imageUrl !== client.imageUrl) {
      const oldPath = path.join(process.cwd(), client.imageUrl);
      fs.existsSync(oldPath) && fs.unlinkSync(oldPath);
    }

    client.name = name || client.name;
    client.role = role || client.role;
    client.testimonial = testimonial || client.testimonial;
    client.imageUrl = req.body.imageUrl || client.imageUrl;

    await client.save();
    res.json({ message: "Client updated with new image ", data: client });
  } catch (error) {
    console.error("Client update failed ", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: "Client deleted successfully" });
};
