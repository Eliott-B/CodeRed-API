import { db, enigmaModel, groupModel, solutionModel } from '../index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const getAllGroups = async (req, res) => {
    try {
        let groups = await groupModel.findAll();
        if (groups) {
            res.status(200).json(groups);
        } else {
            res.status(404).send({ message: 'Groups not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getGroupById = async (req, res) => {
    try {
        let group = await groupModel.findByPk(req.params.id);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const createGroup = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        let group = await groupModel.create({
            name: req.body.name,
            password: password,
            admin: req.body.admin
        });
        res.status(201).json(group);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const loginGroup = async (req, res) => {
    try {
        let group = await groupModel.findOne({ where: { name: req.body.name }});
        if (group) {
            const valid = await bcrypt.compare(req.body.password, group.password);
            if (valid) {
                const token = jwt.sign({
                    groupUUID: group.id,
                    admin: group.admin
                }, process.env.TOKEN_SECRET, { expiresIn: '6h' });
                res.status(200).send({ token: token, id: group.id });
            } else {
                res.status(406).json({ path: "password", message: "Invalid password" });
            }
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const authGroup = async (req, res) => {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err) => {
        if (err) {
            res.status(401).json({ valid: false });
        } else {
            res.status(200).json({ valid: true });
        }
    });
};

const updateGroup = async (req, res) => {
    try {
        let group = await groupModel.findByPk(req.params.id);
        if (group) {
            if (req.auth.admin === true || req.auth.groupUUID === group.id) {
                await group.update({
                    name: req.body.name,
                    password: req.body.password,
                    admin: req.body.admin
                });
                res.status(200).json(group);
            } else {
                res.status(401).send({ message: 'Unauthorized' });
            }
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        let group = await groupModel.findByPk(req.params.id);
        if (group) {
            await group.destroy();
            res.status(204).send({ message: 'Group deleted' });
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const addPenalty = async (req, res) => {
    try {
        let group = await groupModel.findByPk(req.params.id);
        if (group) {
            group.penalty += req.body.penalty;
            await group.save();
            res.status(204).send({ message: 'Penalty added' });
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getGroupsPoints = async (req, res) => {
    try {
        let groups = await groupModel.findAll();
        let results = [];
        for (const group of groups) {
            let localPoints = - group.penalty;
            let groupSolutions = await solutionModel.findAll({ where: { group_id: group.id } });
            for (const solution of groupSolutions) {
                if (solution.success === true) {
                    let enigma = await enigmaModel.findByPk(solution.enigma_id);
                    localPoints += enigma.points;
                }
                if (solution.tip_used === true) {
                    let enigma = await enigmaModel.findByPk(solution.enigma_id);
                    localPoints -= enigma.tip_cost;
                }
            }
            results.push({ name: group.name, points: localPoints });
        }
        res.status(200).json(results);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getPoints = async (req, res) => {
    try {
        let group = await groupModel.findByPk(req.auth.groupUUID);
        if (group) {
            let points = - group.penalty

            let groupSolutions = await solutionModel.findAll({ where: { group_id: req.auth.groupUUID } });

            for (const solution of groupSolutions) {
                if (solution.success === true) {
                    let enigma = await enigmaModel.findByPk(solution.enigma_id);
                    points += enigma.points;
                }
                if (solution.tip_used === true) {
                    let enigma = await enigmaModel.findByPk(solution.enigma_id);
                    points -= enigma.tip_cost;
                }
            };

            res.status(200).json({ points: points });
        } else {
            res.status(404).send({ message: 'Group not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getAdminStatus = async (req, res) => {
    try {
        if (req.auth.admin) {
            res.status(200).json({ admin: true });
        } else {
            res.status(200).json({ admin: false });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export { getAllGroups, getGroupById, createGroup, loginGroup, authGroup, updateGroup, deleteGroup, addPenalty, getGroupsPoints, getPoints, getAdminStatus };
