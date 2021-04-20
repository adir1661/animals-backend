const express = require('express');
const Animal = require('../models/animal');
const router = express.Router();

router.post('/', async (req, res) => {
    const { pet } = req.body;
    console.log(req.user);
    let animal =  new Animal(pet);
    animal = await animal.save()
    res.json(animal);
})

router.get('/', async (req, res) => {
    let existingAnimals = await Animal.find({});
    res.json(existingAnimals);
})

router.delete('/:petId', (req, res) => {
    const { petId } = req.params;
    res.json({ ok: true });
})

router.get('/:petId', async (req, res) => {
    const { petId } = req.params;
    res.json(await Animal.findById(petId));
})

router.put('/:petId', async (req, res) => {
    const { petId } = req.params;
    const { pet } = req.body;
    const savedPet = await Animal.findOneAndUpdate(
        { _id: petId },
         { $set: pet }, 
         { runValidators: true, new: true })
    res.json(savedPet);
})

module.exports = router;