const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product }],
    });
    const tags = tagsData.map((data) => data.get({ plain: true }));
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    const tag = tagData.get({ plain: true });

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({ ...req.body });

    res.status(200).json(newTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tag) {
      res
        .status(404)
        .json({ message: `Tag with ${req.params.id} id not found.` });
      return;
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
