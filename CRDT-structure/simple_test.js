import Docs from "./CRDT.js"

let d1 = new Docs(1);
let d2 = new Docs(2);
let server_case1 = new Docs(3)
let server_case2 = new Docs(4)

let st = 'hello im jihun'

for (let i in st) {
    d1.add(st[i], 100 * i)
    d2.add(st[i], 100*i)
    server_case1.add(st[i], 100*i)
    server_case2.add(st[i], 100*i)

}
d1.add(' ', 650)
d1.add('a', 675)

d2.add(' ', 1400)
d2.add('k', 1500)
d2.add('i', 1600)
d2.add('m', 1700)

let res1 = d1.get() //'hello i am jihun'
let res2 = d2.get() //'hello im jihun kim'

d1.merge(d2)

let m1 = d1.get() //'hello i am jihun kim'

d2.remove(0)
d2.remove(100)
d2.remove(200)
d2.remove(300)
d2.remove(400)
d2.remove(500)

let res3 = d2.get() //'im jihun kim'

console.log(res1)
console.log(res2)
console.log(m1)
console.log(res3)

server_case1.merge(d1)
server_case1.merge(d2)

console.log(server_case1.get())

server_case2.merge(d1)
server_case2.merge(d2)

console.log(server_case2.get())