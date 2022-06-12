package main

import (
	"bufio"
	"os"
	"fmt"
	"math/rand"
	"time"
)

var stdin = bufio.NewReader(os.Stdin)

func main() {
	rand.Seed(time.Now().UnixNano())

	n := rand.Intn(100)
	count := 0

	for {
		count += 1
		fmt.Printf("number : ")
		i, err := input()
		if err != nil {
			fmt.Println("input number")
			continue
		}
		if check(n, i) {
			break
		}
	}
}

func input() (int, error) {
	var i int
	_, err := fmt.Scanln(&i)
	if err != nil {
		stdin.ReadString('\n')
	}
	return i, err
}

func check(n, i int) (bool) {
	if i > n {
		fmt.Println("down")
		return false
	}
	if i < n {
		fmt.Println("up")
		return false
	}
	fmt.Println("OK")
	return true
}

