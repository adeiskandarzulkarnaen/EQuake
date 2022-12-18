class Navbar extends HTMLElement {
  constructor() {
    super();
    this._shadowNavbar = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.brand = this.getAttribute('brand') || 'EQuake';
    this.inputType = this.getAttribute('inputType') || 'date';
    this.placeholder = this.getAttribute('placeholder') || 'input date';
    this.render();
  }

  set searchEvent(event) {
    this._searchEvent = event;
    this.render(); /* harus ada render */
  }

  get getDateValue() {
    return this._shadowNavbar.querySelector('#inputDate').value;
  }

  render() {
    this._shadowNavbar.innerHTML = `
      <style>
        * {
          margin: 0 ;
          padding: 0;
          box-sizing: border-box;
        }
        :host {
          display: block;
          font-family: inherit;
          width: 100%;
          color: white;  /* inherit */
        }
        .navbar-flex-container {
          display: flex;
          width: 100%;
          padding: 1.2rem 0;
          justify-content: space-between;
          background-color: #242329;
        }
        .navbar-brand {
          flex-grow: 1;
          align-self: center;
        }
        .brand {
          font-size: 2rem;
          margin: 0 0 0 21px;
        }
        .navbar-search {
          flex-grow: 1;
          align-self: center;
        }
        .form-search {
          float: right;
          margin: 0 38px 0 0;
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
        .input {
          font: inherit;
          margin-right: 5px;
          padding: 5px;
          border: none;
          border-radius: 4px;
          background-color: white;
          outline: 2px solid #fff;
        }
        
        /* Responsive layout - when the screen is less than 465px wide... */
        @media screen and (max-width: 465px) {
          .navbar-flex-container {
            flex-direction: column;
          }
          .brand,
          .form-search {
            margin: 5px 10px;
          }
        }
        @media screen and (max-width: 310px) {
          .input {
            width: 80px;
          }
        }
      </style>
      <nav class="navbar-flex-container">
        <div class="navbar-brand">
          <span class="brand">${this.brand}</span>
        </div>
        <div class="navbar-search">
          <form class="form-search">
            <input class="input" id="inputDate" type="${this.inputType}" placeholder="${this.placeholder}">
            <button class="btn" type="button" id="searchEquakeData">Search</button>
          </form>
        </div>
      </nav>`;

    this._shadowNavbar.querySelector('#searchEquakeData')
      .addEventListener('click', this._searchEvent);
  }

  attributesChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ['brand', 'inputType', 'placeholder'];
  }
}

customElements.define('nav-bar', Navbar);
