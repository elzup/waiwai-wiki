```mermaid
erDiagram

work ||--o{ item: ""
work ||--o{ list: ""
item }o--o{ list: ""

work {
  string name
  string email
  integer age
}

item {
  string title
  text text
}

list {
  string title
}

user {
  string id
}
```
