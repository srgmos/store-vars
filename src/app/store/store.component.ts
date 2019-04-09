import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {

  key1 = 'val1';
  key2 = 'val2';
  defaultVal1 = -5;
  defaultVal2 = 10;
  value1: any = this.defaultVal1;
  value2: any = this.defaultVal2;
  doIt = false;
  timeout = 1;

  delay = ms => new Promise(res => setTimeout(res, ms));
  changeVars = async () => {
    // Wait an additional seconds
    await this.delay(this.timeout * 1000);
  };

  constructor(public local: LocalStorageService) {
    this.set(this.key1, this.value1);
    this.set(this.key2, this.value2);
  }

  ngOnInit() {
  }

  /**
   * Set key and value in local storage
   * @param key
   * @param value
   * @param expired
   */
  set(key, value, expired: number = 0) {
    this.local.set(key, value, expired, 'd');
  }

  /**
   * Get value by key from local storage
   * @param key
   */
  get(key) {
    return this.local.get(key);
  }

  /**
   * Remove variable by key from local storage
   * @param key
   */
  remove(key) {
    this.local.remove(key);
    if (key === this.key1)
      this.value1 = this.get(key);
    if (key === this.key2)
      this.value2 = this.get(key);
  }

  /**
   * Clear local storage
   */
  clear() {
    this.local.clear();
    this.value1 = this.get(this.key1);
    this.value2 = this.get(this.key2);
  }

  /**
   * Restore default values for variables and store
   */
  restore() {
    this.value1 = this.defaultVal1;
    this.value2 = this.defaultVal2;
    this.set(this.key1, this.value1);
    this.set(this.key2, this.value2);
  }

  /**
   * Increase first variable
   */
  increase() {
    this.value1 = this.get(this.key1) + 1;
    this.set(this.key1, this.value1);
    console.log('Increased variable 1');
  }

  /**
   * Decrease second variable
   */
  decrease() {
    this.value2 = this.get(this.key2) - 1;
    this.set(this.key2, this.value2);
    console.log('Decreased variable 2');
  }

  /**
   * Change variables once
   */
  changeOnce() {
    this.increase();
    this.decrease();
    this.decrease();
  }

  /**
   * Wait before change variables
   */
  waitForChange() {
    if (this.doIt) {
      this.changeVars().then(() => {
        this.changeOnce();
        this.waitForChange();
      }).catch((res: any) => {
        console.log(res);
      });
    }
  }

  /**
   * Init change variables
   */
  change() {
     this.doIt = true;
     this.waitForChange();
  }

  /**
   * Stop changing variables
   */
  stopChange() {
    this.doIt = false;
  }

}
