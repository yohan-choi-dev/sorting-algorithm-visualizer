import { delay } from '../../../../utils';
/* 
    Animation 

*/
export default class Animation {
    constructor(
        targets,
        config = {
            animationSpeed: 1,
            animationColors: [
                'linear-gradient(to bottom, #474e53, #596268)',

                'linear-gradient(to bottom, #eeee00, #fffc00)',

                'linear-gradient(to bottom, #93291E, #ED213A)',

                'linear-gradient(to bottom, #667db6, #0082c8)',
            ],
        }
    ) {
        this.targets = targets;
        this.config = config;
        this.frames = [];
        this.framePointer = 0;
        this.undoStack = [];
        this.isPlayingAnimation = false;
        this.animation = this.generateAnimation();

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.animation.next = this.animation.next.bind(this.animation);
    }
    addFrame(effects = []) {
        this.frames.push(effects);
    }

    addAnimeEffect(...effect) {
        const top = this.frames.length - 1;
        this.frames[top].push(effect);
    }

    updateAnimeEffect(target, effect) {
        try {
            const [index, value, color] = effect;
            if (index === null || index === undefined) {
                throw new Error('index is not provided!');
            }

            target.index = index;

            if (value !== null) {
                target.innerText = value.toString();
                target.style.height = (value / 300) * 80 + '%';
            }

            if (color !== null) {
                target.style.background = this.config.animationColors[color];
            }
        } catch (error) {
            console.error(error);
        }
    }

    copyAnimeEffect(target) {
        if (target) {
            return {
                target: target,
                innerText: target?.innerText,
                height: target?.style?.height,
                background: target?.style?.background,
            };
        }
    }

    preserveAnimeEffects(effects) {
        this.undoStack.push(effects);
    }

    revertAnimeEffect(preservedEffects) {
        preservedEffects.forEach(({ target, innerText, height, background }) => {
            target.innerText = innerText;
            target.style.height = height;
            target.style.background = background;
        });
    }

    applyAnimeEffects(newEffects) {
        const previousEffects = [];
        newEffects.forEach((effect) => {
            const [index] = effect;
            const target = this.targets[index];
            previousEffects.push(this.copyAnimeEffect(target));
            this.updateAnimeEffect(target, effect);
        });
        this.preserveAnimeEffects(previousEffects.reverse());
    }

    animationEnds() {
        return this.framePointer >= this.frames.length;
    }

    *generateAnimation() {
        while (true) {
            yield this.framePointer;
            if (!this.animationEnds()) {
                this.applyAnimeEffects(this.frames[this.framePointer]);
                this.framePointer++;
            }
        }
    }

    async play() {
        this.isPlayingAnimation = !this.isPlayingAnimation;

        while (!this.animationEnds() && this.isPlayingAnimation) {
            await delay(this.config.animationSpeed).then(this.animation.next);
        }
    }

    pause() {
        this.isPlayingAnimation = false;
    }

    forward() {
        this.pause();
        this.animation.next();
    }

    backward() {
        this.pause();
        if (this.undoStack.length > 0) {
            this.revertAnimeEffect(this.undoStack.pop());
            this.framePointer--;
        }
    }
}
