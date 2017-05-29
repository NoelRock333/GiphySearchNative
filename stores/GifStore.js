import { AsyncStorage } from 'react-native';
import { apiUrl } from '../Globals.json';
import EventEmitter from 'EventEmitter';

const CHANGE_EVENT = 'change';
const STORAGE_KEY = 'token';
const emitter = new EventEmitter();
let ajaxRequests = [];
let register_errors = null;

export default class GifStore {
  constructor() {
  }

  emitChange() {
    emitter.emit(CHANGE_EVENT);
  }

  getRegisterErrors() {
    return register_errors;
  }

  addChangeListener(callback) {
    emitter.addListener(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    emitter.removeListener(CHANGE_EVENT, callback);
  }

  unsuscribe() {
    ajaxRequests.forEach((req)=>{
      if (req.hasOwnProperty('abort')) {
        req.abort();
      }
    });
    ajaxRequests = [];
  }

  async search(searchText) {
    console.log(`${apiUrl}/gifs/search?q=${searchText}&api_key=dc6zaTOxFJmzC`)
    try {
      const response = await fetch(`${apiUrl}/gifs/search?q=${searchText}&api_key=dc6zaTOxFJmzC`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      return responseData;
    } catch(err) {
      return [];
    }
  }

  async trending() {
    try {
      const response = await fetch(`${apiUrl}/gifs/trending?api_key=dc6zaTOxFJmzC`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      return responseData;
    } catch(err) {
      return [];
    }
  }

}

