import 'phaser';
import { SimpleScene } from './scenes/simple-scene';

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1600,
  height: 900,
  backgroundColor: '#000000',
  scene: [ SimpleScene ]
};

var game = new Phaser.Game(config);