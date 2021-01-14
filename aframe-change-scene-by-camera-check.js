AFRAME.registerComponent("change-scene", {
    schema: {
        to: { type: 'selector' },
		event: {default: "click"},
        fadePanel: { type: 'selector' },
        fadeTime: { default: 100 },
        onEndEvent: {type: "string"}
    },
    tick: function () {
        this.el.addEventListener(this.data.event, async () => {
            if (this.data.fadePanel) {
                this.data.fadePanel.emit("fadeOut");
            }
            
            document.querySelectorAll("[scene]").forEach(scene => {
                if (scene.id !== this.data.to.id) {
                    scene.setAttribute('visible', false)
                } else {
                    scene.setAttribute('visible', true)
                }
                scene.flushToDOM();
            })

            if (this.data.fadePanel) {
                this.data.fadePanel.emit("fadeIn");
            }

            if (this.data.onEndEvent) {
                this.el.emit(this.data.onEndEvent);
            }
        })
    },
})