function ListOf(type) {
  var arr = [];
  var t = type;
  
  var add = function(i) {
    var _add = function(j) {
      if (typeof j == t) {
        arr.push(j);
        return this;
      } else {
        throw new Error("Item type must be '" + t + "'");
      };
    }

    if (Array.isArray(i)) {
      for (var x = 0; x < i.length; x++) {
        _add(i[x]);
      }
      return this;
    } else {
      return _add(i);
    };
  };
  
  var all = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      return find(what).length == arr.length;
    } else if (typeof what == "function") {
      return arr.filter(what).length == arr.length;    
    }
  };
  var any = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      return find(what).length >= 1;
    } else if (typeof what == "function") {
      return arr.filter(what).length >= 1;
    } else if (!what && arr.length >= 1) {
      return true;
    }
  };
  var average = function(what) {
    var sum = 0;
    if (typeof t == "object" && typeof what == "string") {
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i][what];
      }
      return sum / arr.length;
    } else if (typeof t == "number") {
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum / arr.length;
    }
  }
  var clear = function() {
    arr = [];
    return this;
  };
  var contains = function(i) {
    return any(i);
  };
  var count = function() {
    return arr.length;
  };
  var elementAt = function(i) {
    return arr[i];
  };
  var except = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      return arr.filter(function(a) {
        var isValid = true;
        var atLeastOneValid = false;
        for (var k in what) {
          if (a.hasOwnProperty(k)) {
            if (Array.isArray(what[k])) {
              for (var j = 0; j < what[k].length; j++) {
                if (a[k] != what[k][j]) {
                  atLeastOneValid = true;
                  break;
                } 
              }
              isValid = isValid && atLeastOneValid;
            } else {
              isValid = isValid && a[k] == what[k];
            }
          }
        }
        return isValid;
      });
    } else {
      return arr.filter(function(a) {
        return a != what;
      })
    }
  };
  var exists = function(what) {
    return any(what); 
  };
  var findAll = function() {
    return toArray();
  };
  var findFirst = function(what) {
    var r = find(what);
    if (r.length > 0) {
      return r[0];
    } else {
      return null;
    }
  };
  var findLast = function(what) {
    var r = find(what);
    if (r.length > 0) {
      return r[r.length - 1];
    } else {
      return null;
    }
  };
  var first = function(what) {
    return findFirst(what);
  };
  var last = function(what) {
    return findLast(what);
  }
  var forEach = function(callback) {
    arr.map(callback);
  };
  var indexOf = function(what) {
    //...
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
    if (typeof what == "object" && !Array.isArray(what)) {
      return arr.filter(function(a) {
        var isValid = true;
        var atLeastOneValid = false;
        for (var k in what) {
          if (a.hasOwnProperty(k)) {
            if (Array.isArray(what[k])) {
              for (var j = 0; j < what[k].length; j++) {
                if (a[k] == what[k][j]) {
                  atLeastOneValid = true;
                  break;
                } 
              }
              isValid = isValid && atLeastOneValid;
            } else {
              isValid = isValid && a[k] == what[k];
            }
          }
        }
        return isValid;
      });
    } else {
      return arr.filter(function(a) {
        return a == what;
      })
    }
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
  
  return { add: add, all: all, any: any, average: average, clear: clear, contains: contains,
  count: count, elementAt: elementAt, except: except, exists: exists, findAll: findAll,
  findFirst: findFirst, findLast: findLast, first: first, last: last, forEach: forEach,
  indexOf: indexOf, insert: insert, remove: remove, find: find, toString: toString,
  valueOf: valueOf, toArray: toArray };
}
