const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const uploadTo = require('../middleware/uploadTo');
const complaint = require('../controllers/consumer/complaint.controller');
const transaction = require('../controllers/consumer/transaction.controller');
const compensation = require('../controllers/consumer/compensation.controller');
const franchisee = require('../controllers/consumer/franchisee.controller');
const dashboard = require('../controllers/consumer/dashboard.controller');

router.get('/consumer/complaint/', authenticate, authorize('consumer'), complaint.index);
router.get('/consumer/complaint/list', authenticate, authorize('consumer'), complaint.list);
router.post('/consumer/complaint/create', authenticate, authorize('consumer'), uploadTo('evidences').single('evidenceFile'), complaint.create);
router.get('/consumer/transaction/', authenticate, authorize('consumer'), transaction.index);
router.post('/consumer/transaction/create', authenticate, authorize('consumer'), transaction.create);
router.get('/consumer/compensation/', authenticate, authorize('consumer'), compensation.index);
router.get('/consumer/franchisee/', authenticate, authorize('consumer'), franchisee.index);
router.get('/consumer/franchisee/view/:id', authenticate, authorize('consumer'), franchisee.view);
router.get('/consumer/dashboard', authenticate, authorize('consumer'), dashboard.dashboard);

module.exports = router;