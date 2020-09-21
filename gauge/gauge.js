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
            text-align: center;
            justify-content: left;
        }

        .gauge-example-div {
            background-color: transparent;
            width: 10%;
            
            margin: 5px;
            text-align: center;
            line-height: 25px;
            font-size: 14px;
			border: solid 1px #fff;
        }

        .gauge-example>.gauge-description {
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
	background: grey;
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
	min-width: 88.24%;
	min-height: 88.24%;	
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
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 0%, #000 1%, #000 13%, rgba(0, 0, 0, 0) 13%);
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
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 0%, #000 1%, #000 13%, rgba(0, 0, 0, 0) 13%);
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
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 0%, #000 1%, #000 13%, rgba(0, 0, 0, 0) 13%);
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
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 0%, #000 1%, #000 8%, rgba(0, 0, 0, 0) 8%)
}

.gauge .ticks .tnth {
	transform: rotate(calc(5.4deg * var(--gauge-tithe-tick-tnth) - 45deg));
	background: black;
	position: relative;
	left: 0;
	top: 50%;
	width: 100%;
	height: 1%;
	margin-bottom: -1%;
	background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0, rgba(0, 0, 0, 0) 0%, #000 1%, #000 4%, rgba(0, 0, 0, 0) 4%)
}

.gauge .tick-circle {
	position: absolute;
	top: 7%;
	left: 7%;
	width: calc(85% - .1em);
	height: calc(85% - .1em);
	border-left: .1em solid  transparent;
	border-top: .1em solid  transparent;
	border-right: .1em solid  transparent;
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
	left: 45%;
	width: 10%;
	text-align: center;	
	height: 0;
}

.gauge .labels .value-label-min {
	position: relative;
	top: 72%;
	left: 22%;
	width: 10%;
	font-size: 16px;
	height: 0
}

.gauge .labels .value-label-max {
	position: relative;
	top: 72%;
	left: 70%;
	width: 10%;
	font-size: 16px;
	height: 0
}

.gauge .labels .value-label-mid {
	position: relative;
	top: 18%;
	left: 45%;
	width: 10%;
	font-size: 16px;
	height: 0
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
  background-color: #fff;
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

  position: absolute;
  top: 0;
  right: 0;
  border-right: 150px solid white;
  border-top: 150px solid transparent;
  transform-origin: bottom left;
  transform: rotate (0deg);
}
.sect:nth-child(2) {
  transform: rotate(0deg);
  border-right: 150px solid orange;
}
.sect:nth-child(3) {
  transform: rotate(45deg);
  border-right: 150px solid red;
}
.sect:nth-child(4) {
  transform: rotate(90deg);
  border-right: 150px solid white;
}

.centercircle {
  position: absolute;
  top: 45%;
  left: 45%;
  text-align: center;
  width: calc(10%);
  height: calc(10%);
  border-radius: 100%;
  background-color: #3498eb;
}
	
    </style>
	
		<div class="gauge-example">
			<div id="modvar">
            <h1>Memory</h1>
			<div  class="outer">
				<div class="gauge" id="demoGauge" style="
					--gauge-value:0;
					width:66.7%;
					height:66.7%;">
						
						<div class="circle-border-final">
							<div class="sect"></div>
							<div class="sect"></div>
							<div class="sect"></div>
							<div class="sect"></div>
							<div class="circle"></div>						
						</div>

						<div class="ticks">
							<div class="tithe" style="--gauge-tithe-tick:1;"> </div>		
							<div class="tithe" style="--gauge-tithe-tick:2;"></div>	
							<div class="tithe" style="--gauge-tithe-tick:3;"></div>	
							<div class="tithe" style="--gauge-tithe-tick:4;">
							</div>	
							<div class="tithe" style="--gauge-tithe-tick:6;"></div>
							<div class="tithe" style="--gauge-tithe-tick:7;"></div>
							<div class="tithe" style="--gauge-tithe-tick:8;"></div>
							<div class="tithe" style="--gauge-tithe-tick:9;"></div>
							<div class="min"></div>
							<div class="mid"></div>
							<div class="max"></div>
							
							<div class="tnth" style="--gauge-tithe-tick-tnth:1;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:2;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:3;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:4;"></div>		

							<div class="tnth" style="--gauge-tithe-tick-tnth:6;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:7;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:8;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:9;"></div>			

							<div class="tnth" style="--gauge-tithe-tick-tnth:11;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:12;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:13;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:14;"></div>			

							<div class="tnth" style="--gauge-tithe-tick-tnth:16;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:17;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:18;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:19;"></div>	

							<div class="tnth" style="--gauge-tithe-tick-tnth:21;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:22;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:23;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:24;"></div>	

							<div class="tnth" style="--gauge-tithe-tick-tnth:26;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:27;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:28;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:29;"></div>								
							
							<div class="tnth" style="--gauge-tithe-tick-tnth:31;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:32;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:33;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:34;"></div>	

							<div class="tnth" style="--gauge-tithe-tick-tnth:36;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:37;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:38;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:39;"></div>	

							<div class="tnth" style="--gauge-tithe-tick-tnth:41;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:42;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:43;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:44;"></div>		


							<div class="tnth" style="--gauge-tithe-tick-tnth:46;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:47;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:48;"></div>
							<div class="tnth" style="--gauge-tithe-tick-tnth:49;"></div>								
						</div>
						<div class="tick-circle"></div>

						<div class="needle">
							<div class="needle-head"></div>
						</div>
						<div class="centercircle">
						</div>
						<div class="labels">
							<div class="value-label"></div>
							<div class="value-label-min">0</div>
							<div class="value-label-max">100</div>
							<div class="value-label-mid">50</div>
						</div>
						<div><p style="position: absolute; top: 60px; left: 75px;"></p></div>
					
				</div>
			</div>
			</div>
		</div>
	`;

	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$modvar = shadowRoot.querySelector('#modvar');
			console.log(this.$modvar.innerHTML);			
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val, info) {
			if(val >=0 && val<=100) {
				console.log(val, info);
                this.$modvar.innerHTML = '<h1>' + info + '</h1> <div  class="outer"> <div class="gauge" id="demoGauge" style=" --gauge-value:' + val + '; width:66.7%; height:66.7%;">  <div class="circle-border-final"> <div class="sect"></div> <div class="sect"></div> <div class="sect"></div> <div class="sect"></div> <div class="circle"></div>						 </div>  <div class="ticks"> <div class="tithe" style="--gauge-tithe-tick:1;"> </div>		 <div class="tithe" style="--gauge-tithe-tick:2;"></div>	 <div class="tithe" style="--gauge-tithe-tick:3;"></div>	 <div class="tithe" style="--gauge-tithe-tick:4;"> </div>	 <div class="tithe" style="--gauge-tithe-tick:6;"></div> <div class="tithe" style="--gauge-tithe-tick:7;"></div> <div class="tithe" style="--gauge-tithe-tick:8;"></div> <div class="tithe" style="--gauge-tithe-tick:9;"></div> <div class="min"></div> <div class="mid"></div> <div class="max"></div>  <div class="tnth" style="--gauge-tithe-tick-tnth:1;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:2;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:3;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:4;"></div>		  <div class="tnth" style="--gauge-tithe-tick-tnth:6;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:7;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:8;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:9;"></div>			  <div class="tnth" style="--gauge-tithe-tick-tnth:11;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:12;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:13;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:14;"></div>			  <div class="tnth" style="--gauge-tithe-tick-tnth:16;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:17;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:18;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:19;"></div>	  <div class="tnth" style="--gauge-tithe-tick-tnth:21;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:22;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:23;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:24;"></div>	  <div class="tnth" style="--gauge-tithe-tick-tnth:26;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:27;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:28;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:29;"></div>								  <div class="tnth" style="--gauge-tithe-tick-tnth:31;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:32;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:33;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:34;"></div>	  <div class="tnth" style="--gauge-tithe-tick-tnth:36;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:37;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:38;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:39;"></div>	  <div class="tnth" style="--gauge-tithe-tick-tnth:41;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:42;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:43;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:44;"></div>		   <div class="tnth" style="--gauge-tithe-tick-tnth:46;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:47;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:48;"></div> <div class="tnth" style="--gauge-tithe-tick-tnth:49;"></div>								 </div> <div class="tick-circle"></div>  <div class="needle"> <div class="needle-head"></div> </div> <div class="centercircle"> </div> <div class="labels"> <div class="value-label">' + val + '</div> <div class="value-label-min">0</div> <div class="value-label-max">100</div> <div class="value-label-mid">50</div> </div> <div><p style="position: absolute; top: 60px; left: 75px;"></p></div>  </div> </div>';
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
			
			
			this.render(this.$value, this.$info);
		}
	}	
	customElements.define("com-demo-gauge1", Box);
})();