const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const { userList, userPages } = require('../views');
const { main, addPage, editPage, wikipage } = require('../views')





router.get('/', async (req, res, next) => {
  try {
    const allPages = await Page.findAll()
    res.send(allPages)
    //console.log(allPages)
  } catch(error) {
    next(error);
  }
});



router.post('/', async (req, res, next) => {
  const stringified = JSON.stringify(req.body)
  console.log('body', Object.keys(req.body))
  console.log(req.content_type)
  console.log("json",stringified)
   console.log("body",req.body)
  //  console.
  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content
  // });
  try {
    const page = await Page.create(req.body)
    //const newPage = await Page.create(req.body)
    //res.send(addPage());
    await page.save();
    res.redirect('/')
  } catch (error){
    next(error);
  }
});

router.get('/add', async (req, res, next) => {
  res.send(addPage());
})

//get all users, do not change db
router.get('/users', async (req, res, next) => {
  try {
    const getAllUsers = await User.findAll()
    res.send(getAllUsers)
  } catch (error) {
    next (error);
  }
})

//get user 123, do not change db
router.get('/users/123', async (req, res, next) => {
  try {
    const getAllUsers = await User.findById(123);
    res.send(getAllUsers)
  } catch (error) {
    next (error);
  }
})

//	create a user in the db
router.post('/users/', async (req, res, next) => {
  try {
    const createUser = await User.create()
    res.send(createUser)
  } catch (error) {
    next(error);
  }
})

//	update user 123 in the db
router.put('/users/123', async (req, res, next) => {
  try {
    const updateUser = User.update()
    res.send(updateUser);
  } catch(error) {
    next(error);
  }
})

//delete user 123 from the db
router.delete('/users/123', async (req, res, next) => {
  try {
    const deleteUser = User.delete()
    res.send(deleteUser);
  } catch (error) {
    next(error);
  }
})

//redirect
router.get('/', (req, res, next) => {
  res.redirect('/wiki');
})



module.exports = router;
