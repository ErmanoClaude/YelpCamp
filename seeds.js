var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comments = require('./models/comments');
var Users = require('./models/user');
var data = [
    {
        name:'Brown',
        image:'https://images.unsplash.com/photo-1490733325962-96398c69612a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f8db8749b54d68890beccedd7772186&auto=format&fit=crop&w=500&q=60',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name:'Whaling Woods',
        image:'https://images.unsplash.com/photo-1526011881888-8dba3f788ede?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fdcf25498a37b3a8f8a317018572986d&auto=format&fit=crop&w=500&q=60',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name:'In the Middle of No Where',
        image:'https://images.unsplash.com/photo-1520732713659-8f14034ba7d6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7a330e0a93ad58039a3d719ee837c6a4&auto=format&fit=crop&w=1050&q=80',
        description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
      name:'Cloud Cabin',
      image:'https://images.unsplash.com/photo-1536535921706-a6032be2def2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a910e2f6d91e728379f850920a7ac4f2&auto=format&fit=crop&w=1050&q=80',
      description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    }
];


function seedDB(){
    //remove all comments
    Comments.remove({},function(err, comment){
        if(err){
            console.log(err);
        } else {
            console.log('Comments were cleared');
        }
    });
    //Remove all campgrounds
    //Makes new campgrounds and adds one comment to each
    Campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("Cleared the campgrounds and comments");
        //     Add a few campgrounds
        //     data.forEach(function(seed){
        //         //Creates a campground
        //         Campground.create(seed, function(err, camp){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 //creates a comment and than pushes id to the camp
        //                 Comments.create({
        //                     text: 'This place is great, but I wish there was internet.',
        //                     author: 'Homer'
                            
        //                 }, function(err, comment){
        //                     if(err){
                                
        //                     } else {
        //                         camp.comments.push(comment);
        //                         camp.save();
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
}

module.exports = seedDB;