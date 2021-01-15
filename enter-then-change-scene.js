AFRAME.registerComponent("enter-then-change-scene", {
	schema: {
		to:{type: 'selector'},
		fadePanel: { type: 'selector' },
        fadeTime: { default: 100 },
	},
	init: function() {
		
	},
	tick: function(){
//		let camPos = document.getElementById("cam-rig").getAttribute("position");
		let camPos = document.querySelector("#cam-rig").getAttribute("position");
		
		let pos = new THREE.Vector3(this.data.position.x, this.data.position.y, this.data.position.z);
		//
		async () => {
		if(camPos.x >= pos.x+6 && camPos.x<=pos.x-6 && camPos.y > 50){
            if (this.data.fadePanel) {
                this.data.fadePanel.emit("fadeOut");
                await this.wait(this.data.fadeTime);
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
                await this.wait(this.data.fadeTime);
            }

            if (this.data.onEndEvent) {
                this.el.emit(this.data.onEndEvent);
            }
			
		}
		}
	},
	wait: async function(ms) {
        return new Promise(r => {
            setTimeout(r, ms);
        });
    }
})