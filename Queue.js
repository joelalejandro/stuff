/* Simple Queue object */

function Queue() {
  var first = null;
  var last = null;
  var aux = null;
  var current = null;
  
  var uuid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    };
  
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
  
  var insert = function(obj) {
    if (obj != null) {
      obj._id = uuid();
      obj.next = null;
      if (first == null) {
        first = obj;
        last = obj;
      } else {
        last.next = obj;
        last = obj;
      };
    };
  };
  
  var remove = function(obj) {
    if (first == null) {
      return false;
    } else {
      if (first._id == last._id) {
        first = null;
        last = null;
      } else {
        aux = first.next;
        first = null;
        first = aux;
      };
    };
  };
  
  var list = function() {
    var r = [];
    current = first;
    while (current != null) {
      r.push(current);
      current = current.next;
    };
    return r;
  };
  
  return { insert: insert, remove: remove, list: list };
};
