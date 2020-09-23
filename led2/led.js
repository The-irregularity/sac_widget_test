(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			display: block;
		} 

		body {
		  background: #fff;
		}
		
		.led-box {
		  height: 30px;
		  width: 30px;
		  float: left;
		}

		.led-box p {
		  font-size: 12px;
		  text-align: center;
		}


		.led-green {
		  width: 24px;
		  height: 24px;
		  background-color: #F00;
		  border-radius: 50%;
		  box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;		  
		}
			
		
		</style>
		
		<div class="container">
		  <div class="row">
			  <div class="led-box">
				<div class="led-green"></div>
			  </div>
		  </div>
		</div>
	`;

	class Led extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val) {
			
			switch(val) {
			  case 1:
				// Red
				this.$style.innerHTML = ':host { 	display: block; } body {   background: #fff; }  .led-box {   height: 30px;   width: 30px;   float: left; }  .led-box p {   font-size: 12px;   text-align: center; }  .led-green {   width: 24px;   height: 24px;   background-color: #F00;   border-radius: 50%;   box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;		  }';
				break;
			  case 2:
				// Yellow
				this.$style.innerHTML = ':host { display: block; } body { background: #fff; }  .led-box { height: 30px; width: 30px; float: left; }  .led-box p { font-size: 12px; text-align: center; }  .led-green { width: 24px; height: 24px; background-color: #FF0; border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px;		  }';
				break;
			  case 3:
				// Green
				this.$style.innerHTML = ':host { display: block; } body { background: #fff; } .led-box { height: 30px; width: 30px; float: left; } .led-box p { font-size: 12px; text-align: center; }  .led-green { width: 24px; height: 24px; background-color: #ABFF00; border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;		  }';
				break;
			  default:
			  //Red
				this.$style.innerHTML = ':host { 	display: block; } body {   background: #fff; }  .led-box {   height: 30px;   width: 30px;   float: left; }  .led-box p {   font-size: 12px;   text-align: center; }  .led-green {   width: 24px;   height: 24px;   background-color: #F00;   border-radius: 50%;   box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;		  }';
				break;			  
			}

		}
		  	  

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			this.render(this.$value);
		}
	}	
	customElements.define("com-demo-led", Led);
})();