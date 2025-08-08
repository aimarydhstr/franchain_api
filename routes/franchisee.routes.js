const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const uploadTo = require('../middleware/uploadTo');
const transaction = require('../controllers/franchisee/transaction.controller');
const complaint = require('../controllers/franchisee/complaint.controller');
const compensation = require('../controllers/franchisee/compensation.controller');
const report = require('../controllers/franchisee/report.controller');
const dashboard = require('../controllers/franchisee/dashboard.controller');
const product = require('../controllers/franchisee/product.controller');
const contract = require('../controllers/franchisee/contract.controller');
const agreement = require('../controllers/franchisee/agreement.controller');
const mediation = require('../controllers/franchisee/mediation.controller');
const auditScore = require('../controllers/franchisee/auditScore.controller');

router.get('/franchisee/transaction/', authenticate, authorize('franchisee'), transaction.index);
router.post('/franchisee/transaction/create', authenticate, authorize('franchisee'), transaction.create);
router.patch('/franchisee/transaction/cancel/:id', authenticate, authorize('franchisee'), transaction.cancel);
router.patch('/franchisee/transaction/complete/:id', authenticate, authorize('franchisee'), transaction.complete);

router.get('/franchisee/compensation/', authenticate, authorize('franchisee'), compensation.index);
router.get('/franchisee/compensation/list', authenticate, authorize('franchisee'), compensation.list);
router.put('/franchisee/compensation/create/:id', authenticate, authorize('franchisee'), compensation.create);

router.get('/franchisee/complaint/', authenticate, authorize('franchisee'), complaint.index);
router.post('/franchisee/complaint/create', authenticate, authorize('franchisee'), uploadTo('clarifications').single('file'), complaint.create);
router.get('/franchisee/report/dailyReport', authenticate, authorize('franchisee'), report.dailyReport);
router.get('/franchisee/dashboard', authenticate, authorize('franchisee'), dashboard.dashboard);

router.get('/franchisee/product/', authenticate, authorize('franchisee'), product.index);
router.get('/franchisee/product/inactive', authenticate, authorize('franchisee'), product.inactive);
router.post('/franchisee/product/create', authenticate, authorize('franchisee'), product.store);
router.put('/franchisee/product/update/:id', authenticate, authorize('franchisee'), product.update);
router.delete('/franchisee/product/delete/:id', authenticate, authorize('franchisee'), product.destroy);
router.put('/franchisee/product/restore/:id', authenticate, authorize('franchisee'), product.restore);

router.get('/franchisee/contract/', authenticate, authorize('franchisee'), contract.index);
router.get('/franchisee/agreement/', authenticate, authorize('franchisee'), agreement.index);
router.get('/franchisee/mediation/', authenticate, authorize('franchisee'), mediation.index);
router.get('/franchisee/audit-score/', authenticate, authorize('franchisee'), auditScore.index);

module.exports = router;