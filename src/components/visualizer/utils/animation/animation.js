/* Utility */
import { delay } from '../../../../utils';
/* Default Configuration */
import { defaultConfig } from '../../../../config';

const defaultValues = {
  configuration: {
    animationSpeed: defaultConfig.animationSpeed,
    animationColors: defaultConfig.animationColors,
  },
};

/*
    Animation

*/

export default class Animation {
  constructor(targets = null, config = defaultValues.configuration) {
    this.config = config;
    this.targets = targets;
    this.frames = [];
    this.undoStack = [];
    this.framePointer = 0;
    this.animation = this.generateAnimation();
    this.isPlayingAnimation = false;

    // Bind Methods
    this.animation.next = this.animation.next.bind(this.animation);
  }

  setTargets = (targets) => {
    this.targets = targets;
  };

  addFrame = (effects = []) => {
    this.frames.push(effects);
  };

  addAnimationEffect = (...effect) => {
    const top = this.frames.length - 1;
    this.frames[top].push(effect);
  };

  updateAnimationEffect = (target, effect) => {
    try {
      const [index, value, color] = effect;
      if (index === null || index === undefined) {
        throw new Error('index is not provided!');
      }

      target.index = index;

      if (value !== null) {
        target.innerText = value.toString();
        target.style.height = `${(value / 300) * 80}%`;
      }

      if (color !== null) {
        target.style.background = this.config.animationColors[color];
      }
    } catch (error) {
      console.error(error);
    }
  };

  copyAnimationEffect = (target) => {
    if (target) {
      return {
        target,
        innerText: target?.innerText,
        height: target?.style?.height,
        background: target?.style?.background,
      };
    }
  };

  preserveAnimationEffects = (effects) => {
    this.undoStack.push(effects);
  };

  revertAnimationEffect = (preservedEffects) => {
    preservedEffects.forEach(({ target, innerText, height, background }) => {
      target.innerText = innerText;
      target.style.height = height;
      target.style.background = background;
    });
  };

  applyAnimationEffects = (newEffects) => {
    const previousEffects = [];
    newEffects.forEach((effect) => {
      const [index] = effect;
      const target = this.targets[index];
      previousEffects.push(this.copyAnimationEffect(target));
      this.updateAnimationEffect(target, effect);
    });
    this.preserveAnimationEffects(previousEffects.reverse());
  };

  animationEnds = () => this.framePointer >= this.frames.length;

  *generateAnimation() {
    while (true) {
      yield this.framePointer;
      if (!this.animationEnds()) {
        this.applyAnimationEffects(this.frames[this.framePointer]);
        this.framePointer++;
      }
    }
  }

  getAnimationStatus = () =>
    !this.animationEnds() && this.isPlayingAnimation && !this.animationEnds();

  play = async () => {
    if (this.isPlayingAnimation) {
      return this.pause();
    }
    this.isPlayingAnimation = true;
    while (!this.animationEnds() && this.isPlayingAnimation) {
      await delay(this.config.animationSpeed).then(this.animation.next);
    }
  };

  pause = () => {
    this.isPlayingAnimation = false;
  };

  forward = () => {
    this.pause();
    this.animation.next();
  };

  backward = () => {
    this.pause();
    if (this.undoStack.length > 0) {
      this.revertAnimationEffect(this.undoStack.pop());
      this.framePointer--;
    }
  };
}
