package main

import (
    "fmt"
    "github.com/vektra/tai64n"
)

func main() {
    // looks like this library can not handle tai64 but needs n
    labels := []string{"@40000000f487501c00000000", "@40000001b09f121c00000000", "@40000007915fc51c00000000",
                       "@4000003afff53a9c00000000", "@40001ca4f3758a2400000000", "@40001ca4f3758a2500000000"}

    for i := 0; i < 6; i++ {
        t := tai64n.ParseTAI64NLabel(labels[i])
        fmt.Println(labels[i], t)
    }
}
