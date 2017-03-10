package main

import (
    "fmt"
    "github.com/cactus/tai64"
)

func main() {
    labels := []string{ "40000000f487501c", "40000001b09f121c","40000007915fc51c", "4000003afff53a9c", "40001ca4f3758a24", "40001ca4f3758a25"}

    for i := 0; i < 6; i++ {
        time, _ := tai64.Parse(labels[i])
        fmt.Println(labels[i], time)
    }
}
