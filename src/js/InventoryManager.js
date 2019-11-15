import Article from './Article.js';

class InventoryManager {
  constructor () {
    this._root = null;
  }

  addArticle = (dataArticle) => {
    if (!this.findArticle(dataArticle.code)) {
      if(this._setElementInTree(dataArticle)){
        window.alert('el articulo ha sido añadido correctamente');
      }
    } else {
      window.alert('este Articulo ya esta actualmente registrado');
    }
  };

  _setElementInTree = (dataArticle) => {
    let success = false;
    //console.log(dataArticle);
    if (this._root === null) {
      this._root = {data: new Article(dataArticle), childL: null, childR: null};
      success = true;
    } else {
      let element = {data: new Article(dataArticle), childL: null, childR: null};
      this._add(this._root, element);
      success = true;
    }

    return success;
  };

  _add = (root, element) => {
    if (element.data.code < root.data.code) {
      if (root.childL === null) {
        root.childL = element;
      } else {
        this._add(root.childL, element);
      }
    } else {
      if (root.childR === null) {
        root.childR = element;
      } else {
        this._add(root.childR, element);
      }
    }
  };

  searchArticles = (str) => {
    let result = this.findArticle(Number(str));
    //console.log(result);
    if (result){
      window.alert(result.data.toString());
    } else {
      window.alert('no se encontro el producto con el codigo ' + str);
    }
  };

  findArticle = (pCode) => {
    let found = false;

    if (this._root === null){
      found = false;
    } else if (this._root.data.code === pCode){
      found = this._root;
    } else {
      found = this._findElement(this._root, pCode);
    }

    return found;
  };

  _findElement = (root, code) => {
    let found = false;

    if (code < root.data.code) {
      if (root.childL === null) {
        found = false;
      } else if (root.childL.data.code === code) {
        found = root.childL;
      } else{
        found = this._findElement(root.childL, code);
      }
    } else {
      if (root.childR === null) {
        found = false;
      } else
      if (root.childR.data.code === code) {
        found = root.childR;
      } else {
        found = this._findElement(root.childR, code);
      }
    }

    return found;
  };

  getPreOrderElements = () => {
    return this._preOrder(this._root);
  };

  _preOrder (root) {
    let strElements = '';
    strElements += root.data.code + ', ';
    if (root.childL !== null) {
      strElements += this._preOrder(root.childL);
    }
    if (root.childR !== null) {
      strElements += this._preOrder(root.childR);
    }
    return strElements;
  };

  getInOrderElements = () => {
    return this._inOrder(this._root);
  };

  _inOrder (root) {
    let strElements = '';
    if (root.childL !== null) {
      strElements += this._inOrder(root.childL);
    }
    strElements += root.data.code + ', ';
    if (root.childR !== null) {
      strElements += this._inOrder(root.childR);
    }
    return strElements;
  };

  getPostOrderElements = () => {
    return this._postOrder(this._root);
  };

  _postOrder (root) {
    let strElements = '';
    if (root.childL !== null) {
      strElements += this._postOrder(root.childL);
    }
    if (root.childR !== null) {
      strElements += this._postOrder(root.childR);
    }
    strElements += root.data.code + ', ';
    return strElements;
  };

}

export default InventoryManager;
