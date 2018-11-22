var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get('/', function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
    
});

//CREATE - Add new campground to DB
router.post('/', middleware.isLoggedIn,function(req, res){
    //get data from form and add to camp grounds array
    var name          = req.body.name,
        price         = req.body.price,
        image         = req.body.image,
        description   = req.body.description,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCampground = { name:name, price:price, image:image, description:description, author:author };
        
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err, newlyCreated){
        if(err){
            req.flash("error"," Failed to create camp ground");
            res.redirect("/campgrounds");
        } else {
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});

//NEW - show form to create new campground
router.get('/new', middleware.isLoggedIn,function(req, res){
    res.render('campgrounds/new');
});

//Oder is important because it will catch /new first than goes to the id if not /new
router.get('/:id',function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Campground doesn't exist");
            res.redirect("/campgrounds");
        } else {
            //render show template
            res.render('campgrounds/show', {campground:foundCampground});
        }
    });
});

// EDIT campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    // findCampground
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Error");
            res.redirect("/campgrounds");
        }
        res.render("campgrounds/edit",{campground: foundCampground})
    }); 

});

// UPDATE CAMPGROUD ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect('/campgrounds');
       } else {
           res.redirect('/campgrounds/' + req.params.id);
       }
    });
    //redirect somewhere( show page )
});

// DESTROY CAMPGOUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted")
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;