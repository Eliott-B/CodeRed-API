import { db, solutionModel } from '../index.js';

const getSolutionsToAnEnigma = async (req, res) => {
    try {
        let solutions = await solutionModel.findAll({ where: { enigma_id: req.params.enigmaId } });
        if (solutions) {
            res.status(200).json(solutions);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const getSolutionsToAnGroup = async (req, res) => {
    try {
        let solutions = await solutionModel.findAll({ where: { group_id: req.params.id } });
        if (solutions) {
            res.status(200).json(solutions);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const getSolutionsToAnEnigmaAndToAnGroup = async (req, res) => {
    try {
        let solutions = await solutionModel.findAll({ where: { enigma_id: req.params.enigmaId, group_id: req.params.groupId } });
        if (solutions) {
            res.status(200).json(solutions);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const createSolution = async (req, res) => {
    try {
        let solution = await solutionModel.create({
            enigma_id: req.body.enigmaId,
            group_id: req.body.groupId,
            solution: req.body.solution,
            input_path: req.body.inputPath,
            console_output: req.body.consoleOutput
        });
        res.status(201).json(solution);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const updateSolution = async (req, res) => {
    try {
        let solution = await solutionModel.findByPk(req.params.enigmaId, req.params.groupId);
        if (solution) {
            await solution.update({
                solution: req.body.solution,
                description: req.body.input_path,
                console_output: req.body.console_output
            });
            res.status(200).json(solution);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const answer = async (req, res) => {
    if (! req.body.answer) {
        res.status(400).send({ message: 'Answer is required' });
        return
    }
    try {
        let solution = await solutionModel.findAll({ where: { enigma_id: req.params.enigmaId, group_id: req.auth.groupUUID } });
        if (solution && solution.length > 0) {
            let enigma = await enigmaModel.findByPk(req.params.enigmaId);
            if (enigma) {
                if (enigma.enabled === false) {
                    res.status(400).send({ message: 'Enigma disabled' });
                } else {
                    if (solution[0].solution == req.body.answer) {
                        await solution[0].update({
                            success: true
                        });
                        res.status(200).json(solution[0]);
                    } else {
                        res.status(400).send({ message: 'Wrong answer' });
                    }
                }
            } else {
                res.status(404).send({ message: 'Enigma not found' });
            }
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const useTip = async (req, res) => {
    if (req.body.answer) {
        next();
    }
    try {
        let solution = await solutionModel.findByPk(req.params.enigmaId, req.auth.groupUUID);
        if (solution) {
            await solution.update({
                tip_used: true
            });
            let enigma = await enigmaModel.findByPk(req.params.enigmaId);
            res.status(200).json(enigma.tip);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

const deleteSolution = async (req, res) => {
    try {
        let solution = await solutionModel.findByPk(req.params.enigmaId, req.params.groupId);
        if (solution) {
            await solution.destroy();
            res.status(204).send({ message: 'Solution deleted' });
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

export { getSolutionsToAnEnigma, getSolutionsToAnGroup, getSolutionsToAnEnigmaAndToAnGroup, createSolution, updateSolution, answer, useTip, deleteSolution };
