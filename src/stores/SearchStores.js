import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _results = [],_status='';

class SearchStore extends EventEmitter{
  constructor(){
    super();

    AppDispatcher.register(action=>{
        switch (action.type) {
          case 'RECEIVE_RESULTS'  : _results = action.results;
                                    this.emit('CHANGE');
                                    break;

          case 'GETTING_DATA'     : _status = action.status;
                                    this.emit('CHANGE');
                                    break;
        }
    });
  }

  startListening(cb) {
    this.on('CHANGE',cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb);
  }

  getStatus(){
    return _status;
  }

  getAll(){
    return _results;
  }
}

export default new SearchStore();
