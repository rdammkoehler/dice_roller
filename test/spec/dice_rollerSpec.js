describe("dice_roller", function() {

	describe("roll button click event", function() {

		var button;

		beforeEach(function() {
			$.jasmine.inject(
				'<form>' +
					'<input id="rollerId" type="text"/>' +
					'<select id="dType">'+
						'<option value="2">2</option>'+
						'<option value="4">4</option>'+
						'<option value="6">6</option>'+
						'<option value="8">8</option>'+
						'<option value="10">10</option>'+
						'<option value="12">12</option>'+
						'<option value="20" selected>20</option>'+
						'<option value="100">100</option>'+
					'</select>'+
					'<input id="dCount" type="text" value="1"/>'+
					'<input id="rollButton" type="button" value="roll"/>'+
				'</form>'+
				'<div id="result"></div>'
			);
 			button = $("#rollButton");
			button.click(function() {
				window.App.controlClickEventAndRender();
			});

		});

		it("calls roll function", function() {
			var app = window.App;
			spyOn(app, 'roll').andCallThrough();
			button.click();
			expect(app.roll).toHaveBeenCalled();
		});

		it("displays results in the result div", function() {
			Math.random = function () { return 0; }
			button.click();
			expect($("#result").html()).toContain("1 = 1");
		});
		
	});

	describe("roll function", function() {

		function roll(dieType, dieCount) {
			var dice = new Dice();
			return dice.roll(dieType, dieCount);
		}

		function roll1d(dieType) {
			return roll(dieType,1);
		};

		function roll2d(dieType) {
			return roll(dieType,2);
		};

		describe("when random is 0.1 and type is d2", function () {

			beforeEach(function() {
				Math.random = function () { return 0.1; }
			});

			it("is 1 for 1d2", function() {
				expect(roll1d(2)).toBe("1 = 1");
			});

			it("is 2 for 2d2", function() {
				expect(roll2d(2)).toBe("1 + 1 = 2");
			});
		});

		describe("when random is 0.1 and type is d4", function () {
	
			beforeEach(function() {
				Math.random = function () { return 0.1; }
			});

			it("is 1 for 1d4", function() {
				expect(roll1d(4)).toBe("1 = 1");
			});
		
			it("is 2 for 2d4", function() {
				expect(roll2d(4)).toBe("1 + 1 = 2");
			});

		});

		describe("accepts dieType", function() {

			it("d2", function() {
				roll(2,1);
			});
	
			it("d4", function() {
				roll(4,1);
			});

			it("d6", function() {
				roll(6,1);
			});

			it("d8", function() {
				roll(8,1);
			});

			it("d10", function() {
				roll(10,1);
			});

			it("d12", function() {
				roll(12,1);
			});

			it("d20", function() {
				roll(20,1);
			});

			it("d100", function() {
				roll(100,1);
			});

		});

		describe("rejects dieType", function() {
	
			function expectException(dieType) {
				//Note: Wrap the thing that throws stuff in an anonymous function to get toThrow working
				expect(function() { roll(dieType,1) }).toThrow("Invalid die type");
			};

			it("d1", function() {
				expectException(1);
			});

			it("d3", function() {
				expectException(3);
			});

			it("d5", function() {
				expectException(5);
			});

			it("d7", function() {
				expectException(7);
			});

			it("d9", function() {
				expectException(9);
			});

			it("d11", function() {
				expectException(11);
			});

			it("d13", function() {
				expectException(13);
			});

			it("d19", function() {
				expectException(19);
			});

			it("d21", function() { 
				expectException(21);
			});

			it("d99", function() {
				expectException(99);
			});

			it("d101", function() {
				expectException(101);
			});

		});
	});

});
