var Park = require ("../models/park");
var expect = require("chai").expect;

describe("Park", function() {
  describe("new", function() {
  	it("initializes a new park", function() {
  		var rocky = new Park();
  		expect(typeof(rocky)).to.equal("object");
  		// expect(true).to.equal(false); 
  	});
  });
});

