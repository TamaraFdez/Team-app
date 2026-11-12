import { Router } from 'express';
import User from '../models/User.js';
import Character from '../models/Character.js';
import Team from '../models/Team.js';
import Recruit from '../models/Recruit.js';
import Mission from '../models/Mission.js';

const router = Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/characters', async (req, res) => {
  try {
    const characters = await Character.findAll();
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/characters', async (req, res) => {
  try {
    const newCharacter = await Character.create(req.body);
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.findAll({ include: ['user'] });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/teams', async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/recruits', async (req, res) => {
  try {
    const recruits = await Recruit.findAll({ include: ['user', 'character', 'team'] });
    res.json(recruits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/recruits', async (req, res) => {
  try {
    const newRecruit = await Recruit.create(req.body);
    res.status(201).json(newRecruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/missions', async (req, res) => {
  try {
    const missions = await Mission.findAll({ include: ['user', 'team'] });
    res.json(missions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/missions', async (req, res) => {
  try {
    const newMission = await Mission.create(req.body);
    res.status(201).json(newMission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;