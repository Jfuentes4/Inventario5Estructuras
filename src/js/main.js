import InventoryManager from './InventoryManager.js';

class Main {
  constructor () {
    this._form = document.getElementById('newArticleForm');
    this._inventoryManager = new InventoryManager();
    document.getElementById('addArticle').addEventListener('click', this._addArticle);
    document.getElementById('btnSearch').addEventListener('click', this._searchArticle);
    document.getElementById('btnPreO').addEventListener('click', this._getPreO);
    document.getElementById('btnInO').addEventListener('click', this._getInO);
    document.getElementById('btnPostO').addEventListener('click', this._getPostO);
  }

  _addArticle = () => {
    if(this._form.checkValidity() === true) {
      let dataArticle = this._getData();
      this._inventoryManager.addArticle(dataArticle);
      document.getElementById('newArticleForm').reset();
    }
   this._form.classList.add('was-validated');
  }

  _searchArticle = (e) => {
    e.preventDefault();
    let strSearched = document.getElementById('Index').value;
    this._inventoryManager.searchArticles(strSearched);
  }

  _getPreO = () => {
      let elements = this._inventoryManager.getPreOrderElements();
      document.getElementById('report').innerHTML = elements;
    }

  _getInO = () => {
    let elements = this._inventoryManager.getInOrderElements();
    document.getElementById('report').innerHTML = elements;
  }

  _getPostO = () => {
    let elements = this._inventoryManager.getPostOrderElements();
    document.getElementById('report').innerHTML = elements;
  }

  _getData  = () => {
    let name = document.getElementById('name').value;
    let code = Number(document.getElementById('code').value);
    let price = Number(document.getElementById('price').value);
    let quantity = Number(document.getElementById('quantity').value);
    let description = document.getElementById('description').value;
    //let position = Number(document.getElementById('position').value);

    let objArticle = {
      name,
      code,
      price,
      quantity,
      description,
    };
    return objArticle;
  }

}

var main = new Main();
