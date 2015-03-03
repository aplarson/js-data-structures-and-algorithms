function KeyStore () {
  this.buckets = [[], [], [], [], [], [], [], []];
  this.entryCount = 0;
}

KeyStore.prototype.bucketCount = function () {
  return this.buckets.length;
};

KeyStore.prototype.include = function (el) {
  var bucket = this.buckets[Math.floor(el % this.buckets.length)];
  return bucket.indexOf(el) >= 0;
};

KeyStore.prototype.insert = function (el) {
  if (this.include(el)) {
    return false;
  }
  var bucket = this.buckets[Math.floor(el % this.buckets.length)];
  bucket.push(el);
  this.entryCount += 1;
  return true;
};

KeyStore.prototype.delete = function (el) {
  if (!this.include(el)) {
    return false;
  }
  var bucket = this.buckets[Math.floor(el % this.buckets.length)];
  var elIdx = bucket.indexOf(el);
  bucket.splice(elIdx, 1);
  this.entryCount -= 1;
  return true;
};

KeyStore.prototype.resize = function () {
  var oldBuckets = this.buckets;
  this.entryCount = 0;
  this.buckets = new Array(this.buckets.length * 2);
  for (var i = 0, length = this.buckets.length; i < length; i++) {
    this.buckets[i] = [];
  }
  var set = this;
  oldBuckets.forEach(function (bucket) {
    bucket.forEach(function (el) {
      set.insert(el);
    });
  });
};

KeyStore.prototype.elLoc = function (el) {
  if (!this.include(el)) {
    return -1;
  }
  var bucketNum = el % this.buckets.length;
  return bucketNum + this.buckets.length * this.buckets[bucketNum].indexOf(el);
};

function HashMap () {
  this.keys = new KeyStore();
  this.values = [];
}

HashMap.prototype.delete = function (key) {
  var keyHash = Math.abs(key.hashCode());
  var loc = this.keys.elLoc(keyHash);
  if (loc < 0) {
    return false;
  }
  this.values[loc] = null;
  this.keys.delete(keyHash);
  return true;
};

HashMap.prototype.insert = function (key, val) {
  var hashCode = Math.abs(key.hashCode());
  if (this.pairCount() > this.keyBucketCount() - 1) {
    this.remap();
  }
  this.keys.insert(hashCode);
  var elLoc = this.keys.elLoc(hashCode);
  this.values[elLoc] = val;
  return true;
};

HashMap.prototype.keyBucketCount = function () {
  return this.keys.bucketCount();
}

HashMap.prototype.lookUp = function (key) {
  var hashCode = Math.abs(key.hashCode());
  var loc = this.keys.elLoc(hashCode);
  if (loc < 0) {
    return null;
  }
  return this.values[loc];
};

HashMap.prototype.pairCount = function () {
  return this.keys.entryCount;
};

HashMap.prototype.remap = function () {
  var hash = this;
  var oldKeyBuckets = this.keys.buckets;
  var oldValues = this.values;
  this.keys.resize();
  this.values = [];
  oldKeyBuckets.forEach(function (keyBucket, bucketIdx) {
    keyBucket.forEach(function (key, idx) {
      var newLoc = hash.keys.elLoc(key);
      var oldLoc = bucketIdx + oldKeyBuckets.length * idx;
      hash.values[newLoc] = oldValues[oldLoc];
    });
  });
};

// Thanks, Stack Overflow
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
