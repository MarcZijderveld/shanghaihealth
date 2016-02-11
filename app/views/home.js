if(Meteor.isClient) {

	var random = false;

	$(document).keypress(function(event) {
		console.log(event.keyCode);
		if (event.keyCode == 13) {
			console.log('Enter was pressed');
		}

		if (event.keyCode == 49) {
			$("#heartRate").text(75);
		}
		else if (event.keyCode == 50) {
			$("#heartRate").text(85);
		}
		else if (event.keyCode == 51) {
			$("#heartRate").text(110);
		}
		else if (event.keyCode == 52) {
			if (random) {
				random = false;
				console.log("disable auto refresh");
			}
			else {
				random = true;
				console.log("enable auto refresh");
			}
		}
	});

	refresh();

	function refresh() {
		if (random == true) {
			var rand = Math.floor(Math.random() * 85) + 75;
			$("#heartRate").text(rand);
			console.log("refresh naar " + rand);
		}
		setTimeout(refresh, 3000);
	}

    document.querySelector('#p1').addEventListener('mdl-componentupgraded', function()
	{
        this.MaterialProgress.setProgress(44);
	});
}