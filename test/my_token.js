const MyToken = artifacts.require("MyToken");

contract("MyToken", function(accounts) {
  describe("initialize", function() {
    it("should assert true", async () => {
      const ins = await MyToken.new()
      expect(ins).to.be.ok
    })
    it("mint 10000000 tokens at first.", async () => {
      const ins = await MyToken.new()
      const balance = await ins.balanceOf(accounts[0])
      expect(balance.toNumber()).to.equal(10000000)
    })
  })
})
