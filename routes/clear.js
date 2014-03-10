exports.clear = function(db) {
	console.log('Schedule');
	db.collection('mesas', function(err, collection) {	
		collection.update({}, {$set: { Situacao: "1" }}, {safe:true, multi:true}, function(err, result) {
			if (err) {
				console.log('Error updating mesa: ' + err);
				res.send({'error':'An error has occurred'});
			} else {						
				db.collection('consumomesa', function(err, collection) {
					collection.drop(function(err, result) {			
						if (err) {
							console.log('Error drop mesa: ' + err);
							res.send({'error':'An error has occurred'});
						} else {
							console.log('' + result + ' document(s) updated');
							res.send({'sucess':'document(s) updated, sucess!'});
						}
					});
				});				
			}
		});
	});
};