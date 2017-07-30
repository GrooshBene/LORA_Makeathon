function init(app, User, Count){
	var randomString = require('randomstring');
	var multer = require('multer');
	var upload = multer({
		dest : './public/photos/',
		rename : function(fieldname, filename){
			return 'files_' + filename;
		}
	});
	app.post('/add/photos', upload.array('photos', 5), function(req, res){
		var photos = new User({
			_id : randomString.generate(15),
			thumbnail : "/photos/" + req.files[0].filename
		});
		photos.save(function(err, silence){
			if(err){
				res.send(401, "/add/photos DB Error");
				console.log(err);
			}
			res.send(200, photos);
		})
	})

	app.post('/update/init', function(req, res){
		var count = new Count({
			_id : "test",
			count : 0
		});
		count.save(function(err, silence){
			if(err){
				res.send(401, "/update/init DB Error");
				console.log(err);
			}
			res.send(200, count);
		})
	});

	app.post('/update', function(req, res){
		Count.findOneAndUpdate({_id : "test"}, {$inc : {count : 1}},{new : true}, function(err, data){
			if(err){
				res.send(401, "/update DB Error");
				console.log(err);
			}
			res.send(200, result);
		})
	});

	app.post('/update/status/one', function(req, res){
		res.send(200, {value : 1});
	});

	app.post('/update/status/two', function(req, res){
		res.send(200, {value : 2});
	});


}


module.exports = init;

