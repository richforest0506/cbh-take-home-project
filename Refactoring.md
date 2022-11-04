# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The execution time of the function is fasted by reducing the number of times of unnecessary if statement execution. When the result is decided, it is immediately returned so that execution is not performed until the last line of the function. So the function is clean and very easy to read and understand.
The refactoring process is described in detail below.

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

**Step1. if `event` isn't `undefined`, `candidate` isn't `undefined` always and the digest create by the `sha3-512` algorithm in `hex` encoding is string type. so can refactor following.**

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
      if (typeof candidate !== "string") {
      	candidate = JSON.stringify(candidate);
	  }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }    
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

**Step1. if `event` isn't `undefined`, `candidate` isn't `undefined` always and the digest created by the `sha3-512` algorithm in `hex` encoding is string type. so can refactor following.**

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
      if (typeof candidate !== "string") {
      	candidate = JSON.stringify(candidate);
	  }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }    
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
```

**Step2. length of digest created by the `sha3-512` algorithm in `hex` encoding is short than `MAX_PARTITION_KEY_LENGTH`. last if statement doesn't always need to be process.**
```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
      if (typeof candidate !== "string") {
      	candidate = JSON.stringify(candidate);
	  }
      if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    	candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
	  }
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }    
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  return candidate;
};
```
**Step3. When the result is determined, it returns immediately without executing until the end of the function.**

```javascript
const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  if (!event) return TRIVIAL_PARTITION_KEY;
  if (event.partitionKey) {
    candidate = event.partitionKey;
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
    if (candidate.length <= MAX_PARTITION_KEY_LENGTH)
        return candidate;
  } else {
    candidate = JSON.stringify(event);
  }    
  return crypto.createHash("sha3-512").update(candidate).digest("hex");
};
```