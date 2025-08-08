const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const uploadTo = require('../middleware/uploadTo');
const mediation = require('../controllers/mediator/mediation.controller');
const bpsk = require('../controllers/mediator/bpsk.controller');
const verdict = require('../controllers/mediator/verdict.controller');
const dashboard = require('../controllers/mediator/dashboard.controller');
const compensation = require('../controllers/mediator/compensation.controller');
const complaint = require('../controllers/mediator/complaint.controller');

router.get('/mediator/mediation/', authenticate, authorize('mediator'), mediation.index);
router.get('/mediator/mediation/list', authenticate, authorize('mediator'), mediation.list);
router.post('/mediator/mediation/create', authenticate, authorize('mediator'), mediation.create);
router.put('/mediator/mediation/:id/complete', authenticate, authorize('mediator'), uploadTo('verdicts').single('file'), mediation.complete);
router.put('/mediator/mediation/:id/reject', authenticate, authorize('mediator'), mediation.reject);

router.get('/mediator/bpsk/', authenticate, authorize('mediator'), bpsk.index);
router.post('/mediator/bpsk/create', authenticate, authorize('mediator'), bpsk.create);
router.post('/mediator/verdict/uploadVerdict', authenticate, authorize('mediator'), verdict.uploadVerdict);
router.get('/mediator/dashboard', authenticate, authorize('mediator'), dashboard.dashboard);

router.get('/mediator/compensation/', authenticate, authorize('mediator'), compensation.index);
router.put('/mediator/compensation/:id/status', authenticate, authorize('mediator'), compensation.updateStatus);

router.get('/mediator/complaint/', authenticate, authorize('mediator'), complaint.index);
router.put('/mediator/complaint/verify/:id', authenticate, authorize('mediator'), complaint.verifyComplaint);


module.exports = router;