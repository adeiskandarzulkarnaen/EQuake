class FooterContent extends HTMLElement {
	constructor(){
		super();
		this._shadowFooter = this.attachShadow({mode :'open'});
	}
	
	connectedCallback(){
		this.brand = this.getAttribute('brand') || 'EQuake'
		this.creator = this.getAttribute('creator') || 'adeiskandarzulkarnaen' ;
		this.link = this.getAttribute('link') || 'https://www.instagram.com/adeiskandarzulkarnaen/' ;
		this.render();
	}
	
	render(){
		this._shadowFooter.innerHTML = `
			<style>
				:host {
					display: block;
					width: 100%;
					color: white;  /* inherit */
				}
				.footer {
					padding: 10px;
					text-align: center;
					background: black;
				}				
				.footer > p > a {
					text-decoration: none;
					color: #5dd782;
				}				
				.footer > p > a:hover {
					color: #0d6efd;
				}
			</style>

			<div class="footer">
				<p> 
					${this.brand} | created by <a href="${this.link}">${this.creator}</a> | &copy; 2022
				</p>
			</div>
		`;
	}
	
	attributesChangedCallback(name, oldValue, newValue){
		this[name] = newValue ;
		this.render();
	}
	
	static get observedAttributes() {
		return ['brand','creator', 'link'];
	}
}

customElements.define('footer-content', FooterContent)