const Bootcamp = require('../models/bootcampModel')
const asyncWrapper = require('../utils/asycnWrapper')
const ErrorResponse = require('../utils/errorUtil')
const geocoder = require('../utils/geocoder')

const createBootcamp = asyncWrapper(async (req, res, next) => {
 

  const bootcamp = await Bootcamp.create(req.body);
  console.log('two')
  res.status(201).json({ success: true, data: bootcamp });
});

const getBootcamp = asyncWrapper(async (req, res, next) => {
   console.log(req.query)
   let query;
   
   let reqQuery = {...req.query}
   const remField = ['select', 'sort', 'page']
   
   remField.forEach(params => delete reqQuery[params]);

   let queryStr = JSON.stringify(reqQuery);
   
   queryStr = queryStr.replace(
     /\b(gt|gte|lt|lte|in)\b/g,
     (match) => `$${match}`
   ); 

    query = Bootcamp.find(JSON.parse(queryStr)).populate({
      path: 'bootcamps',
      select: 'name description',
      options: {
        limit: +req.query.limit,
        skip: +req.query.skip,
      },
    })

    // if (req.query.select) { 
    //   const field = req.query.select.split(",").join(' ')
    //   query =  query.select(field)
    // }

    // if(req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy)
    // } else {
    //   query = query.sort('-createdAt')
    // }

    
    const bootcamps = await  query

   res.status(200).json({success:true, count:bootcamps.length, data:bootcamps})
}); 

const getSingleBootcamp = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id
  const bootcamp =  await Bootcamp.findById(_id) 
  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }
  res.status(200).json({success:true, data: bootcamp})
});


const updateBootcamp = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }

  await bootcamp.save();

  res.status(200).json({ success: true, data: bootcamp });
});

const deleteBootcamp = asyncWrapper(async (req, res, next) => {
  const _id = req.params.id;
  const bootcamp = await Bootcamp.findByIdAndDelete(_id);

  if (!bootcamp) {
    return next(new ErrorResponse(`Bootcamp not found`, 404));
  }

  res.status(200).json({ success: true });
});

const getBootcampsInRadius = asyncWrapper(async (req, res, next) => {
  const {zipcode, distance} = req.params

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  //calc radius using radians
  //Divide distance by radius of Earth
  //Earth radius = 3,963 mi / 6,378 km

  const radius = distance / 3963 

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin : {$centerSphere: [[long , lat], radius]}
    }
  })

  res.status(200).json({
    success: true,
    count: bootcamps.length ,
    data: bootcamps
  })
})

module.exports = {
  getBootcamp,
  getSingleBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
}