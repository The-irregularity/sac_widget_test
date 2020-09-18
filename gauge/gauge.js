(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
   <style>
        body {
            font-family: sans-serif;
            background-color: #aaa;
        }

        .gauge-example {
            display: flex;
            flex-wrap: wrap;
            text-align: left;
            justify-content: left;
        }

        .gauge-example>div {
            background-color: transparent;
            width: 0%;
            min-width: 350px;
            margin: 5px;
            text-align: center;
            padding-top: 1px;
            line-height: 25px;
            font-size: 14px;
        }

        .gauge-example>.gauge-description {
            padding: 1em;
            text-align: left;
        }

        .gauge-example>.gauge-description pre {
            font-size: 12px;
        }

        .gauge {
            margin: auto;
        }

        footer {
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #c2c2c2;
            text-align: center;
            padding: 0.5em;
            border-top: solid 1px #aeaeae;
        }

        footer a {
            color: #0366d6;
        }
.outer {
	position: relative;
	overflow: hidden;
	background: var(--gauge-bg);
	border: 2px solid black;
	border-radius: 50%;
	width: 340px;
	height: 340px;
	font-weight: 700;
	font-size: 34px
}


.gauge {
	position: relative;
	background: var(--gauge-bg);
	border: .55em solid #EAE4E3;
	border-radius: 50%;
	min-width: 300px;
	min-height: 300px;
	font-weight: 700;
	font-size: 34px
} 
.gauge .kpi{
	position: absolute;
	border: .55em solid #EAE4E3;
	border-radius: 50%;
	min-width: 250px;
	min-height: 250px;
	font-weight: 700;
	font-size: 34px
}
.gauge .ticks {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0
}

.gauge .ticks .min {
	background: #000;
	position: relative;
	left: 0;
	top: 50%;
	width: 100%;
	height: 1%;
	margin-bottom: -1%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 4%, #000 4%, #000 15%, rgba(0, 0, 0, 0) 15%);
	transform: rotate(-45deg)
}

.gauge .ticks .mid {
	background: #000;
	position: relative;
	left: 0;
	top: 50%;
	width: 100%;
	height: 1%;
	margin-bottom: -1%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 4%, #000 4%, #000 15%, rgba(0, 0, 0, 0) 15%);
	transform: rotate(90deg)
}

.gauge .ticks .max {
	background: #000;
	position: relative;
	left: 0;
	top: 50%;
	width: 100%;
	height: 1%;
	margin-bottom: -1%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 4%, #000 4%, #000 15%, rgba(0, 0, 0, 0) 15%);
	transform: rotate(225deg)
}

.gauge .ticks .tithe {
	transform: rotate(calc(27deg * var(--gauge-tithe-tick) - 45deg));
	background: #000;
	position: relative;
	left: 0;
	top: 50%;
	width: 100%;
	height: 1%;
	margin-bottom: -1%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 10%, #000 10%, #000 15%, rgba(0, 0, 0, 0) 15%)
}

.gauge .tick-circle {
	position: absolute;
	top: 15%;
	left: 15%;
	width: calc(70% - .1em);
	height: calc(70% - .1em);
	border-left: .1em solid transparent;
	border-top: .1em solid transparent;
	border-right: .1em solid transparent;
	border-bottom: .1em solid transparent;
	border-radius: 100%
}

.gauge .needle {
	transform: rotate(calc(270deg * calc(var(--gauge-value, 0deg)/ 100) - 45deg));
	background: #000;
	position: relative;
	left: 0;
	top: 49%;
	width: 100%;
	height: 2%;
	margin-bottom: -4%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 10%, #000 10%, #000 50%, rgba(0, 0, 0, 0) 50%)
}

.gauge .needle .needle-head {
	position: relative;
	top: 15%;
	left: 8.9%;
	width: 1.7%;
	height: 70%;
	background-color: #000;
	transform: rotate(-45deg)
}

.gauge .labels {
	position: absolute;
	width: 100%;
	height: 100%
}

.gauge .labels .value-label {
	position: relative;
	top: 75%;
	left: 51%;
	width: 10%;
	height: 0
}

.gauge .labels .value-label::after {
	counter-reset: gauge-value var(--gauge-display-value);
	content: counter(gauge-value);
	text-align: right;
	float: right;
	width: 3em
}

.guide-x,
.guide-y {
	background-color: orange;
	visibility: visible;
	position: absolute;
	left: 50%;
	top: 0;
	width: 1px;
	height: 100%
}

.guide-y {
	left: 0;
	top: 50%;
	width: 100%;
	height: 1px
}

.circle {
  overflow: hidden;
  position: absolute;
  top: 6%;
  left: 6%;
  text-align: center;
  width: calc(88% - .1em);
  height: calc(88% - .1em);
  border-radius: 100%;
  background-color: #ffffff;
}

.circle-border-error {
  position: absolute;
  overflow: hidden;
  text-align: center;
  top: 5%;
  left: 5%;
  width: calc(95% - .1em);
  height: calc(95% - .1em);
  margin-left: 1%;
  border-radius: 100%;
  background-color: #E53B3B;
  background-image: linear-gradient(315deg, transparent 50%, #fff 50%), 
					linear-gradient(175deg, transparent 50%, #fff 50%);
  transform: rotate(51deg) skewX(0deg);
}

.circle-border-warning {
  position: absolute;

  text-align: center;

  width: calc(100% - .1em);
  height: calc(100% - .1em);
  margin-left: .5%;
  border-radius: 100%;
  background-color: #fff;
  background-image: linear-gradient(340deg, transparent 20%, #fff 1%),
                    linear-gradient(300deg, yellow 25%, red 25%);				
  transform: rotate(300deg) skewX(0deg);
}

.circle-border-final {
  width: calc(100%);
  height: calc(100%);
  background: #fff;
  border-radius: 50%;
  position: absolute;
  overflow: hidden;
  transform: rotate(0deg) skewX(0deg);
}
.sect {

  height: 0px;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  border-right: 150px solid white;
  border-top: 150px solid transparent;
  transform-origin: bottom left;
}
.sect:nth-child(2) {
  transform: rotate(10deg);
  border-right: 150px solid orange;
}
.sect:nth-child(3) {
  transform: rotate(50deg);
  border-right: 150px solid red;
}
.sect:nth-child(4) {
  transform: rotate(90deg);
  border-right: 150px solid white;
}

.sect {

  height: 0px;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  border-right: 150px solid white;
  border-top: 150px solid transparent;
  transform-origin: bottom left;
}
.sect:nth-child(2) {
  transform: rotate(10deg);
  border-right: 150px solid orange;
}
.sect:nth-child(3) {
  transform: rotate(50deg);
  border-right: 150px solid red;
}
.sect:nth-child(4) {
  transform: rotate(90deg);
  border-right: 150px solid white;
}		
    </style>



    <div class="gauge-example">
        <div>
            <h1>Memory</h1>
			<!--<div  class="outer">-->
				<div class="gauge" id="demoGauge" style="
					--gauge-value:0;
					width:200px;
					height:200px;">
											
						<div class="circle-border-final">
							<div class="sect"></div>
							<div class="sect"></div>
							<div class="sect"></div>
							<div class="sect"></div>
							<div class='circle'></div>						
						</div>

						<div class="ticks">
							<div class="tithe" style="--gauge-tithe-tick:1;"></div>
							<div class="tithe" style="--gauge-tithe-tick:2;"></div>
							<div class="tithe" style="--gauge-tithe-tick:3;"></div>
							<div class="tithe" style="--gauge-tithe-tick:4;"></div>
							<div class="tithe" style="--gauge-tithe-tick:6;"></div>
							<div class="tithe" style="--gauge-tithe-tick:7;"></div>
							<div class="tithe" style="--gauge-tithe-tick:8;"></div>
							<div class="tithe" style="--gauge-tithe-tick:9;"></div>
							<div class="min"></div>
							<div class="mid"></div>
							<div class="max"></div>
						</div>
						<div class="tick-circle"></div>

						<div class="needle">
							<div class="needle-head"></div>
						</div>
											
						<div class="labels">
							<div class="value-label"></div>
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
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val, info) {
			if(val >=0 && val<=100) {
                document.getElementById(id).style.setProperty('--gauge-display-value', newGaugeDisplayValue);
                document.getElementById(id).style.setProperty('--gauge-value', newGaugeValue);				
			}
		}
		  	  

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			
			this.render(this.$value, this.$info, this.$color);
		}
	}	
	customElements.define("com-demo-gauge1", Box);
})();