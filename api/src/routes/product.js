const router = require('express').Router();
const upload = require('multer')();
const product_controller = require('../controllers/productController');
const { isNotAuth, isNotAdmin } = require('../middlewares/auth');


router.post('/products', isNotAuth('/', 'Unauthorized'), upload.single('img_url'), product_controller.post_product);

router.get('/products/featured', product_controller.get_featured);
router.get('/products/recent', product_controller.get_recent);
router.get('/products/:id', product_controller.get_product); // WATCH OUT FOR THE ORDER. /:id HAS to be last
router.get('/category/:category', product_controller.get_category);

router.patch('/products/:id', isNotAdmin('/'), upload.single('img_url'), product_controller.patch_product);
router.delete('/products/:id', isNotAdmin('/'), product_controller.delete_product);


module.exports = router;