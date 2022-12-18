class MainBanner extends HTMLElement {
  constructor() {
    super();
    this.shadowBanner = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.src = this.getAttribute('src') || './img/earth.png';
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render(); /* harus ada render */
  }

  render() {
    this.shadowBanner.innerHTML = `
      <style>
        :host {
          background : green;
          font-family: inherit;
          color : inherit;
        }
        .flex-container {
          display: flex;
          padding: 4.8rem 0 10rem 0;
        }        
        .flex-item-caption {
          flex-basis: 55%;
          align-self: center;
          padding: 2.5rem 0 2.5rem 3rem;
        }
        .flex-item-caption > p > a {
          text-decoration: none;
          color: #5dd782;
        }        
        .flex-item-caption > p > a:hover {
          color: #0d6efd;
        }        
        .flex-item-img {
          flex-basis: 45%;
          align-self: center;
        }        
        .earth {
          max-width: 60%;
          height: auto;
        }        
        .btn {
          font: inherit;
          color: inherit;
          font-size: medium;      
          border: 1px solid #0d6efd;
          background-color: #0d6efd;
          border-radius: 5px;
          padding: 0.5rem;
        }        
        .btn:hover {
          color: #0d6efd;
          background-color: #fff;
          border: 1px solid #0d6efd;
        }      
        .h5,
        h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }        
        h5 {
          font-size: calc(1rem + 0.3vw);
          margin: 0.5rem 0;
          font-weight: bolder;
        }        
        h3 {
          font-size: calc(1.3rem + 0.6vw);
        }        
        @media (max-width: 840px) {
          .earth {
            display: none;
          }      
          .flex-item-caption {
            flex-basis: 100%;
            padding: 3.1rem 1.5rem;
            background-image: url("${this.src}");
            background-size: 250px;
            background-position: center;
            background-repeat: no-repeat;
          }      
          .flex-item-img {
            flex-basis: 0%;
            padding: 0 !important;
            margin: 0 !important;
          }
        }    
      </style>

      <div class="flex-container">
        <div class="flex-item-caption">
          <h5><b>Adakah anda merasakan gempa bumi ??</b></h5>
          <h3><b>CARI TAHU SEKARANG !!</b></h3>
          <p>Dengan EQuake kamu bisa tahu kejadian gempa bumi terupdate di seluruh wilayah indonesia.  
          Dengan data terpercaya dari <a href="https://bmkg.go.id">BMKG</a>.
          </p>
          <button class="btn" id="autoUpdateButton">Gempa Terbaru</button>
        </div>
        <div class="flex-item-img">
          <img src="${this.src}" alt="earth" class="earth">
        </div>
      </div>
    `;
    this.shadowBanner.querySelector('#autoUpdateButton').addEventListener('click', this._clickEvent);
  }

  attributesChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['src'];
  }
}

customElements.define('main-banner', MainBanner);
