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
        let solutions = await solutionModel.findAll({ where: { group_id: req.filter.groupId } });
        if (solutions) {
            res.status(200).json(solutions);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

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

const successSolution = async (req, res) => {
    try {
        let solution = await solutionModel.findByPk(req.params.enigmaId, req.params.groupId);
        if (solution) {
            await solution.update({
                success: req.body.success
            });
            res.status(200).json(solution);
        } else {
            res.status(404).send({ message: 'Solution not found' });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const useTip = async (req, res) => {
    try {
        let solution = await solutionModel.findByPk(req.params.enigmaId, req.params.groupId);
        if (solution) {
            await solution.update({
                tip_used: req.body.tip_used
            });
            res.status(200).json(solution);
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

export { getSolutionsToAnEnigma, getSolutionsToAnGroup, createSolution, updateSolution, successSolution, useTip, deleteSolution };
