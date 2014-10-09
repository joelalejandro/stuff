function ListOf(type) {
  var arr = [];
  var t = type;
  
  var _asListOf = function(val) {
    var l = new ListOf(t);
    l.add(val);
    return l;
  }

  var add = function(i) {
    var _add = function(j) {
      if (typeof j == t) {
        arr.push(j);
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
      _add(i);
      return this;
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
    } else if (typeof what == t) {
      return arr.indexOf(what) > -1;
    } else if (!what && arr.length >= 1) {
      return true;
    }
  };

  var average = function(what) {
    return sum(what) / arr.length;
  };

  var sum = function(what) {
    var sum = 0;
    if (t == "object" && typeof what == "string") {
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i][what];
      }
      return sum;
    } else if (t == "number") {
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
      }
      return sum;
    }
  };

  var clear = function() {
    arr = [];
    return this;
  };

  var contains = function(i) {
    return any(i);
  };

  var count = function(what) {
    if (!what) {
      return arr.length;
    } else {
      return find(what).count();
    }
  };

  var elementAt = function(i) {
    return arr[i];
  };

  var except = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      return _asListOf(arr.filter(function(a) {
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
      }));
    } else if (typeof what == "function") {
      return _asListOf(arr.filter(what));
    } else {
      return _asListOf(arr.filter(function(a) {
        return a != what;
      }));
    }
  };

  var exists = function(what) {
    return any(what); 
  };

  var findAll = function() {
    return _asListOf(toArray());
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
    return !what ? arr[0] : findFirst(what);
  };

  var last = function(what) {
    return !what ? arr[count() - 1] : findLast(what);
  }

  var forEach = function(callback) {
    arr.map(callback);
  };

  var indexOf = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      for (var x = 0; x < arr.length; x++) {
        var a = arr[x];
        var isValid = true;
        var atLeastOneValid = false;
        if (a == null) {
          if (what == null) {
            return x;
          } else {
            continue;
          }
        }
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
        if (isValid) return x;
      };
    } else {
      return arr.indexOf(what);
    }
  };

  var indexesOf = function(what) {
    var indexes = [];
    if (typeof what == "object" && !Array.isArray(what)) {
      for (var x = 0; x < arr.length; x++) {
        var a = arr[x];
        var isValid = true;
        var atLeastOneValid = false;
        if (a == null) {
          if (what == null) {
            indexes.push(x);
            continue;
          } else {
            continue;
          }
        }
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
        if (isValid) indexes.push(x);
      };
    } else {
      for (var x = 0; x < arr.length; x++) {
        if (arr[x] === what) indexes.push(x);
      }
    }
    return indexes;
  };

  var lastIndexOf = function(what) {
    return Math.max.apply(null, indexesOf(what));
  };

  var insert = function(x, i) {
    if (x > arr.length) {
      throw new Error("Index out of range: x must be <= " + arr.length);
    };
    if (typeof i == t) {
      arr.splice(0, x).concat([i]).concat(arr.splice(x - 1));
      return this;
    } else if (Array.isArray(i)) {
      arr.splice(0, x).concat(i).concat(arr.splice(x - 1));
    } else {
      throw new Error("Item type must be '" + t + "'");
    };
    return this;
  };

  var remove = function(i) {
    if (t != "object") {
      arr = arr.filter(function(a) { return a != i; });
    } else {
      arr = except(what);
    }
    return this;
  };

  var removeAt = function(i) {
    arr = except(elementAt(i));
    return this;
  };

  var removeRange = function(i, j) {
    var newArr = [];
    for (var x = i; x < arr.length && x < i + j; x++) {
      newArr.push(arr[x]);
    }
    arr = newArr;
    return this;
  };

  var find = function(what) {
    if (typeof what == "object" && !Array.isArray(what)) {
      return _asListOf(arr.filter(function(a) {
        var isValid = true;
        var atLeastOneValid = false;
        if (a == null) return false;
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
      }));
    } else if (typeof what == "function") {
      return _asListOf(arr.filter(what));
    } else {
      return _asListOf(arr.filter(function(a) {
        return a == what;
      }));
    }
  };

  var toString = function() {
    return "ListOf<" + t + ">[" + count() + "]";
  };

  var valueOf = function() {
    return count();
  };  

  var toArray = function() {
    return arr;
  };

  var take = function(count) {
    return _asListOf(arr.slice(0, count));
  };

  var skip = function(count) {
    return _asListOf(arr.slice(count));
  };

  var distinct = function(what) {
    var uniq = [], aux = [];
    if (t == "object" && typeof what == "string") {
      for (var x = 0; x < arr.length; x++) {
        if (arr[x] == null) continue;
        if (aux.indexOf(arr[x][what]) > -1) {
          continue;
        } else {
          aux.push(arr[x][what]);
          uniq.push(arr[x]);
        };
      };
    } else {
      for (var x = 0; x < arr.length; x++) {
        if (uniq.indexOf(arr[x]) > -1) {
          continue;
        } else {
          uniq.push(arr[x]);
        };
      };
    }
    return _asListOf(uniq);
  };

  var max = function(what) {
    if (t == "object" && typeof what == "string") {
      return Math.max.apply(null, arr.map(function(i) { return i[what] }));
    } else {
      return Math.max.apply(null, arr);
    };
  };

  var min = function(what) {
    if (t == "object" && typeof what == "string") {
      return Math.min.apply(null, arr.map(function(i) { return i[what] }));
    } else {
      return Math.min.apply(null, arr);
    };
  };

  var orderBy = function(what) {
    if (t == "object" && typeof what == "string") {
      return _asListOf(arr.sort(function(x, y) {
        if (x != null && y != null) {
          return x[what] > y[what];
        } else {
          return false;
        }
      }));
    };
  };

  var orderByDescendent = function(what) {
    return _asListOf(orderBy(what).toArray().reverse());
  };

  var reverse = function() {
    return _asListOf(arr.reverse());
  };
  
  return { 
    add: add, 
    all: all,
    any: any,
    average: average,
    clear: clear,
    contains: contains,
    count: count,
    distinct: distinct,
    elementAt: elementAt,
    except: except,
    exists: exists,
    find: find, 
    findAll: findAll,
    findFirst: findFirst,
    findLast: findLast,
    first: first,
    forEach: forEach,
    indexOf: indexOf,
    indexesOf: indexesOf, 
    insert: insert, 
    last: last,
    lastIndexOf: lastIndexOf, 
    max: max,
    min: min, 
    orderBy: orderBy, 
    orderByDescendent: orderByDescendent,
    remove: remove, 
    removeAt: removeAt, 
    removeRange: removeRange, 
    reverse: reverse,
    take: take, 
    toString: toString,
    toArray: toArray, 
    skip: skip, 
    sum: sum, 
    valueOf: valueOf 
  };
}
