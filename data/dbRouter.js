const express = require('express');
const router = express.Router();
const Database = require('./db.js');
/*=============CREATE=========================*/
router.post('/', (req, res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400)
        .json({ errorMessage: "Please provide title and contents for the post."});
    }
    Database.insert(req.body)
    .then(db => {
      res.status(201).json(db);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "There was an error while saving the post to the database" 
      });
    });
  });  


  router.post('/:id/comments', (req, res) => {
    if(!req.body.text){
        return res.status(400)
        .json({ errorMessage: "Please provide text for the comment." });
    }
    Database.insertComment(req.body)
    .then(comments => {
        if(comments){
      res.status(201).json(comments);
        }
        else
        res.status(404).json({message: "The post with the specified ID does not exist."})
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database" 
      });
    });
  });

/*==========READ==============*/
  router.get('/', (req, res) => {
    Database.find(req.query)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
  });

  router.get('/:id', (req, res) => {
    Database.findById(req.params.id)
    .then(db => {
        if(db.length>0){
      res.status(200).json(db);
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
  });


  router.get('/:id/comments', (req, res) => {
    Database.findCommentById(req.params.id)
    .then(db => {
        if(db){
      res.status(200).json(db);
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
  });

  /*=============DELETE============*/
  router.delete('/:id', (req, res) => {
    Database.remove(req.params.id)
    .then(db=> {
      if (db>0) {
        res.status(200).json({ message: 'The post is deleted' });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    });
  });

/*===========UPDATE=============*/
  router.put('/:id', (req, res) => {
    if(!req.body.title ||  !req.body.contents){
        return res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    } 
    const changes = req.body;
    Database.update(req.params.id, changes)
    .then(db => {
      if (db) {
        res.status(200).json(db);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified." ,
      });
    });
  });
  

module.exports = router;