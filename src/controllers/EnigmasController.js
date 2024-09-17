import { db, enigmaModel } from '../index.js';

const getAllEnigmas = async (req, res) => {
    try {
        await db.connect();
        let enigmas = await enigmaModel.findAll();
        if (enigmas) {
            res.status(200).json(enigmas);
        } else {
            res.status(404).send({ message: 'Enigma not found' });
        }
        await db.close();
    } catch (err) {
        if (db.isConnected()) {
            await db.close();
        }
        res.status(500).send({ message: err.message });
    }
};

const getEnigmaById = async (req, res) => {
    try {
        await db.connect();
        let enigma = await enigmaModel.findByPk(req.params.id);
        if (enigma) {
            res.status(200).json(enigma);
        } else {
            res.status(404).send({ message: 'Enigma not found' });
        }
        await db.close();
    } catch (err) {
        if (db.isConnected()) {
            await db.close();
        }
        res.status(500).send({ message: err.message });
    }
}

const createEnigma = async (req, res) => {
    try {
        await db.connect();
        let enigma = await enigmaModel.create({
            title: req.body.title,
            description: req.body.description,
            points: req.body.points
        });
        res.status(201).json(enigma);
        await db.close();
    } catch (err) {
        if (db.isConnected()) {
            await db.close();
        }
        res.status(500).send({ message: err.message });
    }
};

const updateEnigma = async (req, res) => {
    try {
        await db.connect();
        let enigma = await enigmaModel.findByPk(req.body.id);
        if (enigma) {
            await enigma.update({
                title: req.body.title,
                description: req.body.description,
                points: req.body.points
            });
            res.status(200).json(enigma);
        } else {
            res.status(404).send({ message: 'Enigma not found' });
        }
    } catch (err) {
        if (db.isConnected()) {
            await db.close();
        }
        res.status(500).send({ message: err.message });
    }
};

const deleteEnigma = async (req, res) => {
    try {
        await db.connect();
        let enigma = await enigmaModel.findByPk(req.body.id);
        if (enigma) {
            await enigma.destroy();
            res.status(204).send({ message: 'Enigma deleted' });
        } else {
            res.status(404).send({ message: 'Enigma not found' });
        }
    } catch (err) {
        if (db.isConnected()) {
            await db.close();
        }
        res.status(500).send({ message: err.message });
    }
};

export { getAllEnigmas, getEnigmaById, createEnigma, updateEnigma, deleteEnigma };
