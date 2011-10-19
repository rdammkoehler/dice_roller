//This badass-ness brought to you by Tim Taylor
// Creates a namespace around your code, argument is jQuery, becomes $ and now your namespace is clean
(function(root, $) {
	//Create Click Event Handler
	$("#rollButton").click(function() {
		App.controlClickEventAndRender();
	});
	//Create the Model Class (do this more sexy)
	function Dice() {
	};
	Dice.prototype.controlClickEventAndRender = function() {
		var html = $("#rollerId").val() + ": " + App.roll( $("#dType").val(), $("#dCount").val());
		$("#result").html(html);
	}
	//So this is how you would then define methods on Dice
	Dice.prototype.roll = function(dieType,dieCount) { 
		if ( !(dieType in { 2:1, 4:1, 6:1, 8:1, 10:1, 12:1, 20:1, 100:1 }) ) {
			throw { 
				name: "Error", 
				message: "Invalid die type" 
			}
		}
		var rolls = [];
		var accumulator = 0;
		for( var count = 0; count < dieCount; count++ ) {
			var value = Math.floor(((Math.random() * parseInt(dieType)) + 1));
			rolls.push(value);
			accumulator += value;
		}
		return rolls.join(" + ") + " = " + accumulator; 
	};
	//Expose the Dice Model Class
	root.Dice = Dice;
	//Create the app
	// DO THIS LAST! So now, Dice is the visible thing in the 'outside' world
	root.App = new Dice();
})(window, jQuery)
