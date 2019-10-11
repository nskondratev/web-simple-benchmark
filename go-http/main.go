package main

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
)

const addr = ":3003"

func jsonResponse(w http.ResponseWriter, data interface{}, c int) {
	dj, err := json.Marshal(data)
	if err != nil {
		http.Error(w, "Error creating JSON response", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(c)
	_, _ = fmt.Fprintf(w, "%s", dj)
}

func jsonHandler(w http.ResponseWriter, r *http.Request) {
	jsonResponse(w, map[string]string{"hello": "world"}, http.StatusOK)
}

func sha256Handler(w http.ResponseWriter, r *http.Request) {
	h := sha256.New()
	h.Write([]byte(r.URL.Query().Get("text")))
	jsonResponse(w, map[string]string{"hash": hex.EncodeToString(h.Sum(nil))}, http.StatusOK)
}

func main() {
	http.HandleFunc("/json", jsonHandler)
	http.HandleFunc("/hash/sha256", sha256Handler)

	http.ListenAndServe(addr, nil)
}
