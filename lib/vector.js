/**
 * author: p5.js
 * date: March 2020
 * link: https://github.com/processing/p5.js/blob/1.0.0/src/math/p5.Vector.j
 *  */
class Vector {
  constructor(x = 0, y = 0, z = 0) {
    if (isNaN(x)) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
    }else{
        this.x = x;
        this.y = y;
        this.z = z;
    }
  }
  fromAngle(angle, length) {
    if (typeof length === "undefined") {
      length = 1;
    }
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  }
  random2D() {
    return this.fromAngle(Math.random() * Math.PI * 2);
  }
  set(x, y, z) {
    if (x instanceof Vector) {
      this.x = x.x || 0;
      this.y = x.y || 0;
      this.z = x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x = x[0] || 0;
      this.y = x[1] || 0;
      this.z = x[2] || 0;
      return this;
    }
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    return this;
  }
  add(x, y, z) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      this.z += x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      this.z += x[2] || 0;
      return this;
    }
    this.x += x || 0;
    this.y += y || 0;
    this.z += z || 0;
    return this;
  }
  mult(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'p5.Vector.prototype.mult:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  }
  div(n) {
    if (!(typeof n === 'number' && isFinite(n))) {
      console.warn(
        'p5.Vector.prototype.div:',
        'n is undefined or not a finite number'
      );
      return this;
    }
    if (n === 0) {
      console.warn('p5.Vector.prototype.div:', 'divide by 0');
      return this;
    }
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  }
  sub(x, y, z) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      this.z -= x.z || 0;
      return this;
    }
    if (x instanceof Array) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      this.z -= x[2] || 0;
      return this;
    }
    this.x -= x || 0;
    this.y -= y || 0;
    this.z -= z || 0;
    return this;
  }
  copy() {
    return new Vector(this.x, this.y, this.z);
  }
  mag() {
    let res = this.magSq();
    return Math.sqrt(res);
  }
  magSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  dist(v) {
    return v
      .copy()
      .sub(this)
      .mag();
  }
  normalize() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }
  heading(degree = false) {
    const h = Math.atan2(this.y, this.x);
    if (degree) {
      const h2 = this._fromRadians(h);
      return h2;
    }
    return h;
  }
  _fromRadians(angle) {
    return (angle * 180.0) / Math.PI;
  }
  _toRadians(angle) {
    return (angle * Math.PI) / 180.0;
  }
  rotate(a) {
    let newHeading = this.heading() + a;
    if (this) newHeading = this._toRadians(newHeading);
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }
  lerp(x, y, z, amt) {
    if (x instanceof Vector) {
      return this.lerp(x.x, x.y, x.z, y);
    }
    this.x += (x - this.x) * amt || 0;
    this.y += (y - this.y) * amt || 0;
    this.z += (z - this.z) * amt || 0;
    return this;
  }
  limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }
    return this;
  }

  translate = function(x, y, z) {
      this.x -= x
      this.y -= y
      this.t -= z
    return this;
  }
}
