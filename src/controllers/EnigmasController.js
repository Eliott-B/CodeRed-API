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
            points: req.body.points,
            final: req.body.final
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
        let enigma = await enigmaModel.findByPk(req.params.id);
        if (enigma) {
            await enigma.update({
                title: req.body.title,
                description: req.body.description,
                points: req.body.points,
                enabled: req.body.enabled,
                final: req.body.final
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
        let enigma = await enigmaModel.findByPk(req.params.id);
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

const enabledEnigmas = async(req, res) => {
    try {
        await db.connect();
        let enigmas = await enigmaModel.findAll({ where : { final: false } });
        if (enigmas) {
            enigmas.forEach(enigma => {
                enigma.update({
                    enabled: true
                });
            });
            res.status(200).json({ message: 'All enigmas enabled' });
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

const enabledFinalEnigmas = async(req, res) => {
    try {
        await db.connect();
        let enigmas = await enigmaModel.findAll({ where : { final: true } });
        if (enigmas) {
            enigmas.forEach(enigma => {
                enigma.update({
                    enabled: true
                });
            });
            res.status(200).json({ message: 'All final enigmas enabled' });
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

export { getAllEnigmas, getEnigmaById, createEnigma, updateEnigma, deleteEnigma, enabledEnigmas, enabledFinalEnigmas };
