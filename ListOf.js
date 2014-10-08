function ListOf(type) {
  var arr = [];
  var t = type;
  
  var add = function(i) {
    if (typeof i == t) {
      arr.push(i);
      return this;
    } else {
      throw new Error("Item type must be '" + t + "'");
    };
  };
  
  var insert = function(x, i) {
    if (x > arr.length) {
      throw new Error("Index out of range: x must be <= " + arr.length);
    };
    if (typeof i == t) {
      arr.splice(0, x).concat([i]).concat(arr.splice(x - 1));
      return this;
    } else {
      throw new Error("Item type must be '" + t + "'");
    };
  };
  
  var remove = function(i) {
    if (t != "object") {
      arr = arr.filter(function(a) { return a != i; });
      return this;
    }
  };
  
  var find = function(what) {
    if (typeof what == "object") {
      // ...
    };
  };
  
  var toString = function() {
    return "ListOf<" + t + "> {" + arr.join(", ") + "}";
  };
  
  var valueOf = function() {
    return "string";
  };  
  
  var toArray = function() {
    return arr;
  };
  
  return { add: add, insert: insert, toString: toString, toArray: toArray,
  remove: remove}
}
