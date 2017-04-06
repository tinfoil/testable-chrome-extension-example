describe("background specs", function(){
  beforeEach(function(){
    this.subject = background;
  });

  describe("When five is called", function () {
    it("returns 5", function(){
      expect(this.subject.five()).toBe(5);
    });
  });
});
