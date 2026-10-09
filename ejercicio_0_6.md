# Ejercicio 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST [https://studies.cs.helsinki.fi/exampleapp/new_note_spa](https://studies.cs.helsinki.fi/exampleapp/new_note_spa) (JSON payload)
    activate server
    server-->>browser: HTTP status code 201 Created
    deactivate server

    Note right of browser: The JavaScript code dynamically adds the new note to the DOM without reloading the page
```