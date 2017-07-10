const test = require('oboy')
const parties = require('../../src/lib/parties')

test((sinon, expect) => {
  let parties

  beforeEach(() => {
    parties = [
      { votes: 10},
      { votes: 10},
    ]
  })
  it('should be correctly initialized', () => {
    const result = parties.allocate(parties, 100)
    expect(result).to.have.length(2)
    expect(result[0]).to.have.property('percentage')
    expect(result[1]).to.have.property('percentage')
    expect(result[0].percentage).to.be(50)
    expect(result[1].percentage).to.be(50)
  })
})