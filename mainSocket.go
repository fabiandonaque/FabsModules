package main

import (
    "net/http"
	"golang.org/x/net/websocket"
	"strconv"
)

var message = ""
var pulsado = 0

func wsConnection(ws *websocket.Conn){
	for {
		if(message != ""){
			websocket.Message.Send(ws, message)
			message = "";
		}
	}
}

func main() {
    http.Handle("/",http.FileServer(http.Dir("./")))
	http.Handle("/ws",websocket.Handler(wsConnection))
	http.HandleFunc("/action", func(w http.ResponseWriter, r *http.Request) {
		if(r.Method == "POST"){
			pulsado++
			message = "Pulsado: "+strconv.Itoa(pulsado)
		}
	})

    http.ListenAndServe(":8081", nil)
}
