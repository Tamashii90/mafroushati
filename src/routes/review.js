const router = require('express').Router();
const review_controller = require('../controllers/reviewController');
const { isNotAuth } = require('../middlewares/auth');

router.get('/review/featured', review_controller.get_featured);

router.post('/review/test', isNotAuth('/', 'Unauthorized'), review_controller.post_review);

router.patch('/review/:reviewId', isNotAuth('/', 'Unauthorized'), review_controller.patch_review);

router.delete('/review/:reviewId', isNotAuth('/', 'Unauthorized'), review_controller.delete_review);


module.exports = router;