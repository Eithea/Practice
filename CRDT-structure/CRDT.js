export default class Docs {
    constructor(name) {
        this.name = name;
        this.elemList = [];
        this.remvList = [];
        this.idList = [];
        this.lttrList = [];
    };

    _listIncludesElem(list, elem) {
        if (Array.isArray(elem)) {
            for (let el of list) {
                if (elem[0] == el[0] && elem[1] == el[1]) {
                    return true;
                };  
            };
        }
        else {
            return list.includes(elem);    
        };
        return false;
    };

    _listAdd(list, letter, id) {
        list.push([id, letter]);
        list.sort(function(a, b) { return a[0] - b[0] });
        return list;
    };

    _listRemove(list, id) {
        list.push(id);
        list.sort(function(a, b) { return a - b });
        return list;
    };

    _listMerge(list1, list2) {
        for (let elem of list2) {
            if (!this._listIncludesElem(list1, elem)) {
                list1.push(elem);
            };
        };
        return list1;
    };

    _update() {
        for (let elem of this.elemList) {
            if (!this.remvList.includes(elem[0])
                    && !this.idList.includes(elem[0])){
                this.idList.push(elem[0]);
            };
        };

        for (let id of this.remvList) {
            let i = this.idList.indexOf(id);
            if (i != -1) {
                this.lttrList.splice(i, 1);
                this.idList.splice(i, 1);
            };
        };
        this.idList.sort(function(a, b) { return a - b });

        for (let id of this.idList) {
            for (let elem of this.elemList) {
                if (elem[0] == id) {
                    let i = this.idList.indexOf(id);
                    if (this.lttrList.length > i) {
                        if (elem[1] != this.lttrList[i]) {
                            this.lttrList.splice(i,  0, elem[1]);
                        };
                    }
                    else {
                        this.lttrList.push(elem[1]);
                    }
                };
            };
        };
    };

    add(letter, id) {
        this.elemList = this._listAdd(this.elemList, letter, id);
        this._update();
    };

    remove(id) {
        this.remvList = this._listRemove(this.remvList, id);
        this._update();
    };

    merge(docs) {
        this.elemList = this._listMerge(this.elemList, docs.elemList);
        this.remvList = this._listMerge(this.remvList, docs.remvList);
        this._update();
    };

    get() {
        let ret = "";
        for (let letter of this.lttrList) {
            ret += letter;
        };
        return ret;
    };
}