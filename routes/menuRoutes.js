const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");

// POST Method to addn a Menu Item
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved in menu-items collections");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET Method to get the Menu Items
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data fetched from menu items collection");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (
      tasteType === "sweet" ||
      tasteType === "sour" ||
      tasteType === "spicy"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      console.log("response fetched from menu collections");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ error: "MenuItem not found" });
    }

    console.log("data deleted");
    res.status(200).json({ message: "MenuItem deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// comment added
module.exports = router;
