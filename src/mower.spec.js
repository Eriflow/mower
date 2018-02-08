import Mower from './mower';

describe('Mower Class Tests: ', () => {
  it('should be instantiated with the correct corners', () => {
    const mower = new Mower(4,3);
    expect(typeof mower).to.equal('object');
    expect(mower.corners.MaxX).to.equal(4);
    expect(mower.corners.MaxY).to.equal(3);
  });

  it('should init with the correct params', () => {
    const mower = new Mower(4,3);
    mower.init(2, 1, 'N');
    expect(mower.position.x).to.equal(2);
    expect(mower.position.y).to.equal(1);
    expect(mower.position.o).to.equal('N');
  });

  it('should throw error if invalid initial Values', () => {
    const mower = new Mower(4,3);
    expect(() => {
      mower.init(5, 1, 'N');
    }).to.throw('Invalid initial Values');

    expect(() => {
      mower.init(2, 1, 'G');
    }).to.throw('Invalid initial Values');

    expect(() => {
      mower.init('f', 1, 'N');
    }).to.throw('Invalid initial Values');
  });

  it('should get Direction Value by key', () => {
    const mower = new Mower(4,3);
    mower.init(2, 1, 'N');
    expect(mower.getDirectionValue('N')).to.equal(1);
    expect(mower.getDirectionValue('E')).to.equal(0);
    expect(mower.getDirectionValue('W')).to.equal(0);
    expect(mower.getDirectionValue('S')).to.equal(0);
  });

  it('should move Forward', () => {
    const mower = new Mower(4,3);
    mower.init(2, 1, 'N');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 2, y: 2, o: 'N'});

    mower.init(1, 1, 'E');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 2, y: 1, o: 'E'});
  });

  it('should not move Forward is next position over the corner', () => {
    const mower = new Mower(4,3);
    mower.init(4, 3, 'N');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 4, y: 3, o: 'N'});

    mower.init(4, 3, 'E');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 4, y: 3, o: 'E'});

    mower.init(0, 3, 'W');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 0, y: 3, o: 'W'});

    mower.init(1, 0, 'S');
    mower.moveForward();
    expect(mower.position).to.deep.equal({x: 1, y: 0, o: 'S'});
  });

  it('should shift the directions Map', () => {
    const mower = new Mower(4,3);
    mower.init(4, 3, 'W');
    mower.shiftDirectionsMap();
    const expectedMap = [
      {
        key: 'N',
        value: 1,
      },{
        key: 'E',
        value: 0,
      },{
        key: 'S',
        value: 0,
    },{
      key: 'W',
      value: 0,
    }]
    expect(mower.directionsMap).to.deep.equal(expectedMap);
  });

  it('should shift the directions Map', () => {
    const mower = new Mower(4,3);
    mower.init(4, 3, 'W');
    mower.unshiftDirectionsMap();
    const expectedMap = [
      {
        key: 'S',
        value: 1,
      },{
        key: 'W',
        value: 0,
      },{
        key: 'N',
        value: 0,
      },{
        key: 'E',
        value: 0,
    }];
    expect(mower.directionsMap).to.deep.equal(expectedMap);
  });

  it('should be able rotate L', () => {
    const mower = new Mower(4,3);
    mower.init(4, 3, 'W');
    sinon.spy(mower,'unshiftDirectionsMap')
    mower.rotate('L');
    expect(mower.unshiftDirectionsMap).to.have.been.calledOnce();
    mower.unshiftDirectionsMap.restore();
  });

  it('should be able rotate R', () => {
    const mower = new Mower(4,3);
    mower.init(4, 3, 'W');
    sinon.spy(mower,'shiftDirectionsMap')
    mower.rotate('R');
    expect(mower.shiftDirectionsMap).to.have.been.calledOnce();
    mower.shiftDirectionsMap.restore();
  });

  it('should execute the sequence', () => {
    const mower = new Mower(5,5);
    mower.init(1, 2, 'N');
    mower.executeSequence('LFLFLFLFF');
    expect(mower.position).to.deep.equal({x: 1, y: 3, o: 'N'});


    mower.init(3, 3, 'E');
    mower.executeSequence('FFRFFRFRRF');
    expect(mower.position).to.deep.equal({x: 5, y: 1, o: 'E'});
  });


});
