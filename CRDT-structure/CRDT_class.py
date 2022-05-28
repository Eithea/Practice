class Docs :
    def __init__(self, node) :
        self.node = node
        self.elem_list = []
        self.remv_list = []
        self.id_list = []
        self.letter_list = []

    def _list_add(self, list, letter, id) :
        list.append((id, letter))
        list.sort()
        return list

    def _list_remove(self, list, id) :
        list.append(id)
        list.sort()
        return list

    def _list_merge(self, list1, list2) :
        for elem in list2 :
            if elem not in list1 :
                list1.append(elem)
        return list1

    def _update(self) :
        for elem in self.elem_list :
            if elem[0] not in self.remv_list and elem[0] not in self.id_list :
                self.id_list.append(elem[0])

        for id in self.remv_list :
            if id in self.id_list :
                del self.letter_list[self.id_list.index(id)]
                self.id_list.remove(id)        
        self.id_list.sort()

        for id in self.id_list :
            for elem in self.elem_list :
                if elem[0] == id :
                    if len(self.letter_list) > self.id_list.index(id) :
                        if elem[1] != self.letter_list[self.id_list.index(id)] :
                            self.letter_list.insert(self.id_list.index(id), elem[1])
                    else:
                        self.letter_list.append(elem[1])


    def add(self, letter, id) :
        self.elem_list = self._list_add(self.elem_list, letter, id)
        self._update()

    def remove(self, id) :
        self.remv_list = self._list_remove(self.remv_list, id)
        self._update()

    def merge(self, docs) :
        self.elem_list = self._list_merge(self.elem_list, docs.elem_list)
        self.remv_list = self._list_merge(self.remv_list, docs.remv_list)
        self._update()

    def get(self) :
        ret = ""
        for letter in self.letter_list :
            ret += letter
        return ret
