const express = require('express');
const auditLog = require('../data/auditLog');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Журнал виден только вошедшему admin
router.use(requireAuth, requireRole('admin'));

// GET /api/logs: события входа/выхода
router.get('/', (req, res) => {
  res.json(auditLog.list());
});

module.exports = router;
