import 'phaser';
import { GameboardScene } from './scenes/gameboard_scene';
import { EditorModesScene } from './scenes/editor_modes_scene';

var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1600,
  height: 900,
  backgroundColor: '#000000',
  scene: [ GameboardScene, EditorModesScene ]
};

var game = new Phaser.Game(config);