# 인덱스를 float 중간값으로 구현시, 두 글자 사이에 몇자나 입력이 가능한지 테스트

idx = 1.0
for _ in range(5) : 
    left = idx # 왼쪽 글자의 index
    right = left + 1.0 # 오른쪽 글자의 index

    i = 0
    while True :
        center = (left + right) /2 # 새로 입력된 글자의 index
        if center == right : 
            break
        i += 1 # 실수오차에 의해 center와 left가 같다 판단하는 지점까지 count
        left = center
    print(f"{int(idx*10)}자 규모 문서에서 동시입력 {i}자까지 인덱스 부여 가능")
    idx *= 10

