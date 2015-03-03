function makeChange (amount, coins, cache) {
  var cache, i, leftover, length, newWallet, value, wallet;
  if (amount === 0) {
    return [];
  }
  wallet = [];
  cache = cache || {};
  for (i = 0, length = coins.length; i < length; i ++) {
    value = coins[i];
    if (amount >= value) {
      leftover = amount - value;
      if (typeof cache[leftover] === "undefined") {
        cache[leftover] = makeChange(leftover, coins, cache);
      }
      newWallet = [value].concat(cache[leftover]);

      if (newWallet.length < wallet.length || wallet.length === 0) {
        wallet = newWallet;
      }
    }
  }
  return wallet;
}
