```mermaid

sequenceDiagram
    participant browser
    participant server
    
    Note right of browser: Selain lähettää palvelimelle HTTP POST pyyntönä käyttäjän kirjoittaman muistiinpanon sekä aikaleiman JSON muodossa

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Uudelleenohjauspyyntö lataamaan /exampleapp/notes uudelleen
    deactivate server

    Note right of browser: Selain uudelleenpiirtää muistiinpanot omasta muististaan

```