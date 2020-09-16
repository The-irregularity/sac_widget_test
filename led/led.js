(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 10px;
			border-width: 2px;
			border-color: black;
			border-style: solid;
			display: block;
		} 

		body {
		  background: #fff;
		}
		
		.led-box {
		  height: 30px;
		  width: 30px;
		  margin: 10px 0;
		  float: left;
		}

		.led-box p {
		  font-size: 12px;
		  text-align: center;
		  margin: 1em;
		}


		.led-green {
		  margin: 0 auto;
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

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			this.$led-green = shadowRoot.querySelector('led-green');
			
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
				this.$style.innerHTML = ':host { 	border-radius: 10px; 	border-width: 2px; 	border-color: black; 	border-style: solid; 	display: block; } body {   background: #fff; }  .led-box {   height: 30px;   width: 30px;   margin: 10px 0;   float: left; }  .led-box p {   font-size: 12px;   text-align: center;   margin: 1em; }  .led-green {   margin: 0 auto;   width: 24px;   height: 24px;   background-color: #F00;   border-radius: 50%;   box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #441313 0 -1px 9px, rgba(255, 0, 0, 0.5) 0 2px 12px;		  }';
				break;
			  case 2:
				// Yellow
				this.$style.innerHTML = ':host { border-radius: 10px; border-width: 2px; border-color: black; border-style: solid; display: block; } body { background: #fff; }  .led-box { height: 30px; width: 30px; margin: 10px 0; float: left; }  .led-box p { font-size: 12px; text-align: center; margin: 1em; }  .led-green { margin: 0 auto; width: 24px; height: 24px; background-color: #FF0; border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #808002 0 -1px 9px, #FF0 0 2px 12px;		  }';
				break;
			  case 3:
				// Green
				this.$style.innerHTML = ':host { border-radius: 10px; border-width: 2px; border-color: black; border-style: solid; display: block; } body { background: #fff; } .led-box { height: 30px; width: 30px; margin: 10px 0; float: left; } .led-box p { font-size: 12px; text-align: center; margin: 1em; }  .led-green { margin: 0 auto; width: 24px; height: 24px; background-color: #ABFF00; border-radius: 50%; box-shadow: rgba(0, 0, 0, 0.2) 0 -1px 7px 1px, inset #304701 0 -1px 9px, #89FF00 0 2px 12px;		  }';
				break;
			}
			/*var val1 = val * 0.01;
			var x = this.svg_circle_arc_path(500, 500, 450, -90, val1 * 180.0 - 90);
			var rounded = Math.round( val * 10 ) / 10;

			
			if(rounded >=0 && rounded <=100) {
				this.$style.innerHTML = ':host {border-radius: 10px;border-width: 2px;border-color: black;border-style: solid;display: block;}.body {background: #fff;}.metric {padding: 10%;}.metric svg {max-width: 100%;}.metric path {stroke-width: 75;stroke: #ecf0f1;fill: none;}.metric text {font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;}.metric.participation path.data-arc {stroke: ' + color + ';}.metric.participation text {fill: ' + color + ';}';
				this.$svg.innerHTML = '<path d="M 950 500 A 450 450 0 0 0 50 500"></path><text class="percentage" text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">' + rounded + '%</text><text class="title" text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">' + info + '</text><path d="' + x + '" class="data-arc"></path>"';
			} */
		}
		  
		polar_to_cartesian(cx, cy, radius, angle) {
		    var radians;
		    radians = (angle - 90) * Math.PI / 180.0;
		    return [Math.round((cx + radius * Math.cos(radians)) * 100) / 100, Math.round((cy + radius * Math.sin(radians)) * 100) / 100];
		}
		
		svg_circle_arc_path(x, y, radius, start_angle, end_angle) {
		    var end_xy, start_xy;
		    start_xy = this.polar_to_cartesian(x, y, radius, end_angle);
		    end_xy = this.polar_to_cartesian(x, y, radius, start_angle);
		    return "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 0 0 " + end_xy[0] + " " + end_xy[1];
		  };
		  

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
	customElements.define("com-demo-ts", Box);
})();