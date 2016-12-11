var mongoose = require("mongoose");
var Carshow = require("./models/carshow");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, ad est dico cetero, te elaboraret interesset voluptatibus sea, audire phaedrum legendos in qui. At alia quidam audiam sea, dico partem ius ad, ei tritani salutandi usu. Et ius eros debet oratio. Qui et iuvaret equidem adipiscing. Ad qui justo possit electram, eos no meliore adipiscing, his te aperiam facilisi. Vis ut ornatus alienum corrumpit."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum dolor sit amet, ad est dico cetero, te elaboraret interesset voluptatibus sea, audire phaedrum legendos in qui. At alia quidam audiam sea, dico partem ius ad, ei tritani salutandi usu. Et ius eros debet oratio. Qui et iuvaret equidem adipiscing. Ad qui justo possit electram, eos no meliore adipiscing, his te aperiam facilisi. Vis ut ornatus alienum corrumpit."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, ad est dico cetero, te elaboraret interesset voluptatibus sea, audire phaedrum legendos in qui. At alia quidam audiam sea, dico partem ius ad, ei tritani salutandi usu. Et ius eros debet oratio. Qui et iuvaret equidem adipiscing. Ad qui justo possit electram, eos no meliore adipiscing, his te aperiam facilisi. Vis ut ornatus alienum corrumpit."
    }
]

function seedDB(){
   //Remove all Carshows
   Carshow.remove({}, function(err){
        if(err){
            console.log(err);
        }
         //add a few Carshows
        data.forEach(function(seed){
            Carshow.create(seed, function(err, Carshow){
                if(err){
                    console.log(err)
                } else {
                   
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                Carshow.comments.push(comment);
                                Carshow.save();
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
