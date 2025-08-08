const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const uploadTo = require('../middleware/uploadTo');
const contract = require('../controllers/franchisor/contract.controller');
const agreement = require('../controllers/franchisor/agreement.controller');
const franchisee = require('../controllers/franchisor/franchisee.controller');
const audit = require('../controllers/franchisor/audit.controller');
const dashboard = require('../controllers/franchisor/dashboard.controller');
const profile = require('../controllers/franchisor/profile.controller');
const complaintRule = require('../controllers/franchisor/complaintRule.controller');
const auditScore = require('../controllers/franchisor/auditScore.controller');
const transaction = require('../controllers/franchisor/transaction.controller');
const compensation = require('../controllers/franchisor/compensation.controller');
const complaint = require('../controllers/franchisor/complaint.controller');
const mediation = require('../controllers/franchisor/mediation.controller');

router.get('/franchisor/contract/', authenticate, authorize('franchisor'), contract.index);
router.post('/franchisor/contract/create', authenticate, authorize('franchisor'), uploadTo('contracts').single('fileUrl'), contract.create);

router.get('/franchisor/agreement/', authenticate, authorize('franchisor'), agreement.index);
router.post('/franchisor/agreement/create', authenticate, authorize('franchisor'), uploadTo('agreements').single('file'), agreement.create);

router.get('/franchisor/franchisee/', authenticate, authorize('franchisor'), franchisee.index);
router.post('/franchisor/franchisee/create', authenticate, authorize('franchisor'), franchisee.create);
router.put('/franchisor/franchisee/update/:id', authenticate, authorize('franchisor'), franchisee.update);
router.put('/franchisor/franchisee/disable/:id', authenticate, authorize('franchisor'), franchisee.disable);

router.get('/franchisor/audit/', authenticate, authorize('franchisor'), audit.index);
router.get('/franchisor/audit-score/', authenticate, authorize('franchisor'), auditScore.index);
router.get('/franchisor/dashboard', authenticate, authorize('franchisor'), dashboard.dashboard);

router.get('/franchisor/profile', authenticate, authorize('franchisor'), profile.getProfile);
router.post('/franchisor/profile/create', authenticate, authorize('franchisor'), uploadTo('reports').single('financialReportFile'), profile.createProfile);
router.put('/franchisor/profile/update/:id', authenticate, authorize('franchisor'), profile.updateProfile);

router.get('/franchisor/complaint-rule', authenticate, authorize('franchisor'), complaintRule.getComplaintRule);
router.post('/franchisor/complaint-rule/create', authenticate, authorize('franchisor'), complaintRule.createComplaintRule);
router.put('/franchisor/complaint-rule/update/:id', authenticate, authorize('franchisor'), complaintRule.updateComplaintRule);

router.get('/franchisor/transaction/', authenticate, authorize('franchisor'), transaction.index);
router.get('/franchisor/compensation/', authenticate, authorize('franchisor'), compensation.index);
router.get('/franchisor/complaint/', authenticate, authorize('franchisor'), complaint.index);
router.get('/franchisor/mediation/', authenticate, authorize('franchisor'), mediation.index);


module.exports = router;