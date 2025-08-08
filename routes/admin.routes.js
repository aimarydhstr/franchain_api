const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const user = require('../controllers/admin/user.controller');
const dashboard = require('../controllers/admin/dashboard.controller');
const setting = require('../controllers/admin/setting.controller');
const transaction = require('../controllers/admin/transaction.controller');
const compensation = require('../controllers/admin/compensation.controller');
const complaint = require('../controllers/admin/complaint.controller');
const mediation = require('../controllers/admin/mediation.controller');

router.get('/admin/user/', authenticate, authorize('admin'), user.index);
router.get('/admin/user/list', authenticate, authorize('admin'), user.list);
router.get('/admin/user/show', authenticate, authorize('admin'), user.show);
router.post('/admin/user/create', authenticate, authorize('admin'), user.create);
router.put('/admin/user/update/:id', authenticate, authorize('admin'), user.update);
router.put('/admin/user/nonactive/:id', authenticate, authorize('admin'), user.nonactive);
router.put('/admin/user/active/:id', authenticate, authorize('admin'), user.active);
router.get('/admin/dashboard', authenticate, authorize('admin'), dashboard.dashboard);
router.get('/admin/setting/getSettings', authenticate, authorize('admin'), setting.getSettings);

router.get('/admin/transaction/', authenticate, authorize('admin'), transaction.index);
router.get('/admin/compensation/', authenticate, authorize('admin'), compensation.index);
router.get('/admin/complaint/', authenticate, authorize('admin'), complaint.index);
router.get('/admin/mediation/', authenticate, authorize('admin'), mediation.index);

module.exports = router;