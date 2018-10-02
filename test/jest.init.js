/* 
    source https://gist.github.com/justsml/0baf7172f8f5cf5d21e65e276ea7ed8b 
*/
Node.prototype.insertAdjacentElement = function(position, elem) {
    let _this = this;
    let parent = _this.parentNode;
    let node; 
    let first;

    switch (position.toLowerCase()) {
      case 'beforebegin':
        while ((node = elem.firstChild)) {
          parent.insertBefore(node, _this);
        }
        break;
      case 'afterbegin':
        first = _this.firstChild;
        while ((node = elem.lastChild)) {
          first = _this.insertBefore(node, first);
        }
        break;
      case 'beforeend':
        while ((node = elem.firstChild)) {
          _this.appendChild(node);
        }
        break;
      case 'afterend':
        parent.insertBefore(elem, _this.nextSibling);
        break;
    }
    return elem;
};
