import fs from 'fs';

import Mower from './mower';

fs.readFile('./inputfile.txt', 'utf8', function(err, data) {
  if (err) {
    console.error('Cannot find the input File ./file.txt', err);
    return;
  };

  if (!data || data.split('\r\n').length === 0) {
    console.error('Invalid Data Format', data);
    return;
  }

  const inputCommands = data.split('\r\n');
  const firstLine = inputCommands[0];
  const bordersConf = inputCommands[0];

  if (!firstLine || !firstLine.split(' ') || firstLine.split(' ').length < 2) {
    console.error('Cannot find the coordinates of the upper-right corner of the lawn');
    return;
  }

  const cornersPosition = firstLine.split(' ');
  const mower = new Mower(cornersPosition[0], cornersPosition[1]);
  for (let i = 1; i < inputCommands.length -1; i+=2) {
    const initialPositions = inputCommands[i].split(' ');
    const instructionSequence = inputCommands[i+1];
    mower.init(initialPositions[0], initialPositions[1], initialPositions[2]);
    mower.executeSequence(instructionSequence);
    console.log(` ${mower.position.x} ${mower.position.y} ${mower.position.o}`);
  }
});
