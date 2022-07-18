const {Router} = require('express') 
const {
  getBootcamp,
  getSingleBootcamp,
  updateBootcamp,
  deleteBootcamp,
  createBootcamp,
  getBootcampsInRadius,
} = require("../controllers/bootcampController");

const router = Router()

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);   

router.route('/').get(getBootcamp).post(createBootcamp)

router.route('/:id').get(getSingleBootcamp).patch(updateBootcamp).delete(deleteBootcamp)

module.exports = router