const frames = Symbol('frames');
const indexOfAnimationFrames = Symbol('indexOfAnimationFrames');

const privateData = new WeakMap();
export default class AnimationFrameList {
  constructor() {
    this[frames] = [];
    this[indexOfAnimationFrames] = 0;
    privateData.set(this, { name: 'yohan choi', phone: '647-332-0960' });
  }

  get frames() {
    return this[frames];
  }

  get indexOfAniamtionFrames() {
    return this[indexOfAnimationFrames];
  }

  set indexOfAniamtionFrames(index) {
    this[indexOfAnimationFrames] = index;
  }

  get framesLength() {
    return this[frames].length;
  }

  insertFrame = (frame = [], index = -1) => {
    if (!Array.isArray(frame) || !Number.isInteger(index)) {
      throw new Error('invalid types of arguments passed!', frame, index);
    }

    if (index === -1) {
      return this[frames].push(frame);
    }

    if (index === 1) {
      return this[frames].unshift(frame);
    }

    return this[frames].splice(index, 0, frame);
  };

  getFrame = (index = -1) => {
    // console.log(privateData.get(this).name);
    if (!Number.isInteger(index)) {
      throw new Error('invalid types of arguments passed!', index);
    }

    if (!this.framesLength || this.framesLength <= index) {
      return false;
    }

    if (index === -1) {
      return this[frames][this.framesLength - 1];
    }

    return this[frames][index];
  };

  updateFrame = (frame = [], index = -1) => {
    if (!Array.isArray(frame) || !Number.isInteger(index)) {
      throw new Error('invalid types of arguments passed!', frame, index);
    }

    if (!this.framesLength || this.framesLength <= index) {
      return false;
    }

    if (index === -1) {
      this[frames][this.framesLength - 1] = frame;
      return this[frames][this.framesLength - 1];
    }
    this[frames][index] = frame;
    return this[frames][index];
  };

  deleteFrame = (index = -1) => {
    if (!Number.isInteger(index)) {
      throw new Error('invalid types of arguments passed!', index);
    }

    if (!this.framesLength || this.framesLength <= index) {
      return false;
    }

    if (index === -1) {
      return this[frames].pop();
    }

    return this[frames].splice(index, 1);
  };
}
