const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const agreement = require('../controllers/regulator/agreement.controller');
const contract = require('../controllers/regulator/contract.controller');
const audit = require('../controllers/regulator/audit.controller');
const compensation = require('../controllers/regulator/compensation.controller');
const complaint = require('../controllers/regulator/complaint.controller');
const monitor = require('../controllers/regulator/monitor.controller');
const dashboard = require('../controllers/regulator/dashboard.controller');
const franchisor = require('../controllers/regulator/franchisor.controller');

router.get('/regulator/agreement/', authenticate, authorize('regulator'), agreement.index);
router.put('/regulator/agreement/approve/:id', authenticate, authorize('regulator'), agreement.approve);
router.put('/regulator/agreement/reject/:id', authenticate, authorize('regulator'), agreement.reject);

router.get('/regulator/contract/', authenticate, authorize('regulator'), contract.index);
router.put('/regulator/contract/approve/:id', authenticate, authorize('regulator'), contract.approve);
router.put('/regulator/contract/reject/:id', authenticate, authorize('regulator'), contract.reject);

router.get('/regulator/compensation/', authenticate, authorize('regulator'), compensation.index);
router.put('/regulator/compensation/:id/status', authenticate, authorize('regulator'), compensation.updateStatus);

router.get('/regulator/complaint/', authenticate, authorize('regulator'), complaint.index);
router.put('/regulator/complaint/verify/:id', authenticate, authorize('regulator'), complaint.verifyComplaint);

router.get('/regulator/audit/', authenticate, authorize('regulator'), audit.index);
router.get('/regulator/monitor/realTimeStats', authenticate, authorize('regulator'), monitor.realTimeStats);
router.get('/regulator/dashboard', authenticate, authorize('regulator'), dashboard.dashboard);

router.get('/regulator/franchisor', authenticate, authorize('regulator'), franchisor.index);
router.put('/regulator/franchisor/approve/:id', authenticate, authorize('regulator'), franchisor.approve);
router.put('/regulator/franchisor/reject/:id', authenticate, authorize('regulator'), franchisor.reject);

module.exports = router;