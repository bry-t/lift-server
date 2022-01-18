const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { WorkoutModel } = require("../models")

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey! This is a practice route!')
});

router.post('/create', validateJWT, async (req, res) => {
    const{title, date, typeOfWorkout, description} = req.body.workout;
    const{id} = req.user;
    const workoutEntry = {
        title,
        date,
        typeOfWorkout,
        description,
        owner: id
    }
    try{
        const newWorkout = await WorkoutModel.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.get("/mine", validateJWT, async (req, res) => {
    let {id} = req.user;
    try{
        const userWorkouts = await WorkoutModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userWorkouts);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.get("/:title", async (req, res) => {
    const {title} = req.params;
    try {
        const results = await WorkoutModel.findAll({
            where: {title: title}
        });
        res.status(200).json(results);
    } catch(err) {
        res.status(500).json({error: err})
    }
});

router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {title, typeOfWorkout, date, description} = req.body.workout;
    const workoutId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: workoutId,
            owner: userId
        }
    };
    const updatedWorkout = {
        title: title,
        typeOfWorkout: typeOfWorkout,
        date: date,
        description: description
    };

    try{
        const update = await WorkoutModel.update(updatedWorkout, query);
        res.status(200).json(update);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const workoutId = req.params.id;

    try {
        const query = {
            where: {
                id: workoutId,
                owner: ownerId
            }
        };

        await WorkoutModel.destroy(query)
        res.status(200).json({message: "Entry Removed"});
    }   catch(err) {
        res.status(500).json({error: err})
    }
});

module.exports = router;