from CRDT_class import Docs

## 시나리오
# 초기에는 d1, d2 server 모두 'hello im jihun'
# d1 : im을 i am으로 바꿈 (= i, m 사이에 " a"를 추가)
# d2 : jihun 뒤에 kim을 추가
# d1, d2간의 p2p 통신으로 d2의 수정사항이 d1에 merge
# 반면 d2는 오프라인으로 전환되어 d1의 수정사항 미적용인 채로 hello를 remove

# 이때 d1, d2 순으로 DB server의 원본에 merge하면, server data는 모든 add, remove가 적용된 'i am jihun kim'이 되어야 함 (server case 1)
# 반대로 d2, d1 순으로 DB server의 원본에 merge해도, 'i am jihun kim'이 되어야 함 (server case 2)

d1 = Docs(1)
d2 = Docs(2)
server_case1 = Docs(3)
server_case2 = Docs(4)

st = 'hello im jihun'

for i in range(len(st)) : 
    d1.add(st[i], 100*i)
    d2.add(st[i], 100*i)
    server_case1.add(st[i], 100*i)
    server_case2.add(st[i], 100*i)

d1.add(' ', 650)
d1.add('a', 675)

d2.add(' ', 1400)
d2.add('k', 1500)
d2.add('i', 1600)
d2.add('m', 1700)

res1 = d1.get() # 'hello i am jihun'
res2 = d2.get() # 'hello im jihun kim'

d1.merge(d2)

m1 = d1.get() # 'hello i am jihun kim'

d2.remove(0)
d2.remove(100)
d2.remove(200)
d2.remove(300)
d2.remove(400)
d2.remove(500) 

res3 = d2.get() # 'im jihun kim'


print("d1 : " + res1, "d2 : " + res2, "d1 after merge d2 : " + m1,  "d2 after remove : " + res3, sep = '\n')


server_case1.merge(d1)
server_case1.merge(d2)
print("server after merge d1, d2 : " + server_case1.get())

server_case2.merge(d1)
server_case2.merge(d2)
print("server after merge d2, d1 : " + server_case2.get())